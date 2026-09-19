import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WeekPage from "./pages/WeekPage";
import Checklist from "./pages/Checklist";
import Catalog from "./pages/Catalog";
import Temario from "./pages/Temario";
import Transformaciones from "./pages/Transformaciones";

export default function App() {
  return (
    <HashRouter>
      <div className="bg-aurora" />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/semana/:slug" element={<WeekPage />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/galeria" element={<Catalog />} />
        <Route path="/temario" element={<Temario />} />
        <Route path="/transformaciones" element={<Transformaciones />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
