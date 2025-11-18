'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import type { UserData, UserPhotos } from '@/lib/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<Partial<UserPhotos>>({});
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = async (position: keyof UserPhotos, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos(prev => ({ ...prev, [position]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!photos.front || !photos.back || !photos.sideRight || !photos.sideLeft) {
      alert('Por favor, envie todas as 4 fotos obrigatórias');
      return;
    }

    if (!userData.gender || !userData.age || !userData.weight || !userData.height || !userData.goal) {
      alert('Por favor, preencha todos os dados obrigatórios');
      return;
    }

    setLoading(true);
    
    // Salvar no localStorage para próxima página
    localStorage.setItem('scanfit_photos', JSON.stringify(photos));
    localStorage.setItem('scanfit_userdata', JSON.stringify(userData));
    
    router.push('/analysis');
  };

  const photoPositions = [
    { key: 'front' as const, label: 'Frente', icon: '🧍' },
    { key: 'back' as const, label: 'Costas', icon: '🚶' },
    { key: 'sideRight' as const, label: 'Lado Direito', icon: '🧍‍♂️' },
    { key: 'sideLeft' as const, label: 'Lado Esquerdo', icon: '🧍‍♀️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ScanFit
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className={step >= 1 ? 'text-emerald-400' : ''}>Fotos</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-emerald-400' : ''}>Dados</span>
              <span>→</span>
              <span className={step >= 3 ? 'text-emerald-400' : ''}>Análise</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Step 1: Upload de Fotos */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Envie suas fotos corporais
              </h2>
              <p className="text-gray-400 text-lg">
                Precisamos de 4 fotos para uma análise precisa do seu corpo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {photoPositions.map(({ key, label, icon }) => (
                <Card key={key} className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all">
                  <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4">{icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-4">{label}</h3>
                    
                    {photos[key] ? (
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4">
                        <img 
                          src={photos[key]} 
                          alt={label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-2">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-[3/4] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center mb-4">
                        <Camera className="w-12 h-12 text-gray-500" />
                      </div>
                    )}

                    <label className="w-full">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePhotoUpload(key, file);
                        }}
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full border-emerald-500/50 hover:bg-emerald-500/10"
                        onClick={(e) => {
                          e.preventDefault();
                          (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {photos[key] ? 'Trocar foto' : 'Enviar foto'}
                      </Button>
                    </label>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8"
                onClick={() => {
                  if (Object.keys(photos).length === 4) {
                    setStep(2);
                  } else {
                    alert('Por favor, envie todas as 4 fotos');
                  }
                }}
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Dados do Usuário */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Seus dados pessoais
              </h2>
              <p className="text-gray-400 text-lg">
                Essas informações nos ajudam a criar um plano personalizado
              </p>
            </div>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="space-y-6">
                {/* Sexo */}
                <div>
                  <Label className="text-white mb-3 block">Sexo *</Label>
                  <RadioGroup
                    value={userData.gender}
                    onValueChange={(value) => setUserData(prev => ({ ...prev, gender: value as any }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2 bg-white/5 px-6 py-3 rounded-lg flex-1 cursor-pointer hover:bg-white/10">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-white cursor-pointer flex-1">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/5 px-6 py-3 rounded-lg flex-1 cursor-pointer hover:bg-white/10">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-white cursor-pointer flex-1">Feminino</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Idade, Peso, Altura */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-white mb-2 block">Idade *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      className="bg-white/5 border-white/10 text-white"
                      value={userData.age || ''}
                      onChange={(e) => setUserData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-white mb-2 block">Peso (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      className="bg-white/5 border-white/10 text-white"
                      value={userData.weight || ''}
                      onChange={(e) => setUserData(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-white mb-2 block">Altura (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      className="bg-white/5 border-white/10 text-white"
                      value={userData.height || ''}
                      onChange={(e) => setUserData(prev => ({ ...prev, height: parseFloat(e.target.value) }))}
                    />
                  </div>
                </div>

                {/* Objetivo */}
                <div>
                  <Label htmlFor="goal" className="text-white mb-2 block">Seu objetivo *</Label>
                  <Select value={userData.goal} onValueChange={(value) => setUserData(prev => ({ ...prev, goal: value as any }))}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Selecione seu objetivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muscle_gain">Ganhar massa muscular</SelectItem>
                      <SelectItem value="fat_loss">Perder gordura</SelectItem>
                      <SelectItem value="body_recomp">Definir o corpo (recomposição)</SelectItem>
                      <SelectItem value="performance">Melhorar desempenho esportivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Nível e Frequência */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="level" className="text-white mb-2 block">Nível de treino</Label>
                    <Select value={userData.fitnessLevel} onValueChange={(value) => setUserData(prev => ({ ...prev, fitnessLevel: value as any }))}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante</SelectItem>
                        <SelectItem value="intermediate">Intermediário</SelectItem>
                        <SelectItem value="advanced">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="frequency" className="text-white mb-2 block">Treinos por semana</Label>
                    <Select value={userData.weeklyWorkouts?.toString()} onValueChange={(value) => setUserData(prev => ({ ...prev, weeklyWorkouts: parseInt(value) }))}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3x por semana</SelectItem>
                        <SelectItem value="4">4x por semana</SelectItem>
                        <SelectItem value="5">5x por semana</SelectItem>
                        <SelectItem value="6">6x por semana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Medidas Opcionais */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-semibold mb-4">Medidas corporais (opcional)</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="chest" className="text-white mb-2 block text-sm">Peito (cm)</Label>
                      <Input
                        id="chest"
                        type="number"
                        placeholder="95"
                        className="bg-white/5 border-white/10 text-white"
                        onChange={(e) => setUserData(prev => ({ 
                          ...prev, 
                          measurements: { ...prev.measurements, chest: parseFloat(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="waist" className="text-white mb-2 block text-sm">Cintura (cm)</Label>
                      <Input
                        id="waist"
                        type="number"
                        placeholder="80"
                        className="bg-white/5 border-white/10 text-white"
                        onChange={(e) => setUserData(prev => ({ 
                          ...prev, 
                          measurements: { ...prev.measurements, waist: parseFloat(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hips" className="text-white mb-2 block text-sm">Quadril (cm)</Label>
                      <Input
                        id="hips"
                        type="number"
                        placeholder="95"
                        className="bg-white/5 border-white/10 text-white"
                        onChange={(e) => setUserData(prev => ({ 
                          ...prev, 
                          measurements: { ...prev.measurements, hips: parseFloat(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Processando...' : 'Analisar meu corpo'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
