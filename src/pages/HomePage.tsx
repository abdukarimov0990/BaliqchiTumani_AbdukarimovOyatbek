import { Catalog } from "../components/sections/Catalog";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";

export function HomePage() {
  return (
    <>
      <Hero />
      <Catalog />
      <HowItWorks />
    </>
  );
}
