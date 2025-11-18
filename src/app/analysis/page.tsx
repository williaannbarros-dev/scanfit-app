'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, TrendingUp, Activity, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BodyAnalysis, UserPhotos, UserData } from '@/lib/types';

export default function AnalysisPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<BodyAnalysis | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        const photosStr = localStorage.getItem('scanfit_photos');
        const userDataStr = localStorage.getItem('scanfit_userdata');

        if (!photosStr || !userDataStr) {
          router.push('/onboarding');
          return;
        }

        const photos: UserPhotos = JSON.parse(photosStr);
        const userData: UserData = JSON.parse(userDataStr);

        // Chamar API Route server-side
        const response = await fetch('/api/analyze-body', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ photos, userData }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao analisar fotos');
        }

        const result = await response.json();
        setAnalysis(result);
        
        // Salvar análise completa
        localStorage.setItem('scanfit_analysis', JSON.stringify(result));
      } catch (err: any) {
        setError(err.message || 'Erro ao analisar suas fotos. Por favor, tente novamente.');
        console.error('Erro na análise:', err);
      } finally {
        setLoading(false);
      }
    };

    performAnalysis();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Analisando seu corpo...</h2>
          <p className="text-gray-400">Nossa IA está processando suas fotos com precisão profissional</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4">
        <Card className="bg-white/5 border-white/10 p-8 max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Erro na análise</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500"
            onClick={() => router.push('/onboarding')}
          >
            Tentar novamente
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            ScanFit
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-6">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Análise Completa</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Seu perfil corporal está pronto
            </h2>
            <p className="text-gray-400 text-lg">
              Baseado em análise avançada de IA e dados corporais
            </p>
          </div>

          {/* Cards de Métricas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Gordura Corporal</p>
                  <p className="text-3xl font-bold text-white">{analysis.bodyFatPercentage}%</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">IMC</p>
                  <p className="text-3xl font-bold text-white">{analysis.bmi}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tipo Corporal</p>
                  <p className="text-xl font-bold text-white">{analysis.bodyType}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Massa Muscular */}
          <Card className="bg-white/5 border-white/10 p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Massa Muscular Estimada</h3>
            <p className="text-gray-300 text-lg">{analysis.muscleMassEstimate}</p>
          </Card>

          {/* Análise Detalhada */}
          <Card className="bg-white/5 border-white/10 p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Análise Detalhada</h3>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {analysis.detailedAnalysis}
            </div>
          </Card>

          {/* Recomendações */}
          <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Recomendações Personalizadas</h3>
            <div className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="bg-emerald-500/20 rounded-full p-2 mt-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  </div>
                  <p className="text-gray-300 flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pronto para começar sua transformação?
              </h3>
              <p className="text-gray-300 mb-6">
                Em breve você terá acesso ao seu plano de dieta e treino personalizado
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8"
                onClick={() => router.push('/')}
              >
                Voltar ao início
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
