import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-party.jpg";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90" />
      </div>
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Decoração e Locação de Brinquedos</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Transformamos sua festa em
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Uma Obra de Arte
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
            Decorações personalizadas, infláveis, piscinas de bolinhas, camas elásticas e muito mais para tornar sua celebração inesquecível!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              className="text-lg h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              onClick={() => document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth" })}
            >
              Calcular Orçamento
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg h-14 px-8 border-2 backdrop-blur-sm bg-background/50 hover:bg-background/70"
              onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Serviços
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};
