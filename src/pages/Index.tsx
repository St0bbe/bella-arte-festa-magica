import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Gallery />
      <BudgetCalculator />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
