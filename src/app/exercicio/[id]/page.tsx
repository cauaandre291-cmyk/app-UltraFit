"use client";

import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ExercicioPage() {
  const [currentSet, setCurrentSet] = useState(1);
  const [prepTime, setPrepTime] = useState(90);

  const sets = [
    { set: 1, reps: 12, weight: 60 },
    { set: 2, reps: 10, weight: 65 },
    { set: 3, reps: 8, weight: 70 },
    { set: 4, reps: 8, weight: 70 },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link
            href="/treino/1"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Supino Reto</h1>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-6 py-6 flex flex-col">
        {/* Exercise Image */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🏋️</div>
            <p className="text-sm text-gray-600">
              Ilustração do exercício
            </p>
          </div>
        </div>

        {/* Sets */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Séries</h2>
          <div className="grid grid-cols-4 gap-2">
            {sets.map((set) => (
              <button
                key={set.set}
                onClick={() => setCurrentSet(set.set)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  currentSet === set.set
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <p className="text-xs text-gray-600 mb-1">Série {set.set}</p>
                <p className="font-bold text-gray-900">{set.reps} reps</p>
                <p className="text-xs text-blue-500">{set.weight} kg</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preparation Time */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Tempo de Preparação</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Em andamento</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-500 mb-2">{prepTime}s</p>
            <div className="flex gap-2 justify-center">
              <button className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Pausar
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Pular
              </button>
            </div>
          </div>
        </div>

        {/* Next Exercise */}
        <div className="mt-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-600 mb-2">Próximo Exercício</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💪</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Supino Inclinado</p>
                  <p className="text-sm text-gray-600">3 séries • 10-12 reps</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
