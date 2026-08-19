import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  loginUser,
  getAuthMe,
  logoutUser,
  provisionSubscriberApi,
  demoLoginApi,
  getDeviceId
} from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("PRO_ANNUAL"); // "PRO_ANNUAL" | "PRO_MONTHLY"
  const [isAccountReadyModalOpen, setIsAccountReadyModalOpen] = useState(false);
  const [accountCredentials, setAccountCredentials] = useState(null);

  // Initialize session from localStorage & verify with server
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("kevalbio_token");
        const storedUser = localStorage.getItem("kevalbio_user");

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            /* ignore JSON parse error */
          }
        }

        if (storedToken) {
          setToken(storedToken);
          const meData = await getAuthMe();
          if (meData && meData.is_authenticated && meData.user) {
            setUser(meData.user);
            localStorage.setItem("kevalbio_user", JSON.stringify(meData.user));
          } else {
            // Token expired or invalid
            localStorage.removeItem("kevalbio_token");
            localStorage.removeItem("kevalbio_user");
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        console.warn("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Standard Login
  const login = async (email, password, rememberMe = false) => {
    const res = await loginUser({ email, password, remember_me: rememberMe });
    if (res.status === "success" && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("kevalbio_token", res.token);
      localStorage.setItem("kevalbio_user", JSON.stringify(res.user));
      toast.success(res.message || "Logged in successfully!");
      setIsLoginModalOpen(false);
      return res;
    }
    throw new Error(res.detail || "Login failed");
  };

  // 1-Click Demo Login
  const demoLogin = async (tier = "PRO_ANNUAL") => {
    const res = await demoLoginApi({ tier });
    if (res.status === "success" && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("kevalbio_token", res.token);
      localStorage.setItem("kevalbio_user", JSON.stringify(res.user));
      toast.success(res.message || "Logged in as KEVALBIO Pro Demo User!");
      setIsLoginModalOpen(false);
      return res;
    }
    throw new Error("Demo login failed");
  };

  // Automated Provisioning on Subscription Checkout
  const provisionSubscriber = async ({ email, name = "", tier = "PRO_ANNUAL", provider = "simulation" }) => {
    const deviceId = getDeviceId();
    const res = await provisionSubscriberApi({
      email,
      name,
      tier,
      device_id: deviceId,
      provider
    });

    if (res.status === "success" && res.credentials) {
      // Keep session token ready
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("kevalbio_token", res.token);
      localStorage.setItem("kevalbio_user", JSON.stringify(res.user));

      // Set credentials for immediate on-screen display in AccountReadyModal
      setAccountCredentials({
        email: res.credentials.email,
        temporary_password: res.credentials.temporary_password,
        name: res.user.name,
        tier: res.user.tier,
        token: res.token
      });

      // Close checkout and open the Account Ready modal
      setIsCheckoutModalOpen(false);
      setIsAccountReadyModalOpen(true);

      return res;
    }
    throw new Error(res.detail || "Account provisioning failed");
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      /* ignore */
    } finally {
      localStorage.removeItem("kevalbio_token");
      localStorage.removeItem("kevalbio_user");
      setUser(null);
      setToken(null);
      toast.success("Logged out successfully");
    }
  };

  // Modal handlers
  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  const openCheckoutModal = useCallback((tier = "PRO_ANNUAL") => {
    setSelectedTier(tier);
    setIsCheckoutModalOpen(true);
  }, []);
  const closeCheckoutModal = useCallback(() => setIsCheckoutModalOpen(false), []);

  const openAccountReadyModal = useCallback((creds) => {
    setAccountCredentials(creds);
    setIsAccountReadyModalOpen(true);
  }, []);
  const closeAccountReadyModal = useCallback(() => {
    setIsAccountReadyModalOpen(false);
  }, []);

  const isAuthenticated = !!token && !!user;
  const isPro = isAuthenticated && (user?.is_pro === true || user?.role === "PRO_SUBSCRIBER" || user?.tier?.startsWith("PRO_"));

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isPro,
    login,
    logout,
    demoLogin,
    provisionSubscriber,
    // Modal states & controls
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    isCheckoutModalOpen,
    selectedTier,
    openCheckoutModal,
    closeCheckoutModal,
    isAccountReadyModalOpen,
    accountCredentials,
    openAccountReadyModal,
    closeAccountReadyModal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
