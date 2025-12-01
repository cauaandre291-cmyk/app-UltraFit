"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, User, Edit2, Target, Dumbbell, Calendar, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  const handleRecalculate = () => {
    if (confirm("Deseja recalcular seu treino? Isso criará uma nova ficha personalizada.")) {
      router.push("/onboarding");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const goalLabels: Record<string, string> = {
    hypertrophy: "Hipertrofia",
    weight_loss: "Emagrecimento",
    conditioning: "Condicionamento",
    strength: "Força",
    health: "Saúde",
    mobility: "Mobilidade",
  };

  const experienceLabels: Record<string, string> = {
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
  };

  const equipmentLabels: Record<string, string> = {
    full_gym: "Academia completa",
    basic_gym: "Academia básica",
    dumbbells: "Apenas halteres",
    resistance_bands: "Apenas elásticos",
    bodyweight: "Peso do corpo",
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="text-white hover:text-blue-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-white">Perfil</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-white hover:text-blue-100 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{userData.name}</h2>
          <p className="text-blue-100 text-sm">{userData.age} anos • {userData.gender === "male" ? "Masculino" : userData.gender === "female" ? "Feminino" : "Outro"}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Physical Stats */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Dados Físicos</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Altura</p>
              <p className="text-xl font-semibold text-white">{userData.height} cm</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Peso</p>
              <p className="text-xl font-semibold text-white">{userData.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">IMC</p>
              <p className="text-xl font-semibold text-white">
                {(parseFloat(userData.weight) / Math.pow(parseFloat(userData.height) / 100, 2)).toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Idade</p>
              <p className="text-xl font-semibold text-white">{userData.age} anos</p>
            </div>
          </div>
        </div>

        {/* Training Info */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Informações de Treino</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-400">Objetivo</p>
                <p className="text-white font-medium">{goalLabels[userData.goal] || userData.goal}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Dumbbell className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-400">Nível</p>
                <p className="text-white font-medium">{experienceLabels[userData.experience] || userData.experience}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-400">Equipamento</p>
                <p className="text-white font-medium">{equipmentLabels[userData.equipment] || userData.equipment}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-400">Tempo por treino</p>
                <p className="text-white font-medium">{userData.time} minutos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Restrictions */}
        {userData.restrictions && userData.restrictions.length > 0 && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Restrições</h3>
            <div className="flex flex-wrap gap-2">
              {userData.restrictions.map((restriction: string, index: number) => (
                <span
                  key={index}
                  className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
                >
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Focus Areas */}
        {userData.focus && userData.focus.length > 0 && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Áreas de Foco</h3>
            <div className="flex flex-wrap gap-2">
              {userData.focus.map((area: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleRecalculate}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Recalcular Treino
          </button>

          <button
            onClick={() => router.push("/onboarding/profile")}
            className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Editar Perfil
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
