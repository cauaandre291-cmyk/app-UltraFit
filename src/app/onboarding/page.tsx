"use client";

import { useState } from "react";
import { ArrowLeft, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

type OnboardingStep = {
  id: string;
  question: string;
  subtitle?: string;
  type: "single" | "multiple" | "input" | "slider" | "weight-goal";
  options?: { value: string; label: string; description?: string }[];
  min?: number;
  max?: number;
  unit?: string;
};

const steps: OnboardingStep[] = [
  {
    id: "goal",
    question: "Qual é o seu objetivo principal?",
    subtitle: "Escolha o que melhor representa sua meta",
    type: "single",
    options: [
      { value: "hypertrophy", label: "Hipertrofia", description: "Ganhar massa muscular" },
      { value: "weight_loss", label: "Emagrecimento", description: "Perder gordura corporal" },
      { value: "conditioning", label: "Condicionamento", description: "Melhorar resistência" },
      { value: "strength", label: "Força", description: "Aumentar força máxima" },
      { value: "health", label: "Saúde", description: "Bem-estar geral" },
      { value: "mobility", label: "Mobilidade", description: "Flexibilidade e movimento" },
    ],
  },
  {
    id: "weight_goal",
    question: "Qual peso você deseja alcançar?",
    subtitle: "Defina sua meta de peso em kg",
    type: "weight-goal",
  },
  {
    id: "experience",
    question: "Qual sua experiência praticando musculação?",
    subtitle: "Seja honesto para treinos mais adequados",
    type: "single",
    options: [
      { value: "beginner", label: "Iniciante", description: "Menos de 6 meses de treino" },
      { value: "intermediate", label: "Intermediário", description: "6 meses a 2 anos de treino" },
      { value: "advanced", label: "Avançado", description: "Mais de 2 anos de treino" },
    ],
  },
  {
    id: "frequency",
    question: "Em que dias da semana deseja treinar?",
    subtitle: "Escolha de 2 a 6 dias na semana",
    type: "multiple",
    options: [
      { value: "monday", label: "Segunda-feira" },
      { value: "tuesday", label: "Terça-feira" },
      { value: "wednesday", label: "Quarta-feira" },
      { value: "thursday", label: "Quinta-feira" },
      { value: "friday", label: "Sexta-feira" },
      { value: "saturday", label: "Sábado" },
      { value: "sunday", label: "Domingo" },
    ],
  },
  {
    id: "equipment",
    question: "Qual equipamento você tem acesso?",
    subtitle: "Selecione o que está disponível para você",
    type: "single",
    options: [
      { value: "full_gym", label: "Academia completa", description: "Academia equipada com máquinas e pesos livres" },
      { value: "basic_gym", label: "Academia básica", description: "Equipamentos básicos de musculação" },
      { value: "dumbbells", label: "Apenas halteres", description: "Treino em casa com halteres" },
      { value: "resistance_bands", label: "Apenas elásticos", description: "Treino com bandas elásticas" },
      { value: "bodyweight", label: "Peso do corpo", description: "Treino funcional sem equipamentos" },
    ],
  },
  {
    id: "time",
    question: "Quanto tempo você tem por treino?",
    subtitle: "Tempo médio disponível em minutos",
    type: "slider",
    min: 20,
    max: 120,
    unit: "minutos",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleAnswer = (value: any) => {
    if (step.type === "multiple") {
      const current = answers[step.id] || [];
      const newValue = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [step.id]: newValue });
    } else {
      setAnswers({ ...answers, [step.id]: value });
    }
  };

  const canContinue = () => {
    const answer = answers[step.id];
    if (step.type === "multiple") {
      return answer && answer.length >= 2 && answer.length <= 6;
    }
    if (step.type === "weight-goal") {
      return answer && answer.targetWeight && answer.targetWeight > 0;
    }
    return answer !== undefined;
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data and navigate to profile completion
      localStorage.setItem("onboarding", JSON.stringify(answers));
      router.push("/onboarding/profile");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={handleBack}
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/")}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-8">
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        {/* Question */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{step.question}</h1>
          {step.subtitle && (
            <p className="text-gray-400 text-sm">{step.subtitle}</p>
          )}
        </div>

        {/* Options */}
        <div className="flex-1 space-y-3 mb-6">
          {step.type === "weight-goal" ? (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  Peso Alvo (kg)
                </label>
                <input
                  type="number"
                  value={answers[step.id]?.targetWeight || ""}
                  onChange={(e) =>
                    handleAnswer({
                      ...answers[step.id],
                      targetWeight: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Ex: 75"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-lg placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-sm text-blue-300">
                  💡 Dica: Defina uma meta realista baseada no seu objetivo. Para ganho de massa, considere 0.5-1kg por mês. Para perda de peso, 0.5-1kg por semana é saudável.
                </p>
              </div>
            </div>
          ) : step.type === "slider" ? (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-5xl font-bold text-blue-500">
                  {answers[step.id] || step.min}
                </span>
                <span className="text-2xl text-gray-400 ml-2">{step.unit}</span>
              </div>
              <input
                type="range"
                min={step.min}
                max={step.max}
                value={answers[step.id] || step.min}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{step.min} min</span>
                <span>{step.max} min</span>
              </div>
            </div>
          ) : (
            step.options?.map((option) => {
              const isSelected =
                step.type === "multiple"
                  ? (answers[step.id] || []).includes(option.value)
                  : answers[step.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {option.label}
                      </h3>
                      {option.description && (
                        <p className="text-sm text-gray-400">
                          {option.description}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-blue-500 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!canContinue()}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            canContinue()
              ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
        }
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
