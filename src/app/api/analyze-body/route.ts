import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { photos, userData } = await request.json();

    // Validar dados
    if (!photos || !userData) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificar se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API key da OpenAI não configurada. Configure OPENAI_API_KEY nas variáveis de ambiente.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const heightInMeters = userData.height / 100;
    const bmi = userData.weight / (heightInMeters * heightInMeters);

    const prompt = `Você é um especialista em análise corporal e fitness. Analise estas 4 fotos do corpo de uma pessoa e forneça uma avaliação profissional detalhada.

DADOS DO USUÁRIO:
- Sexo: ${userData.gender === 'male' ? 'Masculino' : 'Feminino'}
- Idade: ${userData.age} anos
- Peso: ${userData.weight} kg
- Altura: ${userData.height} cm
- IMC: ${bmi.toFixed(1)}
- Objetivo: ${getGoalText(userData.goal)}

INSTRUÇÕES:
1. Estime o percentual de gordura corporal (seja realista e preciso)
2. Identifique o tipo corporal (ectomorfo, mesomorfo, endomorfo ou misto)
3. Estime a massa muscular atual (baixa, moderada, boa, excelente)
4. Forneça 3-5 recomendações específicas baseadas no objetivo
5. Faça uma análise detalhada da composição corporal

Responda APENAS em formato JSON válido:
{
  "bodyFatPercentage": número entre 5 e 50,
  "bodyType": "tipo corporal identificado",
  "muscleMassEstimate": "descrição da massa muscular",
  "recommendations": ["recomendação 1", "recomendação 2", ...],
  "detailedAnalysis": "análise detalhada em 2-3 parágrafos"
}`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: photos.front } },
              { type: 'image_url', image_url: { url: photos.back } },
              { type: 'image_url', image_url: { url: photos.sideRight } },
              { type: 'image_url', image_url: { url: photos.sideLeft } }
            ]
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 1500
      });

      const analysis = JSON.parse(response.choices[0].message.content || '{}');
      
      return NextResponse.json({
        ...analysis,
        bmi: parseFloat(bmi.toFixed(1))
      });

    } catch (openaiError: any) {
      console.error('Erro da OpenAI:', openaiError);
      
      // Tratar erros específicos da OpenAI
      if (openaiError.status === 401) {
        return NextResponse.json(
          { error: 'Chave da API da OpenAI inválida. Verifique se você configurou a chave correta em OPENAI_API_KEY.' },
          { status: 401 }
        );
      }
      
      if (openaiError.status === 429) {
        return NextResponse.json(
          { error: 'Limite de requisições atingido. Tente novamente em alguns instantes.' },
          { status: 429 }
        );
      }

      if (openaiError.status === 500) {
        return NextResponse.json(
          { error: 'Erro no servidor da OpenAI. Tente novamente em alguns instantes.' },
          { status: 500 }
        );
      }

      // Erro genérico da OpenAI
      return NextResponse.json(
        { error: openaiError.message || 'Erro ao processar análise com a OpenAI.' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Erro geral na análise:', error);
    return NextResponse.json(
      { error: error.message || 'Não foi possível analisar as fotos. Tente novamente.' },
      { status: 500 }
    );
  }
}

function getGoalText(goal: string): string {
  const goals: Record<string, string> = {
    muscle_gain: 'Ganhar massa muscular',
    fat_loss: 'Perder gordura',
    body_recomp: 'Recomposição corporal (definir)',
    performance: 'Melhorar desempenho esportivo'
  };
  return goals[goal] || goal;
}
