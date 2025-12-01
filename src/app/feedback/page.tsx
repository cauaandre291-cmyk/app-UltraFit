"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState({
    difficulty: "",
    pain: "",
    timeIssue: false,
    intensity: "",
    notes: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async () => {
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      // In production, this would call OpenAI API to generate new workout
      alert("Novo treino gerado com base no seu feedback!");
      router.push("/dashboard");
    }, 3000);
  };

  const canSubmit = feedback.difficulty && feedback.intensity;

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-gray-800 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Feedback Semanal</h1>
          <div className="w-6" />
        </div>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-2xl animate-bounce">
              <Sparkles className="w-16 h-16 text-white" strokeWidth={2} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            Gerando novo treino...
          </h2>
          <p className="text-gray-400 text-center">
            Ajustando com base no seu feedback
          </p>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Intro */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-white mb-1">
                  Como foi sua semana de treino?
                </h2>
                <p className="text-sm text-gray-400">
                  Seu feedback ajuda a IA a criar treinos ainda melhores para você
                </p>
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Como foi o nível de dificuldade?
            </label>
            <div className="space-y-2">
              {[
                { value: "too_easy", label: "Muito Fácil", emoji: "😴" },
                { value: "easy", label: "Fácil", emoji: "🙂" },
                { value: "perfect", label: "Perfeito", emoji: "💪" },
                { value: "hard", label: "Difícil", emoji: "😅" },
                { value: "too_hard", label: "Muito Difícil", emoji: "😰" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFeedback({ ...feedback, difficulty: option.value })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    feedback.difficulty === option.value
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium text-white">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pain/Discomfort */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Teve alguma dor ou desconforto?
            </label>
            <div className="space-y-2">
              {[
                { value: "none", label: "Nenhuma dor" },
                { value: "mild", label: "Desconforto leve" },
                { value: "moderate", label: "Dor moderada" },
                { value: "severe", label: "Dor forte" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFeedback({ ...feedback, pain: option.value })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    feedback.pain === option.value
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <span className="font-medium text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Issue */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Faltou tempo para completar os treinos?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFeedback({ ...feedback, timeIssue: false })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  feedback.timeIssue === false
                    ? "bg-blue-500/20 border-blue-500"
                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <span className="font-medium text-white">Não</span>
              </button>
              <button
                onClick={() => setFeedback({ ...feedback, timeIssue: true })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  feedback.timeIssue === true
                    ? "bg-blue-500/20 border-blue-500"
                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <span className="font-medium text-white">Sim</span>
              </button>
            </div>
          </div>

          {/* Intensity Preference */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Para a próxima semana, você deseja:
            </label>
            <div className="space-y-2">
              {[
                { value: "decrease", label: "Diminuir intensidade", emoji: "⬇️" },
                { value: "maintain", label: "Manter igual", emoji: "➡️" },
                { value: "increase", label: "Aumentar intensidade", emoji: "⬆️" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFeedback({ ...feedback, intensity: option.value })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    feedback.intensity === option.value
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium text-white">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Observações adicionais (opcional)
            </label>
            <textarea
              value={feedback.notes}
              onChange={(e) => setFeedback({ ...feedback, notes: e.target.value })}
              placeholder="Alguma observação sobre os treinos?"
              rows={4}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>
      )}

      {/* Fixed Bottom Button */}
      {!isGenerating && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              canSubmit
                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Gerar Próxima Semana
          </button>
        </div>
      )}
    </div>
  );
}
