"use client";

import { useEffect, useState } from "react";
import { Sparkles, Dumbbell, TrendingUp, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GeneratingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Target, text: "Analisando seus objetivos..." },
    { icon: Dumbbell, text: "Selecionando exercícios ideais..." },
    { icon: TrendingUp, text: "Criando progressão personalizada..." },
    { icon: Sparkles, text: "Finalizando seu treino..." },
  ];

  useEffect(() => {
    // Simulate AI generation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            generateWorkout();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepIndex = Math.floor(progress / 25);
    setCurrentStep(Math.min(stepIndex, steps.length - 1));
  }, [progress]);

  const generateWorkout = async () => {
    const onboardingData = JSON.parse(localStorage.getItem("onboarding") || "{}");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    
    // Pega os dias selecionados pelo usuário
    const selectedDays = onboardingData.frequency || [];
    const daysOfWeek = {
      monday: "Segunda-feira",
      tuesday: "Terça-feira",
      wednesday: "Quarta-feira",
      thursday: "Quinta-feira",
      friday: "Sexta-feira",
      saturday: "Sábado",
      sunday: "Domingo"
    };

    // Define divisões de treino baseado na quantidade de dias
    const workoutSplits: Record<number, string[]> = {
      2: ["Corpo Superior", "Corpo Inferior"],
      3: ["Peito + Tríceps", "Costas + Bíceps", "Pernas + Ombros"],
      4: ["Peito + Tríceps", "Costas + Bíceps", "Pernas", "Ombros + Abdômen"],
      5: ["Peito", "Costas", "Pernas", "Ombros", "Bíceps + Tríceps"],
      6: ["Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps + Abdômen"],
      7: ["Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps", "Cardio + Abdômen"]
    };

    // Exercícios por grupo muscular
    const exercisesByGroup: Record<string, any[]> = {
      "Peito": [
        { name: "Supino Reto", sets: 4, reps: "10-12", rest: 90, load: "Média" },
        { name: "Supino Inclinado", sets: 3, reps: "12-15", rest: 75, load: "Leve/Média" },
        { name: "Crucifixo Máquina", sets: 3, reps: "15", rest: 60, load: "Leve" },
        { name: "Flexão de Braço", sets: 3, reps: "Máximo", rest: 60, load: "Corporal" }
      ],
      "Tríceps": [
        { name: "Tríceps Corda", sets: 3, reps: "12-15", rest: 60, load: "Média" },
        { name: "Tríceps Testa", sets: 3, reps: "10-12", rest: 75, load: "Média" },
        { name: "Tríceps Francês", sets: 3, reps: "12-15", rest: 60, load: "Leve/Média" }
      ],
      "Costas": [
        { name: "Puxada Frontal", sets: 4, reps: "10-12", rest: 90, load: "Média/Pesada" },
        { name: "Remada Curvada", sets: 4, reps: "10-12", rest: 90, load: "Média" },
        { name: "Remada Cavalinho", sets: 3, reps: "12-15", rest: 75, load: "Média" },
        { name: "Pulldown", sets: 3, reps: "15", rest: 60, load: "Leve/Média" }
      ],
      "Bíceps": [
        { name: "Rosca Direta", sets: 3, reps: "10-12", rest: 60, load: "Média" },
        { name: "Rosca Martelo", sets: 3, reps: "12-15", rest: 60, load: "Leve/Média" },
        { name: "Rosca Concentrada", sets: 3, reps: "12-15", rest: 60, load: "Leve" }
      ],
      "Pernas": [
        { name: "Agachamento Livre", sets: 4, reps: "10-12", rest: 120, load: "Média/Pesada" },
        { name: "Leg Press", sets: 4, reps: "12-15", rest: 90, load: "Pesada" },
        { name: "Cadeira Extensora", sets: 3, reps: "15", rest: 60, load: "Média" },
        { name: "Cadeira Flexora", sets: 3, reps: "12-15", rest: 60, load: "Média" },
        { name: "Panturrilha em Pé", sets: 4, reps: "15-20", rest: 45, load: "Média" }
      ],
      "Ombros": [
        { name: "Desenvolvimento Militar", sets: 4, reps: "10-12", rest: 90, load: "Média" },
        { name: "Elevação Lateral", sets: 3, reps: "12-15", rest: 60, load: "Leve" },
        { name: "Elevação Frontal", sets: 3, reps: "12-15", rest: 60, load: "Leve" },
        { name: "Crucifixo Invertido", sets: 3, reps: "15", rest: 60, load: "Leve" }
      ],
      "Abdômen": [
        { name: "Abdominal Supra", sets: 3, reps: "20", rest: 45, load: "Corporal" },
        { name: "Abdominal Infra", sets: 3, reps: "15", rest: 45, load: "Corporal" },
        { name: "Prancha", sets: 3, reps: "45s", rest: 60, load: "Corporal" }
      ],
      "Corpo Superior": [
        { name: "Supino Reto", sets: 4, reps: "10-12", rest: 90, load: "Média" },
        { name: "Puxada Frontal", sets: 4, reps: "10-12", rest: 90, load: "Média" },
        { name: "Desenvolvimento Militar", sets: 3, reps: "10-12", rest: 75, load: "Média" },
        { name: "Rosca Direta", sets: 3, reps: "12-15", rest: 60, load: "Leve/Média" },
        { name: "Tríceps Corda", sets: 3, reps: "12-15", rest: 60, load: "Leve/Média" }
      ],
      "Corpo Inferior": [
        { name: "Agachamento Livre", sets: 4, reps: "10-12", rest: 120, load: "Média/Pesada" },
        { name: "Leg Press", sets: 4, reps: "12-15", rest: 90, load: "Pesada" },
        { name: "Cadeira Extensora", sets: 3, reps: "15", rest: 60, load: "Média" },
        { name: "Cadeira Flexora", sets: 3, reps: "12-15", rest: 60, load: "Média" },
        { name: "Panturrilha em Pé", sets: 4, reps: "15-20", rest: 45, load: "Média" }
      ],
      "Cardio": [
        { name: "Esteira", sets: 1, reps: "20 min", rest: 0, load: "Moderada" },
        { name: "Bicicleta", sets: 1, reps: "15 min", rest: 0, load: "Moderada" }
      ]
    };

    // Gera os dias de treino baseado nos dias selecionados
    const numDays = selectedDays.length;
    const splitNames = workoutSplits[numDays] || workoutSplits[3]; // Default para 3 dias se não encontrar

    const workoutDays = selectedDays.map((dayKey: string, index: number) => {
      const splitName = splitNames[index % splitNames.length];
      const muscleGroups = splitName.split(" + ");
      
      // Combina exercícios dos grupos musculares
      let exercises: any[] = [];
      muscleGroups.forEach(group => {
        const groupExercises = exercisesByGroup[group] || [];
        exercises = exercises.concat(
          groupExercises.map((ex, idx) => ({
            id: `ex-${index}-${idx}`,
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            rest: ex.rest,
            load: ex.load,
            videoUrl: "https://www.youtube.com/watch?v=example",
            muscleGroup: group
          }))
        );
      });

      return {
        id: `day-${index + 1}`,
        name: splitName,
        dayOfWeek: daysOfWeek[dayKey as keyof typeof daysOfWeek],
        duration: Math.min(45 + (exercises.length * 3), onboardingData.time || 60),
        exercises: exercises
      };
    });

    const workout = {
      id: "week-1",
      weekNumber: 1,
      startDate: new Date().toISOString(),
      days: workoutDays,
    };

    localStorage.setItem("currentWorkout", JSON.stringify(workout));
    router.push("/dashboard");
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Animated Icon */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-2xl animate-bounce">
            <CurrentIcon className="w-16 h-16 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Current Step Text */}
        <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
          {steps[currentStep].text}
        </h2>
        <p className="text-gray-400 mb-8">
          Criando seu treino personalizado com IA
        </p>

        {/* Progress Bar */}
        <div className="w-full mb-4">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-blue-400 font-semibold text-lg">{progress}%</p>

        {/* Steps Indicator */}
        <div className="mt-12 flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? "bg-blue-500 w-8" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
