import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Result from "@/pages/Result";
import Explore from "@/pages/Explore";
import Compare from "@/pages/Compare";
import Symptom from "@/pages/Symptom";
import LabExplorer from "@/pages/LabExplorer";
import Saved from "@/pages/Saved";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/labs" element={<LabExplorer />} />
            <Route path="/symptoms" element={<Symptom />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </Layout>
        <Toaster theme="dark" position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
