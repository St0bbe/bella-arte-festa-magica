import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PartyPopper,
  Sparkles,
  Palette,
  Globe,
  MessageCircle,
  Camera,
  Calculator,
  CheckCircle,
  Crown,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Globe,
    title: "Site Profissional",
    description: "Tenha seu próprio site personalizado com seu domínio exclusivo",
  },
  {
    icon: Palette,
    title: "100% Personalizável",
    description: "Cores, logo, textos - tudo do seu jeito, sem precisar de programador",
  },
  {
    icon: Camera,
    title: "Galeria de Fotos",
    description: "Mostre seus melhores trabalhos com uma galeria profissional",
  },
  {
    icon: Calculator,
    title: "Orçamento Automático",
    description: "Seus clientes fazem orçamentos direto pelo site, sem complicação",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integrado",
    description: "Receba pedidos de orçamento direto no seu WhatsApp",
  },
  {
    icon: Zap,
    title: "Pronto em Minutos",
    description: "Cadastre-se e tenha seu site no ar em menos de 5 minutos",
  },
];

const TESTIMONIALS = [
  {
    name: "Thais Alves",
    company: "Bella Arte Decorações",
    quote: "Desde que comecei a usar o Celebrai, meus pedidos triplicaram! Agora meus clientes me encontram pelo Google.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    company: "Festa dos Sonhos",
    quote: "Nunca imaginei que seria tão fácil ter um site profissional. O suporte é incrível!",
    rating: 5,
  },
  {
    name: "Ana Clara",
    company: "Doce Celebração",
    quote: "O orçamento automático mudou minha vida. Economizo horas toda semana!",
    rating: 5,
  },
];

const PLANS = [
  {
    id: "monthly",
    name: "Mensal",
    price: "49,90",
    period: "/mês",
    features: [
      "Site profissional personalizado",
      "Galeria de fotos ilimitada",
      "Calculadora de orçamento",
      "WhatsApp integrado",
      "Suporte por email",
    ],
  },
  {
    id: "yearly",
    name: "Anual",
    price: "479,00",
    period: "/ano",
    savings: "Economize R$ 119,80",
    popular: true,
    features: [
      "Tudo do plano mensal",
      "2 meses grátis",
      "Suporte prioritário",
      "Domínio personalizado",
      "SEO otimizado",
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Celebrai
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#funcionalidades" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
              Funcionalidades
            </a>
            <a href="#precos" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </a>
            <Link to="/admin/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            A plataforma #1 para decoradoras de festas
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Seu negócio de decoração
            <br />
            <span className="bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
              online em minutos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Crie seu site profissional, receba orçamentos pelo WhatsApp e conquiste 
            mais clientes sem precisar entender de tecnologia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/cadastro">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6 h-auto">
                Criar Meu Site Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#funcionalidades">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                Ver Como Funciona
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Decoradoras</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">10k+</div>
              <div className="text-muted-foreground">Orçamentos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Funcionalidades
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Tudo que você precisa para
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                vender mais
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas profissionais pensadas especialmente para decoradoras de festas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Como Funciona
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              3 passos simples para
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                começar a vender
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Crie sua conta",
                description: "Cadastre-se em menos de 2 minutos com seus dados básicos",
                icon: Users,
              },
              {
                step: "2",
                title: "Personalize seu site",
                description: "Adicione sua logo, cores, serviços e fotos dos seus trabalhos",
                icon: Palette,
              },
              {
                step: "3",
                title: "Comece a receber clientes",
                description: "Divulgue seu link e receba orçamentos direto no WhatsApp",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">Passo {item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Decoradoras que
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                amam o Celebrai
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Preços
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Planos que cabem
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                no seu bolso
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Invista menos do que o custo de uma decoração simples e conquiste dezenas de novos clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative border-2 ${
                  plan.popular ? "border-primary shadow-xl shadow-primary/10" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                    <Crown className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-5xl font-bold">{plan.price.split(",")[0]}</span>
                    <span className="text-xl">,{plan.price.split(",")[1]}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                      {plan.savings}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/cadastro" className="block">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      Começar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            Teste grátis por 7 dias. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronta para transformar
            <br />
            seu negócio?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Junte-se a centenas de decoradoras que já estão vendendo mais com o Celebrai
          </p>
          <Link to="/cadastro">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-white/90">
              Criar Minha Conta Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PartyPopper className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">Celebrai</span>
              </div>
              <p className="text-muted-foreground text-sm">
                A plataforma completa para decoradoras de festas venderem mais.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#funcionalidades" className="hover:text-foreground">Funcionalidades</a></li>
                <li><a href="#precos" className="hover:text-foreground">Preços</a></li>
                <li><Link to="/cadastro" className="hover:text-foreground">Criar Conta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:suporte@celebrai.com.br" className="hover:text-foreground">suporte@celebrai.com.br</a></li>
                <li><a href="https://wa.me/5500000000000" className="hover:text-foreground">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-foreground">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Celebrai. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
