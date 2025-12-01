"use client";

import { useState } from "react";
import { ArrowLeft, Camera, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    restrictions: [] as string[],
    focus: [] as string[],
  });

  const restrictions = [
    "Joelho",
    "Ombro",
    "Lombar",
    "Quadril",
    "Punho",
    "Tornozelo",
    "Pescoço",
    "Nenhuma",
  ];

  const focusAreas = [
    "Peito",
    "Costas",
    "Braços",
    "Pernas",
    "Glúteos",
    "Balanceado",
  ];

  const handleSubmit = async () => {
    const onboardingData = JSON.parse(localStorage.getItem("onboarding") || "{}");
    const completeData = { ...onboardingData, ...formData };
    
    // Save to localStorage temporarily
    localStorage.setItem("userData", JSON.stringify(completeData));
    
    // Navigate to generating screen
    router.push("/generating");
  };

  const toggleArray = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];
  };

  const canSubmit = formData.name && formData.age && formData.gender && formData.height && formData.weight;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-gray-800 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Perfil</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="p-6 pb-24 max-w-2xl mx-auto">
        {/* Photo Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-lg transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-sm text-gray-400">Foto opcional para acompanhar evolução</p>
        </div>

        {/* Basic Info */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Seu nome"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Idade
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Gênero
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Altura (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="175"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Peso (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="70"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Restrictions */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-300">
            Histórico de lesões ou restrições
          </label>
          <div className="flex flex-wrap gap-2">
            {restrictions.map((restriction) => {
              const isSelected = formData.restrictions.includes(restriction);
              return (
                <button
                  key={restriction}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      restrictions: toggleArray(formData.restrictions, restriction),
                    })
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {restriction}
                </button>
              );
            })}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3 text-gray-300">
            Partes do corpo que deseja enfatizar
          </label>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => {
              const isSelected = formData.focus.includes(area);
              return (
                <button
                  key={area}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      focus: toggleArray(formData.focus, area),
                    })
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {area}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            canSubmit
              ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Gerar Meu Treino
        </button>
      </div>
    </div>
  );
}
