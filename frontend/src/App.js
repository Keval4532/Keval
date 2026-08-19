import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Result from "@/pages/Result";
import ProblemAnalysis from "@/pages/ProblemAnalysis";
import DietAnalyzer from "@/pages/DietAnalyzer";
import StackAnalyzer from "@/pages/StackAnalyzer";
import Explore from "@/pages/Explore";
import Compare from "@/pages/Compare";
import Symptom from "@/pages/Symptom";
import LabExplorer from "@/pages/LabExplorer";
import Saved from "@/pages/Saved";
import Dashboard from "@/pages/Dashboard";
import Coach from "@/pages/Coach";
import Profile from "@/pages/Profile";
import MyKevalBio from "@/pages/MyKevalBio";
import CaffeineCalculator from "@/pages/CaffeineCalculator";
import Pricing from "@/pages/Pricing";
import LabScannerPage from "@/pages/tools/LabScannerPage";
import CircadianPage from "@/pages/tools/CircadianPage";
import FastingPage from "@/pages/tools/FastingPage";
import HydrationPage from "@/pages/tools/HydrationPage";
import SupplementAuditorPage from "@/pages/tools/SupplementAuditorPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/problem" element={<ProblemAnalysis />} />
              <Route path="/diet" element={<DietAnalyzer />} />
              <Route path="/stack" element={<StackAnalyzer />} />
              <Route path="/caffeine" element={<CaffeineCalculator />} />
              <Route path="/tools/caffeine" element={<CaffeineCalculator />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/tools/lab-scanner" element={<LabScannerPage />} />
              <Route path="/tools/circadian" element={<CircadianPage />} />
              <Route path="/tools/fasting" element={<FastingPage />} />
              <Route path="/tools/hydration" element={<HydrationPage />} />
              <Route path="/tools/supplement-auditor" element={<SupplementAuditorPage />} />
              <Route path="/result" element={<Result />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/labs" element={<LabScannerPage />} />
              <Route path="/symptoms" element={<Symptom />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-bio" element={<MyKevalBio />} />
              <Route path="/my-kevalbio" element={<MyKevalBio />} />
              <Route path="/saved" element={<MyKevalBio />} />
            </Routes>
          </Layout>
          <Toaster theme="dark" position="top-center" richColors />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
