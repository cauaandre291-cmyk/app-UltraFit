import { AIWorkoutRequest, AIWorkoutResponse, WeeklyWorkout, WorkoutDay, Exercise } from "./types";

/**
 * AI Workout Generator
 * 
 * This module handles the generation of personalized workout plans using OpenAI's GPT-4.
 * In production, replace the mock data with actual API calls.
 */

const AI_TRAINER_PROMPT = `Você é um treinador profissional de musculação com anos de experiência.
Sua missão é criar treinos personalizados, seguros e eficazes baseados nos dados do usuário.

REGRAS FUNDAMENTAIS:
1. Respeite SEMPRE as limitações e restrições do usuário
2. Adapte o treino ao tempo disponível
3. Crie treinos equilibrados e progressivos
4. Não repita exercícios na mesma semana
5. Gere progressão semanal inteligente (carga, séries, repetições)
6. Considere o nível de experiência do usuário
7. Priorize segurança e prevenção de lesões

ESTRUTURA DO TREINO:
- Divida por grupos musculares
- Inclua aquecimento quando apropriado
- Varie exercícios compostos e isolados
- Ajuste volume e intensidade ao objetivo
- Respeite tempo de descanso adequado

PROGRESSÃO SEMANAL:
- Iniciante: foco em técnica, volume moderado
- Intermediário: aumento gradual de carga e volume
- Avançado: técnicas avançadas, maior intensidade

ADAPTAÇÃO POR OBJETIVO:
- Hipertrofia: 8-12 reps, descanso 60-90s
- Emagrecimento: circuitos, menor descanso
- Força: 4-6 reps, descanso 2-3min
- Condicionamento: alta intensidade, baixo descanso
- Saúde: moderado, foco em movimento
- Mobilidade: alongamentos, amplitude`;

/**
 * Generate a personalized workout using AI
 * 
 * @param request - User profile and context data
 * @returns Generated workout plan
 */
export async function generateWorkoutWithAI(
  request: AIWorkoutRequest
): Promise<AIWorkoutResponse> {
  // In production, this would call OpenAI API
  // Example:
  /*
  const response = await fetch('/api/generate-workout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: AI_TRAINER_PROMPT,
      userData: request.userProfile,
      feedback: request.feedback,
      previousWorkout: request.previousWorkout,
    }),
  });
  
  const data = await response.json();
  return data;
  */

  // Mock implementation for demonstration
  return generateMockWorkout(request);
}

/**
 * Mock workout generator (replace with real AI in production)
 */
function generateMockWorkout(request: AIWorkoutRequest): AIWorkoutResponse {
  const { userProfile, feedback } = request;
  
  // Determine workout split based on frequency
  const daysPerWeek = userProfile.frequency.length;
  let workoutSplit: string[] = [];
  
  if (daysPerWeek <= 3) {
    workoutSplit = ["Full Body A", "Full Body B", "Full Body C"];
  } else if (daysPerWeek === 4) {
    workoutSplit = ["Peito + Tríceps", "Costas + Bíceps", "Pernas", "Ombros + Abdômen"];
  } else {
    workoutSplit = ["Peito + Tríceps", "Costas + Bíceps", "Pernas", "Ombros", "Braços + Abdômen"];
  }

  const days: WorkoutDay[] = workoutSplit.slice(0, daysPerWeek).map((name, index) => ({
    id: `day-${index + 1}`,
    name,
    dayOfWeek: getDayName(userProfile.frequency[index]),
    duration: userProfile.time,
    exercises: generateExercisesForDay(name, userProfile),
    completed: false,
  }));

  const workout: WeeklyWorkout = {
    id: `week-${Date.now()}`,
    weekNumber: 1,
    startDate: new Date().toISOString(),
    days,
  };

  return {
    workout,
    reasoning: `Treino criado com base no seu objetivo de ${userProfile.goal}, nível ${userProfile.experience}, e ${daysPerWeek} dias por semana.`,
    adjustments: feedback ? getAdjustmentsFromFeedback(feedback) : [],
  };
}

/**
 * Generate exercises for a specific workout day
 */
function generateExercisesForDay(dayName: string, profile: any): Exercise[] {
  // This is a simplified version. In production, use AI to generate optimal exercises
  const exerciseDatabase: Record<string, Exercise[]> = {
    "Peito + Tríceps": [
      {
        id: "ex-1",
        name: "Supino Reto",
        sets: 4,
        reps: "10-12",
        rest: 90,
        load: "Média",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Peito",
      },
      {
        id: "ex-2",
        name: "Supino Inclinado",
        sets: 3,
        reps: "12-15",
        rest: 75,
        load: "Leve/Média",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Peito",
      },
      {
        id: "ex-3",
        name: "Crucifixo Máquina",
        sets: 3,
        reps: "15",
        rest: 60,
        load: "Leve",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Peito",
      },
      {
        id: "ex-4",
        name: "Tríceps Corda",
        sets: 3,
        reps: "12-15",
        rest: 60,
        load: "Média",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Tríceps",
      },
    ],
    "Costas + Bíceps": [
      {
        id: "ex-5",
        name: "Puxada Frontal",
        sets: 4,
        reps: "10-12",
        rest: 90,
        load: "Média/Pesada",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Costas",
      },
      {
        id: "ex-6",
        name: "Remada Curvada",
        sets: 4,
        reps: "10-12",
        rest: 90,
        load: "Média",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Costas",
      },
      {
        id: "ex-7",
        name: "Rosca Direta",
        sets: 3,
        reps: "10-12",
        rest: 60,
        load: "Média",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Bíceps",
      },
    ],
    "Pernas": [
      {
        id: "ex-8",
        name: "Agachamento Livre",
        sets: 4,
        reps: "10-12",
        rest: 120,
        load: "Média/Pesada",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Pernas",
      },
      {
        id: "ex-9",
        name: "Leg Press",
        sets: 4,
        reps: "12-15",
        rest: 90,
        load: "Pesada",
        videoUrl: "https://www.youtube.com/watch?v=example",
        muscleGroup: "Pernas",
      },
    ],
  };

  return exerciseDatabase[dayName] || [];
}

/**
 * Get day name from DayOfWeek enum
 */
function getDayName(day: string): string {
  const dayNames: Record<string, string> = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
  };
  return dayNames[day] || day;
}

/**
 * Generate adjustments based on user feedback
 */
function getAdjustmentsFromFeedback(feedback: any): string[] {
  const adjustments: string[] = [];

  if (feedback.difficulty === "too_easy") {
    adjustments.push("Aumentado carga e volume dos exercícios");
  } else if (feedback.difficulty === "too_hard") {
    adjustments.push("Reduzido volume e intensidade");
  }

  if (feedback.pain !== "none") {
    adjustments.push("Substituído exercícios que causaram desconforto");
  }

  if (feedback.timeIssue) {
    adjustments.push("Reduzido número de exercícios para caber no tempo disponível");
  }

  if (feedback.intensity === "increase") {
    adjustments.push("Aumentado intensidade geral do treino");
  } else if (feedback.intensity === "decrease") {
    adjustments.push("Reduzido intensidade para recuperação adequada");
  }

  return adjustments;
}

/**
 * API Route Handler Example (for /api/generate-workout)
 * 
 * This would be implemented in src/app/api/generate-workout/route.ts
 */
export const exampleAPIRoute = `
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, userData, feedback, previousWorkout } = body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: prompt },
        { 
          role: 'user', 
          content: JSON.stringify({ userData, feedback, previousWorkout }) 
        },
      ],
      response_format: { type: 'json_object' },
    });

    const workout = JSON.parse(completion.choices[0].message.content || '{}');
    
    return NextResponse.json({ workout });
  } catch (error) {
    console.error('Error generating workout:', error);
    return NextResponse.json(
      { error: 'Failed to generate workout' },
      { status: 500 }
    );
  }
}
`;
