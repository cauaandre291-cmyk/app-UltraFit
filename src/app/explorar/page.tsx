"use client";

import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import BottomNav from "@/components/custom/BottomNav";

type Exercise = {
  name: string;
  description: string;
  series: string;
  reps: string;
};

type MuscleGroup = {
  name: string;
  emoji: string;
  exercises: Exercise[];
};

export default function ExplorarPage() {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const muscleGroups: MuscleGroup[] = [
    {
      name: "Peitoral",
      emoji: "💪",
      exercises: [
        { name: "Supino Reto", description: "Exercício clássico para desenvolvimento do peitoral maior", series: "4", reps: "8-12" },
        { name: "Supino Inclinado", description: "Foca na parte superior do peitoral", series: "4", reps: "8-12" },
        { name: "Supino Declinado", description: "Trabalha a parte inferior do peitoral", series: "3", reps: "10-12" },
        { name: "Crucifixo Reto", description: "Isolamento do peitoral com amplitude completa", series: "3", reps: "12-15" },
        { name: "Crucifixo Inclinado", description: "Isolamento da parte superior do peitoral", series: "3", reps: "12-15" },
        { name: "Flexão de Braço", description: "Exercício funcional para peitoral, tríceps e core", series: "3", reps: "15-20" },
        { name: "Crossover", description: "Isolamento com cabos para definição", series: "3", reps: "12-15" },
        { name: "Pullover", description: "Trabalha peitoral e expansão da caixa torácica", series: "3", reps: "12-15" },
        { name: "Supino com Halteres", description: "Maior amplitude de movimento e estabilização", series: "4", reps: "10-12" },
        { name: "Flexão Diamante", description: "Variação que enfatiza o peitoral interno", series: "3", reps: "12-15" },
      ]
    },
    {
      name: "Costas",
      emoji: "🦾",
      exercises: [
        { name: "Barra Fixa", description: "Exercício completo para desenvolvimento das costas", series: "4", reps: "8-12" },
        { name: "Remada Curvada", description: "Trabalha toda a musculatura das costas", series: "4", reps: "8-12" },
        { name: "Puxada Frontal", description: "Desenvolvimento do latíssimo do dorso", series: "4", reps: "10-12" },
        { name: "Remada Unilateral", description: "Isolamento e correção de assimetrias", series: "3", reps: "10-12" },
        { name: "Levantamento Terra", description: "Exercício composto para costas e posterior", series: "4", reps: "6-10" },
        { name: "Pulldown", description: "Variação da puxada com diferentes pegadas", series: "3", reps: "12-15" },
        { name: "Remada Baixa", description: "Trabalha a região média das costas", series: "4", reps: "10-12" },
        { name: "Remada Alta", description: "Foca em trapézio e deltoides posteriores", series: "3", reps: "12-15" },
        { name: "Pullover com Barra", description: "Expansão e trabalho do latíssimo", series: "3", reps: "12-15" },
        { name: "Encolhimento", description: "Isolamento do trapézio superior", series: "4", reps: "12-15" },
        { name: "Remada Cavalinho", description: "Trabalho isolado com apoio no peito", series: "3", reps: "10-12" },
        { name: "Face Pull", description: "Deltoides posteriores e saúde dos ombros", series: "3", reps: "15-20" },
      ]
    },
    {
      name: "Pernas",
      emoji: "🦵",
      exercises: [
        { name: "Agachamento Livre", description: "Rei dos exercícios para pernas", series: "4", reps: "8-12" },
        { name: "Leg Press", description: "Desenvolvimento geral das pernas com segurança", series: "4", reps: "10-15" },
        { name: "Cadeira Extensora", description: "Isolamento do quadríceps", series: "3", reps: "12-15" },
        { name: "Mesa Flexora", description: "Isolamento dos isquiotibiais", series: "3", reps: "12-15" },
        { name: "Agachamento Búlgaro", description: "Trabalho unilateral e equilíbrio", series: "3", reps: "10-12" },
        { name: "Stiff", description: "Posterior de coxa e glúteos", series: "4", reps: "10-12" },
        { name: "Afundo", description: "Exercício funcional para pernas completas", series: "3", reps: "12-15" },
        { name: "Cadeira Adutora", description: "Isolamento dos adutores", series: "3", reps: "15-20" },
        { name: "Cadeira Abdutora", description: "Isolamento dos abdutores e glúteo médio", series: "3", reps: "15-20" },
        { name: "Panturrilha em Pé", description: "Desenvolvimento das panturrilhas", series: "4", reps: "15-20" },
        { name: "Panturrilha Sentado", description: "Foca no sóleo", series: "3", reps: "15-20" },
        { name: "Hack Machine", description: "Variação do agachamento com máquina", series: "4", reps: "10-12" },
      ]
    },
    {
      name: "Braços",
      emoji: "💪",
      exercises: [
        { name: "Rosca Direta", description: "Exercício clássico para bíceps", series: "4", reps: "10-12" },
        { name: "Rosca Alternada", description: "Trabalho unilateral dos bíceps", series: "3", reps: "10-12" },
        { name: "Rosca Martelo", description: "Trabalha bíceps e braquial", series: "3", reps: "12-15" },
        { name: "Rosca Scott", description: "Isolamento do bíceps com banco", series: "3", reps: "10-12" },
        { name: "Tríceps Testa", description: "Isolamento do tríceps deitado", series: "4", reps: "10-12" },
        { name: "Tríceps Corda", description: "Trabalho completo do tríceps com cabo", series: "3", reps: "12-15" },
        { name: "Tríceps Francês", description: "Alongamento e trabalho da cabeça longa", series: "3", reps: "10-12" },
        { name: "Mergulho", description: "Exercício composto para tríceps", series: "3", reps: "10-15" },
        { name: "Rosca Concentrada", description: "Isolamento máximo do bíceps", series: "3", reps: "12-15" },
        { name: "Rosca Inversa", description: "Trabalha antebraços e braquial", series: "3", reps: "12-15" },
        { name: "Kickback", description: "Isolamento do tríceps unilateral", series: "3", reps: "12-15" },
        { name: "Rosca 21", description: "Técnica avançada para bíceps", series: "3", reps: "21" },
      ]
    },
    {
      name: "Abdômen",
      emoji: "🔥",
      exercises: [
        { name: "Abdominal Supra", description: "Trabalha a parte superior do abdômen", series: "4", reps: "15-20" },
        { name: "Abdominal Infra", description: "Foca na parte inferior do abdômen", series: "4", reps: "15-20" },
        { name: "Prancha", description: "Isometria para core completo", series: "3", reps: "30-60s" },
        { name: "Abdominal Bicicleta", description: "Trabalho completo com rotação", series: "3", reps: "20-30" },
        { name: "Elevação de Pernas", description: "Isolamento do abdômen inferior", series: "3", reps: "12-15" },
        { name: "Abdominal Canivete", description: "Trabalho simultâneo superior e inferior", series: "3", reps: "15-20" },
        { name: "Prancha Lateral", description: "Fortalecimento dos oblíquos", series: "3", reps: "30-45s" },
        { name: "Russian Twist", description: "Rotação e trabalho dos oblíquos", series: "3", reps: "20-30" },
        { name: "Mountain Climbers", description: "Exercício dinâmico para core", series: "3", reps: "20-30" },
        { name: "Abdominal Remador", description: "Trabalho completo sentado", series: "3", reps: "15-20" },
      ]
    },
    {
      name: "Glúteos",
      emoji: "🍑",
      exercises: [
        { name: "Hip Thrust", description: "Melhor exercício para glúteos", series: "4", reps: "10-15" },
        { name: "Agachamento Sumô", description: "Variação que enfatiza glúteos", series: "4", reps: "12-15" },
        { name: "Elevação Pélvica", description: "Isolamento dos glúteos", series: "3", reps: "15-20" },
        { name: "Coice", description: "Isolamento unilateral dos glúteos", series: "3", reps: "15-20" },
        { name: "Cadeira Abdutora", description: "Trabalha glúteo médio", series: "3", reps: "15-20" },
        { name: "Stiff", description: "Glúteos e posterior de coxa", series: "4", reps: "10-12" },
        { name: "Afundo Reverso", description: "Ênfase em glúteos", series: "3", reps: "12-15" },
        { name: "Step Up", description: "Exercício funcional para glúteos", series: "3", reps: "12-15" },
        { name: "Glúteo na Máquina", description: "Isolamento com máquina específica", series: "3", reps: "15-20" },
        { name: "Agachamento Búlgaro", description: "Trabalho intenso unilateral", series: "3", reps: "10-12" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Explorar</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar exercícios..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Grupos Musculares</h2>
        
        <div className="space-y-3">
          {muscleGroups.map((group, index) => (
            <button
              key={index}
              onClick={() => setSelectedGroup(group)}
              className="w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 hover:from-blue-100 hover:to-blue-200 transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{group.emoji}</div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{group.name}</p>
                  <p className="text-sm text-gray-600">{group.exercises.length} exercícios</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </button>
          ))}
        </div>
      </main>

      {/* Modal - Lista de Exercícios */}
      {selectedGroup && !selectedExercise && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{selectedGroup.name}</h3>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600">{selectedGroup.exercises.length} exercícios disponíveis</p>
            </div>
            
            <div className="overflow-y-auto flex-1 p-6">
              <div className="space-y-3">
                {selectedGroup.exercises.map((exercise, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{exercise.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {exercise.series}x{exercise.reps}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    <button
                      onClick={() => setSelectedExercise(exercise)}
                      className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors"
                    >
                      Ver demonstração →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Demonstração do Exercício */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{selectedExercise.name}</h3>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 p-6">
              {/* Vídeo Placeholder */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl aspect-video mb-6 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-3">▶️</div>
                  <p className="font-semibold">Vídeo de Demonstração</p>
                  <p className="text-sm text-blue-100 mt-1">Em breve disponível</p>
                </div>
              </div>

              {/* Informações */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Descrição</h4>
                  <p className="text-gray-600">{selectedExercise.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Séries</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedExercise.series}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Repetições</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedExercise.reps}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Como Executar</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">1.</span>
                      <span>Posicione-se corretamente e mantenha a postura adequada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">2.</span>
                      <span>Execute o movimento de forma controlada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">3.</span>
                      <span>Respire corretamente durante a execução</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">4.</span>
                      <span>Mantenha a concentração no músculo trabalhado</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedExercise(null)}
                  className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
