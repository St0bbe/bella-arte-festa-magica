import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import princessParty from "@/assets/gallery/princess-party.jpg";
import superheroParty from "@/assets/gallery/superhero-party.jpg";
import tropicalParty from "@/assets/gallery/tropical-party.jpg";
import unicornParty from "@/assets/gallery/unicorn-party.jpg";
import safariParty from "@/assets/gallery/safari-party.jpg";
import corporateEvent from "@/assets/gallery/corporate-event.jpg";
import babyShower from "@/assets/gallery/baby-shower.jpg";
import spaceParty from "@/assets/gallery/space-party.jpg";

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  theme: string;
  eventType: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Festa Princesa",
    image: princessParty,
    theme: "Princesa",
    eventType: "Aniversário Infantil",
  },
  {
    id: 2,
    title: "Festa Super-Heróis",
    image: superheroParty,
    theme: "Super-Heróis",
    eventType: "Aniversário Infantil",
  },
  {
    id: 3,
    title: "Festa Tropical",
    image: tropicalParty,
    theme: "Tropical",
    eventType: "Aniversário",
  },
  {
    id: 4,
    title: "Festa Unicórnio",
    image: unicornParty,
    theme: "Unicórnio",
    eventType: "Aniversário Infantil",
  },
  {
    id: 5,
    title: "Festa Safari",
    image: safariParty,
    theme: "Safari",
    eventType: "Aniversário Infantil",
  },
  {
    id: 6,
    title: "Evento Corporativo",
    image: corporateEvent,
    theme: "Elegante",
    eventType: "Corporativo",
  },
  {
    id: 7,
    title: "Chá de Bebê",
    image: babyShower,
    theme: "Bebê",
    eventType: "Chá de Bebê",
  },
  {
    id: 8,
    title: "Festa Espacial",
    image: spaceParty,
    theme: "Espaço",
    eventType: "Aniversário Infantil",
  },
];

const themes = ["Todos", "Princesa", "Super-Heróis", "Tropical", "Unicórnio", "Safari", "Elegante", "Bebê", "Espaço"];
const eventTypes = ["Todos", "Aniversário Infantil", "Aniversário", "Corporativo", "Chá de Bebê"];

export const Gallery = () => {
  const [selectedTheme, setSelectedTheme] = useState("Todos");
  const [selectedEventType, setSelectedEventType] = useState("Todos");

  const filteredItems = galleryItems.filter((item) => {
    const themeMatch = selectedTheme === "Todos" || item.theme === selectedTheme;
    const eventTypeMatch = selectedEventType === "Todos" || item.eventType === selectedEventType;
    return themeMatch && eventTypeMatch;
  });

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Galeria de Festas
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Veja alguns dos nossos trabalhos mais incríveis e inspire-se para sua próxima celebração
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-12 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Filtrar por Tema</h3>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Button
                  key={theme}
                  variant={selectedTheme === theme ? "default" : "outline"}
                  onClick={() => setSelectedTheme(theme)}
                  className={
                    selectedTheme === theme
                      ? "bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                      : ""
                  }
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Filtrar por Tipo de Evento</h3>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedEventType === type ? "default" : "outline"}
                  onClick={() => setSelectedEventType(type)}
                  className={
                    selectedEventType === type
                      ? "bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                      : ""
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-card)] bg-card cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            {item.theme}
                          </Badge>
                          <Badge variant="outline" className="bg-background/80">
                            {item.eventType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Nenhuma festa encontrada com os filtros selecionados.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTheme("Todos");
                  setSelectedEventType("Todos");
                }}
                className="mt-4"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Gostou do que viu? Vamos criar algo único para você!
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
          >
            Solicite um Orçamento
          </Button>
        </div>
      </div>
    </section>
  );
};
