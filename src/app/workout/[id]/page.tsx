"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Play, Check, Clock, Dumbbell, Video, Pause, RotateCcw, Weight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

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

type SetLog = {
  setNumber: number;
  weight: string;
  reps: string;
  duration: number;
  restDuration: number;
  completed: boolean;
};

type ExerciseLog = {
  exerciseId: string;
  sets: SetLog[];
};

export default function WorkoutPage() {
  const router = useRouter();
  const params = useParams();
  const [workout, setWorkout] = useState<WorkoutDay | null>(null);
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [exerciseLogs, setExerciseLogs] = useState<Record<string, ExerciseLog>>({});
  
  // Timer states
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [timerType, setTimerType] = useState<"set" | "rest" | null>(null);
  const [activeSet, setActiveSet] = useState<{ exerciseId: string; setNumber: number } | null>(null);

  useEffect(() => {
    const workoutData = localStorage.getItem("currentWorkout");
    if (workoutData) {
      const data = JSON.parse(workoutData);
      const day = data.days.find((d: WorkoutDay) => d.id === params.id);
      if (day) {
        setWorkout(day);
        // Initialize logs for all exercises
        const logs: Record<string, ExerciseLog> = {};
        day.exercises.forEach((ex: Exercise) => {
          logs[ex.id] = {
            exerciseId: ex.id,
            sets: Array.from({ length: ex.sets }, (_, i) => ({
              setNumber: i + 1,
              weight: "",
              reps: "",
              duration: 0,
              restDuration: 0,
              completed: false,
            })),
          };
        });
        setExerciseLogs(logs);
      }
    }
  }, [params.id]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setCurrentTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startSet = (exerciseId: string, setNumber: number) => {
    setActiveSet({ exerciseId, setNumber });
    setTimerType("set");
    setCurrentTimer(0);
    setIsTimerRunning(true);
  };

  const completeSet = (exerciseId: string, setNumber: number) => {
    if (!activeSet) return;

    const setDuration = currentTimer;
    setIsTimerRunning(false);

    // Update set log with duration
    setExerciseLogs((prev) => {
      const updated = { ...prev };
      const setIndex = setNumber - 1;
      updated[exerciseId].sets[setIndex] = {
        ...updated[exerciseId].sets[setIndex],
        duration: setDuration,
        completed: true,
      };
      return updated;
    });

    // Start rest timer
    setTimerType("rest");
    setCurrentTimer(0);
    setIsTimerRunning(true);
  };

  const skipRest = () => {
    if (timerType === "rest" && activeSet) {
      const restDuration = currentTimer;
      setIsTimerRunning(false);

      // Update rest duration
      setExerciseLogs((prev) => {
        const updated = { ...prev };
        const setIndex = activeSet.setNumber - 1;
        updated[activeSet.exerciseId].sets[setIndex] = {
          ...updated[activeSet.exerciseId].sets[setIndex],
          restDuration,
        };
        return updated;
      });

      setTimerType(null);
      setActiveSet(null);
      setCurrentTimer(0);
    }
  };

  const updateSetData = (exerciseId: string, setNumber: number, field: "weight" | "reps", value: string) => {
    setExerciseLogs((prev) => {
      const updated = { ...prev };
      const setIndex = setNumber - 1;
      updated[exerciseId].sets[setIndex] = {
        ...updated[exerciseId].sets[setIndex],
        [field]: value,
      };
      return updated;
    });
  };

  const toggleExerciseComplete = (exerciseId: string) => {
    if (!workout) return;

    const exerciseLog = exerciseLogs[exerciseId];
    const allSetsCompleted = exerciseLog.sets.every((set) => set.completed);

    if (!allSetsCompleted) {
      alert("Complete todas as séries antes de finalizar o exercício!");
      return;
    }

    const updatedExercises = workout.exercises.map((ex) =>
      ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
    );

    const updatedWorkout = { ...workout, exercises: updatedExercises };
    setWorkout(updatedWorkout);

    // Update in localStorage
    const workoutData = JSON.parse(localStorage.getItem("currentWorkout") || "{}");
    const updatedDays = workoutData.days.map((d: WorkoutDay) =>
      d.id === workout.id ? updatedWorkout : d
    );
    localStorage.setItem("currentWorkout", JSON.stringify({ ...workoutData, days: updatedDays }));
  };

  const completeWorkout = () => {
    if (!workout) return;

    const allCompleted = workout.exercises.every((ex) => ex.completed);
    
    if (!allCompleted) {
      alert("Complete todos os exercícios antes de finalizar o treino!");
      return;
    }

    // Save workout logs
    const workoutLog = {
      workoutId: workout.id,
      date: new Date().toISOString(),
      exercises: exerciseLogs,
    };
    
    const existingLogs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
    localStorage.setItem("workoutLogs", JSON.stringify([...existingLogs, workoutLog]));

    // Mark workout as completed
    const workoutData = JSON.parse(localStorage.getItem("currentWorkout") || "{}");
    const updatedDays = workoutData.days.map((d: WorkoutDay) =>
      d.id === workout.id ? { ...d, completed: true } : d
    );
    localStorage.setItem("currentWorkout", JSON.stringify({ ...workoutData, days: updatedDays }));

    router.push("/dashboard");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!workout) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const completedCount = workout.exercises.filter((ex) => ex.completed).length;
  const totalCount = workout.exercises.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-blue-700 z-10 shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white text-sm font-medium">{workout.duration} min</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">{workout.name}</h1>
          <p className="text-blue-100 text-sm mb-4">{workout.dayOfWeek}</p>

          {/* Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">Progresso</span>
              <span className="text-blue-100 text-sm">
                {completedCount}/{totalCount} exercícios
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
      </div>

      {/* Active Timer Display */}
      {timerType && activeSet && (
        <div className="sticky top-[200px] z-20 mx-6 mt-4">
          <div className={`rounded-2xl p-4 ${timerType === "set" ? "bg-blue-500" : "bg-orange-500"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">
                  {timerType === "set" ? "Executando Série" : "Descanso"}
                </p>
                <p className="text-white text-2xl font-bold">{formatTime(currentTimer)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                >
                  {isTimerRunning ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                {timerType === "rest" && (
                  <button
                    onClick={skipRest}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
                  >
                    <span className="text-white text-sm font-medium">Pular</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exercises List */}
      <div className="p-6 space-y-4">
        {workout.exercises.map((exercise, index) => {
          const exerciseLog = exerciseLogs[exercise.id];

          return (
            <div
              key={exercise.id}
              className={`rounded-2xl border-2 overflow-hidden transition-all ${
                exercise.completed
                  ? "bg-green-500/10 border-green-500/30"
                  : activeExercise === exercise.id
                  ? "bg-blue-500/10 border-blue-500"
                  : "bg-gray-900 border-gray-800"
              }`}
            >
              {/* Exercise Header */}
              <button
                onClick={() =>
                  setActiveExercise(activeExercise === exercise.id ? null : exercise.id)
                }
                className="w-full p-4 text-left"
              >
                <div className="flex items-start gap-4">
                  {/* Number Badge */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      exercise.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {exercise.completed ? <Check className="w-5 h-5" /> : index + 1}
                  </div>

                  {/* Exercise Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{exercise.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-4 h-4" />
                        {exercise.sets}x{exercise.reps}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {exercise.rest}s
                      </span>
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                        {exercise.load}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Exercise Details (Expanded) */}
              {activeExercise === exercise.id && exerciseLog && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-800">
                  <div className="pt-3">
                    {/* Video Button */}
                    <button
                      onClick={() => window.open(exercise.videoUrl, "_blank")}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4"
                    >
                      <Video className="w-4 h-4" />
                      Ver Demonstração
                    </button>

                    {/* Sets Tracking */}
                    <div className="space-y-3">
                      {exerciseLog.sets.map((set, setIndex) => (
                        <div
                          key={setIndex}
                          className={`p-3 rounded-lg border-2 ${
                            set.completed
                              ? "bg-green-500/10 border-green-500/30"
                              : "bg-gray-800 border-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">Série {set.setNumber}</span>
                            {set.completed && (
                              <span className="text-green-400 text-xs">
                                ⏱️ {formatTime(set.duration)} | 💤 {formatTime(set.restDuration)}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">Carga (kg)</label>
                              <input
                                type="number"
                                value={set.weight}
                                onChange={(e) =>
                                  updateSetData(exercise.id, set.setNumber, "weight", e.target.value)
                                }
                                placeholder="Ex: 20"
                                disabled={set.completed}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white text-sm disabled:opacity-50"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">Repetições</label>
                              <input
                                type="number"
                                value={set.reps}
                                onChange={(e) =>
                                  updateSetData(exercise.id, set.setNumber, "reps", e.target.value)
                                }
                                placeholder="Ex: 12"
                                disabled={set.completed}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white text-sm disabled:opacity-50"
                              />
                            </div>
                          </div>

                          {!set.completed ? (
                            <button
                              onClick={() => {
                                if (!set.weight || !set.reps) {
                                  alert("Preencha carga e repetições antes de iniciar!");
                                  return;
                                }
                                if (activeSet?.exerciseId === exercise.id && activeSet?.setNumber === set.setNumber && timerType === "set") {
                                  completeSet(exercise.id, set.setNumber);
                                } else {
                                  startSet(exercise.id, set.setNumber);
                                }
                              }}
                              disabled={!set.weight || !set.reps}
                              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                                activeSet?.exerciseId === exercise.id && activeSet?.setNumber === set.setNumber && timerType === "set"
                                  ? "bg-red-500 hover:bg-red-600 text-white"
                                  : "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-700 disabled:text-gray-500"
                              }`}
                            >
                              {activeSet?.exerciseId === exercise.id && activeSet?.setNumber === set.setNumber && timerType === "set"
                                ? "Finalizar Série"
                                : "Iniciar Série"}
                            </button>
                          ) : (
                            <div className="bg-green-500/20 text-green-400 py-2 rounded-lg text-center text-sm font-medium">
                              ✓ Série Concluída
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Complete Exercise Button */}
                    <button
                      onClick={() => toggleExerciseComplete(exercise.id)}
                      disabled={!exerciseLog.sets.every((s) => s.completed)}
                      className={`w-full py-3 rounded-lg font-medium transition-colors mt-4 ${
                        exercise.completed
                          ? "bg-gray-800 text-gray-400"
                          : exerciseLog.sets.every((s) => s.completed)
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gray-700 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {exercise.completed ? "✓ Exercício Concluído" : "Finalizar Exercício"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent">
        <button
          onClick={completeWorkout}
          disabled={completedCount < totalCount}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            completedCount === totalCount
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Check className="w-5 h-5" />
          Finalizar Treino
        </button>
      </div>
    </div>
  );
}
