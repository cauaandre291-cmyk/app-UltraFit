"use client";

import { useState, useEffect } from "react";
import { Calendar, TrendingUp, Dumbbell, User, Play, ChevronRight, Ruler } from "lucide-react";
import { useRouter } from "next/navigation";

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  load: string;
  videoUrl: string;
  muscleGroup: string;
  completed?: boolean;
};

type WorkoutDay = {
  id: string;
  name: string;
  dayOfWeek: string;
  duration: number;
  exercises: Exercise[];
  completed?: boolean;
};

type Workout = {
  id: string;
  weekNumber: number;
  startDate: string;
  days: WorkoutDay[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const workoutData = localStorage.getItem("currentWorkout");
    const userDataStr = localStorage.getItem("userData");
    
    if (workoutData) {
      setWorkout(JSON.parse(workoutData));
    }
    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    }
  }, []);

  if (!workout || !userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const completedDays = workout.days.filter((d) => d.completed).length;
  const totalDays = workout.days.length;
  const progressPercentage = (completedDays / totalDays) * 100;

  const nextWorkout = workout.days.find((d) => !d.completed);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Olá,</p>
            <h1 className="text-2xl font-bold text-white">{userData.name || "Atleta"}</h1>
          </div>
          <button
            onClick={() => router.push("/profile")}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <User className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">Semana {workout.weekNumber}</span>
            </div>
            <span className="text-sm text-blue-100">
              {completedDays}/{totalDays} treinos
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Next Workout Card */}
        {nextWorkout && (
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-blue-100 text-sm mb-1">Próximo Treino</p>
                <h2 className="text-2xl font-bold text-white mb-1">{nextWorkout.name}</h2>
                <p className="text-blue-100 text-sm">{nextWorkout.dayOfWeek}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium">{nextWorkout.duration} min</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-white/90">
                <Dumbbell className="w-4 h-4" />
                <span className="text-sm">{nextWorkout.exercises.length} exercícios</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/workout/${nextWorkout.id}`)}
              className="w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-5 h-5" />
              Iniciar Treino
            </button>
          </div>
        )}

        {/* This Week's Workouts */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Treinos da Semana</h3>
          <div className="space-y-3">
            {workout.days.map((day) => (
              <button
                key={day.id}
                onClick={() => router.push(`/workout/${day.id}`)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  day.completed
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{day.name}</h4>
                      {day.completed && (
                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Concluído
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{day.dayOfWeek} • {day.duration} min</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-400">Progresso</span>
            </div>
            <p className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-400">Treinos</span>
            </div>
            <p className="text-2xl font-bold text-white">{completedDays}/{totalDays}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/progress")}
            className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Ver Evolução Completa
          </button>
          
          <button
            onClick={() => router.push("/feedback")}
            className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Feedback da Semana
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center justify-around p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex flex-col items-center gap-1 text-blue-500"
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-xs font-medium">Treinos</span>
          </button>

          <button
            onClick={() => router.push("/corpo")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
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
