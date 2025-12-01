import { ArrowLeft, Clock, Flame, Weight } from "lucide-react";
import Link from "next/link";
import ExerciseCard from "@/components/custom/ExerciseCard";
import BottomNav from "@/components/custom/BottomNav";

export default function TreinoDetalhePage() {
  const exercises = [
    { name: "Supino Reto", sets: 4, reps: "8-12 reps", weight: "60 kg" },
    { name: "Supino Inclinado", sets: 3, reps: "10-12 reps", weight: "50 kg" },
    { name: "Crucifixo", sets: 3, reps: "12-15 reps", weight: "20 kg" },
    { name: "Tríceps Testa", sets: 3, reps: "10-12 reps", weight: "30 kg" },
    { name: "Tríceps Corda", sets: 3, reps: "12-15 reps", weight: "25 kg" },
    { name: "Mergulho", sets: 3, reps: "até a falha", weight: "Peso corporal" },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            Treino de Peito e Tríceps
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="flex gap-4 justify-center">
          <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-xl">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-600">Duração</p>
              <p className="font-semibold text-gray-900">50 min</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-xl">
            <Flame className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-600">Calorias</p>
              <p className="font-semibold text-gray-900">400 kcal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-xl">
            <Weight className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-600">Carga</p>
              <p className="font-semibold text-gray-900">2,500 kg</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button className="w-full bg-blue-500 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
          Iniciar Treino
        </button>

        {/* Exercises List */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Exercícios ({exercises.length})
          </h2>
          
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                name={exercise.name}
                sets={exercise.sets}
                reps={exercise.reps}
                weight={exercise.weight}
                href={`/exercicio/${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Notes */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-2">💡 Dicas</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Mantenha a forma correta em todos os exercícios</li>
            <li>• Descanse 60-90 segundos entre as séries</li>
            <li>• Hidrate-se durante o treino</li>
            <li>• Aumente a carga progressivamente</li>
          </ul>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
