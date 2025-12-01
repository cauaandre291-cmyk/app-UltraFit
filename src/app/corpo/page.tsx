"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, TrendingUp, Calendar, Dumbbell, User, Ruler } from "lucide-react";
import { useRouter } from "next/navigation";

type BodyMeasurements = {
  date: string;
  chest: string;
  waist: string;
  hips: string;
  rightArm: string;
  leftArm: string;
  rightForearm: string;
  leftForearm: string;
  rightThigh: string;
  leftThigh: string;
  rightCalf: string;
  leftCalf: string;
  shoulders: string;
  neck: string;
};

type MeasurementHistory = {
  measurements: BodyMeasurements[];
};

export default function BodyMeasurementsPage() {
  const router = useRouter();
  const [currentMeasurements, setCurrentMeasurements] = useState<BodyMeasurements>({
    date: new Date().toISOString().split("T")[0],
    chest: "",
    waist: "",
    hips: "",
    rightArm: "",
    leftArm: "",
    rightForearm: "",
    leftForearm: "",
    rightThigh: "",
    leftThigh: "",
    rightCalf: "",
    leftCalf: "",
    shoulders: "",
    neck: "",
  });

  const [history, setHistory] = useState<MeasurementHistory>({ measurements: [] });
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem("bodyMeasurements");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSave = () => {
    // Verificar se pelo menos uma medida foi preenchida
    const hasAnyMeasurement = Object.entries(currentMeasurements).some(
      ([key, value]) => key !== "date" && value !== ""
    );

    if (!hasAnyMeasurement) {
      alert("Preencha pelo menos uma medida antes de salvar!");
      return;
    }

    const newHistory = {
      measurements: [...history.measurements, currentMeasurements],
    };

    localStorage.setItem("bodyMeasurements", JSON.stringify(newHistory));
    setHistory(newHistory);

    alert("Medidas salvas com sucesso!");

    // Resetar formulário
    setCurrentMeasurements({
      date: new Date().toISOString().split("T")[0],
      chest: "",
      waist: "",
      hips: "",
      rightArm: "",
      leftArm: "",
      rightForearm: "",
      leftForearm: "",
      rightThigh: "",
      leftThigh: "",
      rightCalf: "",
      leftCalf: "",
      shoulders: "",
      neck: "",
    });
  };

  const measurementFields = [
    { key: "chest", label: "Peito", icon: "💪" },
    { key: "shoulders", label: "Ombros", icon: "🏋️" },
    { key: "waist", label: "Cintura", icon: "📏" },
    { key: "hips", label: "Quadril", icon: "🍑" },
    { key: "rightArm", label: "Braço Direito", icon: "💪" },
    { key: "leftArm", label: "Braço Esquerdo", icon: "💪" },
    { key: "rightForearm", label: "Antebraço Direito", icon: "🤜" },
    { key: "leftForearm", label: "Antebraço Esquerdo", icon: "🤛" },
    { key: "rightThigh", label: "Coxa Direita", icon: "🦵" },
    { key: "leftThigh", label: "Coxa Esquerda", icon: "🦵" },
    { key: "rightCalf", label: "Panturrilha Direita", icon: "🦿" },
    { key: "leftCalf", label: "Panturrilha Esquerda", icon: "🦿" },
    { key: "neck", label: "Pescoço", icon: "👔" },
  ];

  const getLatestMeasurement = (key: string) => {
    if (history.measurements.length === 0) return null;
    const latest = history.measurements[history.measurements.length - 1];
    return latest[key as keyof BodyMeasurements];
  };

  const calculateDifference = (key: string) => {
    if (history.measurements.length < 2) return null;
    const latest = history.measurements[history.measurements.length - 1];
    const previous = history.measurements[history.measurements.length - 2];
    const latestValue = parseFloat(latest[key as keyof BodyMeasurements] || "0");
    const previousValue = parseFloat(previous[key as keyof BodyMeasurements] || "0");
    const diff = latestValue - previousValue;
    return diff !== 0 ? diff : null;
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-blue-700 z-10 shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Medidas Corporais</h1>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Histórico</span>
            </button>
          </div>

          <p className="text-blue-100 text-sm">
            Acompanhe sua evolução física ao longo do tempo
          </p>
        </div>
      </div>

      {showHistory ? (
        // Histórico de Medidas
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">Histórico de Medidas</h2>
          {history.measurements.length === 0 ? (
            <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
              <p className="text-gray-400">Nenhuma medida registrada ainda</p>
            </div>
          ) : (
            history.measurements
              .slice()
              .reverse()
              .map((measurement, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl p-4 border border-gray-800"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-400 font-medium">
                      {new Date(measurement.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {measurementFields.map((field) => {
                      const value = measurement[field.key as keyof BodyMeasurements];
                      if (!value) return null;
                      return (
                        <div key={field.key} className="flex justify-between">
                          <span className="text-gray-400">{field.label}:</span>
                          <span className="text-white font-medium">{value} cm</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
          )}
        </div>
      ) : (
        // Formulário de Nova Medida
        <div className="p-6 space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-sm text-blue-300">
              💡 Dica: Tire as medidas sempre no mesmo horário e nas mesmas condições para
              resultados mais precisos. Todas as medidas são em centímetros (cm).
            </p>
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Data da Medição
            </label>
            <input
              type="date"
              value={currentMeasurements.date}
              onChange={(e) =>
                setCurrentMeasurements({ ...currentMeasurements, date: e.target.value })
              }
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Campos de Medidas */}
          <div className="space-y-4">
            {measurementFields.map((field) => {
              const latestValue = getLatestMeasurement(field.key);
              const diff = calculateDifference(field.key);

              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
                    <span>{field.icon}</span>
                    <span>{field.label}</span>
                    {latestValue && (
                      <span className="text-xs text-gray-500">
                        (última: {latestValue} cm
                        {diff !== null && (
                          <span
                            className={
                              diff > 0 ? "text-green-400" : diff < 0 ? "text-red-400" : ""
                            }
                          >
                            {" "}
                            {diff > 0 ? "+" : ""}
                            {diff.toFixed(1)}
                          </span>
                        )}
                        )
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentMeasurements[field.key as keyof BodyMeasurements]}
                    onChange={(e) =>
                      setCurrentMeasurements({
                        ...currentMeasurements,
                        [field.key]: e.target.value,
                      })
                    }
                    placeholder="Ex: 35.5"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              );
            })}
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <Save className="w-5 h-5" />
            Salvar Medidas
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center justify-around p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-xs font-medium">Treinos</span>
          </button>

          <button
            onClick={() => router.push("/corpo")}
            className="flex flex-col items-center gap-1 text-blue-500"
          >
            <Ruler className="w-6 h-6" />
            <span className="text-xs font-medium">Medidas</span>
          </button>

          <button
            onClick={() => router.push("/exercicios")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Exercícios</span>
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
