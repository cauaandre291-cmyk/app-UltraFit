"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, Calendar, Dumbbell, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProgressPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  // Mock progress data (in production, this would come from database)
  const weightProgress = [
    { week: 1, value: 70 },
    { week: 2, value: 69.5 },
    { week: 3, value: 69.2 },
    { week: 4, value: 68.8 },
  ];

  const volumeProgress = [
    { week: 1, value: 2500 },
    { week: 2, value: 2800 },
    { week: 3, value: 3100 },
    { week: 4, value: 3400 },
  ];

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold">Evolução</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-white" />
              <span className="text-sm text-blue-100">Peso Atual</span>
            </div>
            <p className="text-3xl font-bold text-white">{userData.weight}</p>
            <p className="text-sm text-blue-100">kg</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-sm text-green-100">Progresso</span>
            </div>
            <p className="text-3xl font-bold text-white">-1.2</p>
            <p className="text-sm text-green-100">kg perdidos</p>
          </div>
        </div>

        {/* Weight Chart */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Evolução de Peso</h2>
          </div>

          <div className="space-y-4">
            {weightProgress.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Semana {data.week}</span>
                  <span className="text-white font-semibold">{data.value} kg</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${(data.value / 75) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Chart */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Dumbbell className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Volume de Treino</h2>
          </div>

          <div className="space-y-4">
            {volumeProgress.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Semana {data.week}</span>
                  <span className="text-white font-semibold">{data.value} kg</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                    style={{ width: `${(data.value / 4000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body Measurements */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Medidas Corporais</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Altura", value: `${userData.height} cm` },
              { label: "Peso", value: `${userData.weight} kg` },
              { label: "IMC", value: "23.5" },
              { label: "Idade", value: `${userData.age} anos` },
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-3">
                <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                <p className="text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Timeline */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Linha do Tempo</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((week) => (
              <div key={week} className="flex-shrink-0">
                <div className="w-24 h-32 bg-gray-800 rounded-xl flex items-center justify-center mb-2">
                  <Calendar className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-xs text-gray-400 text-center">Semana {week}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
            Adicionar Foto
          </button>
        </div>
      </div>
    </div>
  );
}
