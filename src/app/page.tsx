'use client';

import { useRouter } from 'next/navigation';
import { Zap, Camera, TrendingUp, Dumbbell, Apple, BarChart3, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: Camera,
      title: 'Análise Corporal com IA',
      description: 'Envie 4 fotos e receba uma análise profissional completa do seu corpo'
    },
    {
      icon: Apple,
      title: 'Dieta Personalizada',
      description: 'Plano alimentar calculado especificamente para seu objetivo e metabolismo'
    },
    {
      icon: Dumbbell,
      title: 'Treino Sob Medida',
      description: 'Rotina de exercícios adaptada ao seu nível e disponibilidade'
    },
    {
      icon: BarChart3,
      title: 'Acompanhamento de Evolução',
      description: 'Monitore seu progresso com fotos, medidas e gráficos detalhados'
    }
  ];

  const benefits = [
    'Análise corporal precisa usando inteligência artificial avançada',
    'Plano nutricional com calorias e macronutrientes calculados',
    'Treinos com orientação passo a passo',
    'Acompanhamento quinzenal da sua evolução',
    'Recomendações personalizadas baseadas em seus resultados',
    'Interface profissional e motivacional'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-emerald-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ScanFit
              </h1>
            </div>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
              onClick={() => router.push('/onboarding')}
            >
              Começar agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Powered by AI</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            A IA analisa seu corpo.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Você só precisa seguir o plano.
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transforme seu corpo com um plano personalizado criado por inteligência artificial. 
            Análise corporal precisa, dieta calculada e treinos sob medida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg px-8 py-6"
              onClick={() => router.push('/onboarding')}
            >
              Começar minha transformação
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              Ver como funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Tudo que você precisa em um só lugar
            </h3>
            <p className="text-gray-400 text-lg">
              Tecnologia de ponta para resultados reais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all hover:scale-105 duration-300"
              >
                <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-4 rounded-lg w-fit mb-4">
                  <feature.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Como funciona
            </h3>
            <p className="text-gray-400 text-lg">
              Simples, rápido e eficiente
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Envie suas fotos',
                description: 'Tire 4 fotos do seu corpo (frente, costas, lados) para análise precisa'
              },
              {
                step: '02',
                title: 'Preencha seus dados',
                description: 'Informe idade, peso, altura e seu objetivo fitness'
              },
              {
                step: '03',
                title: 'Receba sua análise',
                description: 'IA analisa seu corpo e calcula gordura, IMC e massa muscular'
              },
              {
                step: '04',
                title: 'Siga seu plano personalizado',
                description: 'Dieta e treino criados especificamente para você alcançar seus objetivos'
              }
            ].map((item, index) => (
              <Card 
                key={index}
                className="bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-lg">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 p-12">
            <h3 className="text-4xl font-bold text-white mb-8 text-center">
              Por que escolher o ScanFit?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/30 p-12">
            <TrendingUp className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">
              Pronto para sua transformação?
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Comece agora e tenha seu plano personalizado em minutos
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg px-12 py-6"
              onClick={() => router.push('/onboarding')}
            >
              Começar agora gratuitamente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              <span className="text-white font-semibold">ScanFit</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 ScanFit. Transforme seu corpo com IA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
