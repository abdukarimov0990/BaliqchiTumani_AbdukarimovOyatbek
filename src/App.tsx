import { Route, Routes } from "react-router";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { MaterialPage } from "./pages/MaterialPage";
import { SearchPage } from "./pages/SearchPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/materials/:id" element={<MaterialPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
