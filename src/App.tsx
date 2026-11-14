import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Catalog } from "./components/sections/Catalog";
import { Hero } from "./components/sections/Hero";
import { HowItWorks } from "./components/sections/HowItWorks";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
