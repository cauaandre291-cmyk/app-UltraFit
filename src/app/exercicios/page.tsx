"use client";

import { useState } from "react";
import { Search, Dumbbell, TrendingUp, User, Ruler, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Exercise = {
  name: string;
  sets?: string;
  reps?: string;
  description?: string;
};

type MuscleGroup = {
  id: string;
  name: string;
  icon: string;
  color: string;
  exercises: Exercise[];
};

const muscleGroups: MuscleGroup[] = [
  {
    id: "peitoral",
    name: "Peitoral",
    icon: "💪",
    color: "from-red-500 to-red-600",
    exercises: [
      { name: "Supino Reto com Barra", sets: "4", reps: "8-12", description: "Exercício fundamental para desenvolvimento do peitoral" },
      { name: "Supino Inclinado com Halteres", sets: "4", reps: "10-12", description: "Foco na parte superior do peitoral" },
      { name: "Crucifixo Reto", sets: "3", reps: "12-15", description: "Isolamento do peitoral com amplitude completa" },
      { name: "Crucifixo Inclinado", sets: "3", reps: "12-15", description: "Trabalha a porção clavicular do peitoral" },
      { name: "Flexão de Braço", sets: "3", reps: "15-20", description: "Exercício funcional usando peso corporal" },
      { name: "Supino Declinado", sets: "3", reps: "10-12", description: "Enfatiza a parte inferior do peitoral" },
      { name: "Crossover", sets: "3", reps: "12-15", description: "Isolamento com tensão constante" },
      { name: "Peck Deck", sets: "3", reps: "12-15", description: "Máquina para isolamento do peitoral" },
      { name: "Supino com Halteres", sets: "4", reps: "10-12", description: "Maior amplitude de movimento" },
      { name: "Pullover", sets: "3", reps: "12-15", description: "Trabalha peitoral e dorsais" },
    ],
  },
  {
    id: "costas",
    name: "Costas",
    icon: "🦾",
    color: "from-blue-500 to-blue-600",
    exercises: [
      { name: "Barra Fixa", sets: "4", reps: "8-12", description: "Exercício composto para desenvolvimento das costas" },
      { name: "Puxada Frontal", sets: "4", reps: "10-12", description: "Alternativa à barra fixa com carga controlada" },
      { name: "Remada Curvada com Barra", sets: "4", reps: "8-10", description: "Desenvolvimento da espessura das costas" },
      { name: "Remada Cavalinho", sets: "3", reps: "10-12", description: "Isolamento unilateral das costas" },
      { name: "Remada Unilateral com Halter", sets: "3", reps: "10-12", description: "Trabalho unilateral com amplitude completa" },
      { name: "Pulldown", sets: "3", reps: "12-15", description: "Variação da puxada frontal" },
      { name: "Remada Baixa", sets: "4", reps: "10-12", description: "Foco na região central das costas" },
      { name: "Levantamento Terra", sets: "4", reps: "6-8", description: "Exercício composto para corpo todo" },
      { name: "Remada Alta", sets: "3", reps: "12-15", description: "Trabalha trapézio e deltoides" },
      { name: "Face Pull", sets: "3", reps: "15-20", description: "Saúde dos ombros e postura" },
      { name: "Pullover com Barra", sets: "3", reps: "12-15", description: "Expansão da caixa torácica" },
      { name: "Remada T", sets: "3", reps: "10-12", description: "Variação da remada com pegada neutra" },
    ],
  },
  {
    id: "pernas",
    name: "Pernas",
    icon: "🦵",
    color: "from-green-500 to-green-600",
    exercises: [
      { name: "Agachamento Livre", sets: "4", reps: "8-12", description: "Rei dos exercícios para pernas" },
      { name: "Leg Press 45°", sets: "4", reps: "12-15", description: "Desenvolvimento de quadríceps e glúteos" },
      { name: "Cadeira Extensora", sets: "3", reps: "12-15", description: "Isolamento do quadríceps" },
      { name: "Mesa Flexora", sets: "3", reps: "12-15", description: "Isolamento dos posteriores de coxa" },
      { name: "Agachamento Frontal", sets: "3", reps: "10-12", description: "Ênfase no quadríceps" },
      { name: "Hack Machine", sets: "3", reps: "12-15", description: "Variação do agachamento" },
      { name: "Afundo", sets: "3", reps: "12-15", description: "Exercício unilateral funcional" },
      { name: "Stiff", sets: "4", reps: "10-12", description: "Posteriores e glúteos" },
      { name: "Cadeira Flexora", sets: "3", reps: "12-15", description: "Isolamento dos isquiotibiais" },
      { name: "Agachamento Sumô", sets: "3", reps: "12-15", description: "Ênfase em glúteos e adutores" },
      { name: "Levantamento Terra Romeno", sets: "4", reps: "8-10", description: "Posteriores e lombar" },
      { name: "Agachamento Búlgaro", sets: "3", reps: "10-12", description: "Unilateral com foco em glúteos" },
      { name: "Panturrilha em Pé", sets: "4", reps: "15-20", description: "Desenvolvimento das panturrilhas" },
      { name: "Panturrilha Sentado", sets: "3", reps: "15-20", description: "Foco no sóleo" },
    ],
  },
  {
    id: "bracos",
    name: "Braços",
    icon: "💪",
    color: "from-purple-500 to-purple-600",
    exercises: [
      { name: "Rosca Direta com Barra", sets: "4", reps: "10-12", description: "Exercício básico para bíceps" },
      { name: "Rosca Alternada com Halteres", sets: "3", reps: "10-12", description: "Trabalho unilateral do bíceps" },
      { name: "Rosca Martelo", sets: "3", reps: "12-15", description: "Foco no braquial e antebraço" },
      { name: "Rosca Scott", sets: "3", reps: "10-12", description: "Isolamento do bíceps" },
      { name: "Rosca Concentrada", sets: "3", reps: "12-15", description: "Máximo isolamento do bíceps" },
      { name: "Tríceps Testa", sets: "4", reps: "10-12", description: "Exercício fundamental para tríceps" },
      { name: "Tríceps Pulley", sets: "3", reps: "12-15", description: "Isolamento do tríceps" },
      { name: "Tríceps Francês", sets: "3", reps: "10-12", description: "Alongamento completo do tríceps" },
      { name: "Mergulho em Paralelas", sets: "3", reps: "8-12", description: "Exercício composto para tríceps" },
      { name: "Tríceps Coice", sets: "3", reps: "12-15", description: "Isolamento unilateral" },
      { name: "Supino Fechado", sets: "3", reps: "10-12", description: "Composto para tríceps e peitoral" },
      { name: "Rosca Inversa", sets: "3", reps: "12-15", description: "Antebraço e braquial" },
      { name: "Rosca 21", sets: "2", reps: "21", description: "Técnica avançada para bíceps" },
    ],
  },
  {
    id: "abdomen",
    name: "Abdômen",
    icon: "🎯",
    color: "from-yellow-500 to-yellow-600",
    exercises: [
      { name: "Abdominal Supra", sets: "4", reps: "15-20", description: "Parte superior do abdômen" },
      { name: "Abdominal Infra", sets: "4", reps: "15-20", description: "Parte inferior do abdômen" },
      { name: "Prancha Isométrica", sets: "3", reps: "30-60s", description: "Core completo" },
      { name: "Abdominal Oblíquo", sets: "3", reps: "15-20", description: "Laterais do abdômen" },
      { name: "Elevação de Pernas", sets: "3", reps: "12-15", description: "Abdômen inferior" },
      { name: "Abdominal Bicicleta", sets: "3", reps: "20-30", description: "Trabalho dinâmico completo" },
      { name: "Russian Twist", sets: "3", reps: "20-30", description: "Oblíquos e rotação" },
      { name: "Mountain Climbers", sets: "3", reps: "20-30", description: "Cardio e core" },
      { name: "Prancha Lateral", sets: "3", reps: "30-45s", description: "Oblíquos isométrico" },
      { name: "Abdominal Canivete", sets: "3", reps: "12-15", description: "Abdômen completo" },
      { name: "Dead Bug", sets: "3", reps: "12-15", description: "Estabilização do core" },
      { name: "Hollow Hold", sets: "3", reps: "20-30s", description: "Core isométrico avançado" },
    ],
  },
  {
    id: "gluteos",
    name: "Glúteos",
    icon: "🍑",
    color: "from-pink-500 to-pink-600",
    exercises: [
      { name: "Hip Thrust", sets: "4", reps: "10-12", description: "Melhor exercício para glúteos" },
      { name: "Agachamento Sumô", sets: "4", reps: "12-15", description: "Ênfase em glúteos e adutores" },
      { name: "Stiff", sets: "4", reps: "10-12", description: "Posteriores e glúteos" },
      { name: "Cadeira Abdutora", sets: "3", reps: "15-20", description: "Isolamento do glúteo médio" },
      { name: "Elevação Pélvica", sets: "4", reps: "15-20", description: "Ativação dos glúteos" },
      { name: "Coice na Polia", sets: "3", reps: "12-15", description: "Isolamento unilateral" },
      { name: "Agachamento Búlgaro", sets: "3", reps: "10-12", description: "Unilateral com foco em glúteos" },
      { name: "Step Up", sets: "3", reps: "12-15", description: "Funcional para glúteos" },
      { name: "Cadeira Adutora", sets: "3", reps: "15-20", description: "Parte interna das coxas" },
      { name: "Glute Bridge", sets: "3", reps: "15-20", description: "Ativação básica dos glúteos" },
      { name: "Kickback com Caneleira", sets: "3", reps: "15-20", description: "Isolamento do glúteo" },
      { name: "Fire Hydrant", sets: "3", reps: "15-20", description: "Glúteo médio e mínimo" },
    ],
  },
];

export default function ExplorarPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | null>(null);

  const filteredGroups = muscleGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-black z-10 pt-4">
        <div className="px-4 pb-3">
          <h1 className="text-2xl font-bold">Explorar</h1>
          <p className="text-gray-400 text-sm mt-1">Grupos Musculares</p>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar grupo muscular"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Muscle Groups Grid */}
      <div className="px-4 py-4 space-y-3">
        {filteredGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroup(group)}
            className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-br ${group.color} p-3 rounded-xl text-2xl`}>
                  {group.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold text-lg">{group.name}</h3>
                  <p className="text-gray-400 text-sm">{group.exercises.length} exercícios</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
          </button>
        ))}
      </div>

      {/* Exercise List Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-end justify-center">
          <div className="bg-gray-900 rounded-t-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-br ${selectedGroup.color} p-2 rounded-lg text-xl`}>
                    {selectedGroup.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedGroup.name}</h2>
                    <p className="text-sm text-gray-400">{selectedGroup.exercises.length} exercícios disponíveis</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-6 space-y-3" style={{ maxHeight: "calc(85vh - 120px)" }}>
              {selectedGroup.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`bg-gradient-to-br ${selectedGroup.color} bg-opacity-20 p-2 rounded-lg mt-1`}>
                      <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">{exercise.name}</h4>
                      {exercise.description && (
                        <p className="text-gray-400 text-sm mb-2">{exercise.description}</p>
                      )}
                      {exercise.sets && exercise.reps && (
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-blue-400 font-medium">
                            {exercise.sets} séries
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-green-400 font-medium">
                            {exercise.reps} repetições
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors"
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-xs">Treinos</span>
          </button>

          <button
            onClick={() => router.push("/corpo")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors"
          >
            <Ruler className="w-6 h-6" />
            <span className="text-xs">Medidas</span>
          </button>

          <button
            onClick={() => router.push("/exercicios")}
            className="flex flex-col items-center gap-1 text-blue-500"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Explorar</span>
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
