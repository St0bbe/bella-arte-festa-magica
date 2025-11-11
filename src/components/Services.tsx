import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, PartyPopper, Baby, Cake } from "lucide-react";
import inflatableImg from "@/assets/inflatable.jpg";
import ballPitImg from "@/assets/ball-pit.jpg";
import trampolineImg from "@/assets/trampoline.jpg";
import decorationImg from "@/assets/decoration.jpg";

const services = [
  {
    title: "Infláveis Divertidos",
    description: "Castelos infláveis, tobogãs e muito mais para a diversão das crianças",
    image: inflatableImg,
    icon: PartyPopper,
  },
  {
    title: "Piscina de Bolinhas",
    description: "Diversão colorida e segura para todas as idades",
    image: ballPitImg,
    icon: Baby,
  },
  {
    title: "Cama Elástica",
    description: "Energia e alegria para animar toda a festa",
    image: trampolineImg,
    icon: Sparkles,
  },
  {
    title: "Decorações Personalizadas",
    description: "Temas exclusivos e decorações sob medida para seu evento",
    image: decorationImg,
    icon: Cake,
  },
];

export const Services = () => {
  return (
    <section id="servicos" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Nossos Serviços
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Oferecemos uma variedade completa de opções para tornar sua festa única e memorável
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-card)] bg-card"
              >
                <CardContent className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-foreground/80 pl-15">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
