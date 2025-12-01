"use client";

import { useState } from "react";
import { ArrowRight, Dumbbell, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-500 ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
        {/* Logo Icon */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl shadow-2xl">
            <Dumbbell className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          UltraFit
        </h1>

        {/* Subtitle */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <p className="text-xl text-gray-300">
            Treinos Personalizados com IA
          </p>
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>

        {/* Description */}
        <p className="text-gray-400 max-w-md mb-12 text-lg leading-relaxed">
          Seu treinador pessoal inteligente que cria treinos sob medida,
          adapta sua evolução e te acompanha em cada passo da jornada.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleStart}
          className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3 hover:scale-105 active:scale-95"
        >
          Criar Meu Treino
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          {[
            { icon: "🎯", title: "100% Personalizado", desc: "Treinos adaptados ao seu perfil" },
            { icon: "📈", title: "Evolução Real", desc: "Acompanhe seu progresso" },
            { icon: "🤖", title: "IA Avançada", desc: "Ajustes semanais inteligentes" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
