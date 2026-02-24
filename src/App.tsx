import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { HomeDetailsPage } from "./components/HomeDetailsPage";
import { InvestmentPage } from "./components/InvestmentPage";
import { ApartmentCatalogPage } from "./components/ApartmentCatalogPage";
import OurProjectsDetail from "./components/OurProjectDetails"; // Add this import
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [lang, setLang] = useState<"en" | "ru" | "uz" | "ar" | "zh">("ru");

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header lang={lang} setLang={setLang} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/home/:id" element={<HomeDetailsPage lang={lang} />} />
            <Route
              path="/investment"
              element={<InvestmentPage lang={lang} />}
            />
            <Route
              path="/catalog"
              element={<ApartmentCatalogPage lang={lang} />}
            />
            {/* Add the project detail route */}

            <Route
              path="/project/:projectId"
              element={<OurProjectsDetail lang={lang} />}
            />
            <Route
              path="/preview_page.html"
              element={<HomePage lang={lang} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}
