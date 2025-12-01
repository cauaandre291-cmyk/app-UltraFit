import { History, Calendar } from "lucide-react";
import BottomNav from "@/components/custom/BottomNav";

export default function AtividadesPage() {
  const stats = [
    { label: "Tempo de Treino", value: "3h 45min", icon: "⏱️" },
    { label: "Calorias", value: "1,250", icon: "🔥" },
    { label: "Exercícios", value: "24", icon: "💪" },
    { label: "Séries", value: "96", icon: "📊" },
    { label: "Repetições", value: "1,440", icon: "🔢" },
    { label: "Carga Total", value: "12,500 kg", icon: "🏋️" },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Atividades</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors">
            <History className="w-4 h-4" />
            <span className="text-sm font-medium">Histórico</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Period Filter */}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            7 dias
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            14 dias
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            28 dias
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Resumo dos últimos 7 dias
            </h2>
          </div>
          <p className="text-3xl font-bold text-blue-500 mb-2">5 treinos</p>
          <p className="text-sm text-gray-600">
            Você completou 5 treinos esta semana. Continue assim! 💪
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Workouts */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Treinos Recentes
          </h2>
          
          <div className="space-y-3">
            {[
              { date: "Hoje", name: "Treino de Peito", time: "45 min" },
              { date: "Ontem", name: "Treino de Costas", time: "50 min" },
              { date: "2 dias atrás", name: "Treino de Pernas", time: "60 min" },
              { date: "3 dias atrás", name: "Treino de Ombros", time: "40 min" },
              { date: "5 dias atrás", name: "Treino de Braços", time: "45 min" },
            ].map((workout, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {workout.name}
                    </p>
                    <p className="text-sm text-gray-600">{workout.date}</p>
                  </div>
                  <span className="text-sm font-medium text-blue-500">
                    {workout.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
