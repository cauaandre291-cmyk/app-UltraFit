// User Types
export type Gender = "male" | "female" | "other";

export type Goal = 
  | "hypertrophy" 
  | "weight_loss" 
  | "conditioning" 
  | "strength" 
  | "health" 
  | "mobility";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type Equipment = 
  | "full_gym" 
  | "basic_gym" 
  | "dumbbells" 
  | "resistance_bands" 
  | "bodyweight";

export type DayOfWeek = 
  | "monday" 
  | "tuesday" 
  | "wednesday" 
  | "thursday" 
  | "friday" 
  | "saturday" 
  | "sunday";

export interface UserProfile {
  id?: string;
  name: string;
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  goal: Goal;
  experience: ExperienceLevel;
  frequency: DayOfWeek[];
  equipment: Equipment;
  time: number; // minutes per workout
  restrictions: string[];
  focus: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Exercise Types
export type MuscleGroup = 
  | "Peito" 
  | "Costas" 
  | "Ombros" 
  | "Bíceps" 
  | "Tríceps" 
  | "Pernas" 
  | "Abdômen" 
  | "Glúteos";

export type LoadType = "Leve" | "Média" | "Pesada" | "Leve/Média" | "Média/Pesada";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // e.g., "10-12" or "15"
  rest: number; // seconds
  load: LoadType;
  videoUrl: string;
  muscleGroup: MuscleGroup;
  completed?: boolean;
  notes?: string;
}

// Workout Types
export interface WorkoutDay {
  id: string;
  name: string;
  dayOfWeek: string;
  duration: number; // minutes
  exercises: Exercise[];
  completed?: boolean;
  completedAt?: string;
}

export interface WeeklyWorkout {
  id: string;
  userId?: string;
  weekNumber: number;
  startDate: string;
  endDate?: string;
  days: WorkoutDay[];
  createdAt?: string;
}

// Progress Types
export interface WeightProgress {
  id?: string;
  userId?: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface MeasurementProgress {
  id?: string;
  userId?: string;
  date: string;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
    [key: string]: number | undefined;
  };
  photos?: string[];
}

export interface VolumeProgress {
  id?: string;
  userId?: string;
  date: string;
  totalVolume: number; // kg
  exerciseCount: number;
  workoutDuration: number; // minutes
}

// Feedback Types
export type DifficultyLevel = "too_easy" | "easy" | "perfect" | "hard" | "too_hard";
export type PainLevel = "none" | "mild" | "moderate" | "severe";
export type IntensityPreference = "decrease" | "maintain" | "increase";

export interface WeeklyFeedback {
  id?: string;
  userId?: string;
  weekId: string;
  difficulty: DifficultyLevel;
  pain: PainLevel;
  painAreas?: string[];
  timeIssue: boolean;
  intensity: IntensityPreference;
  notes?: string;
  submittedAt: string;
}

// AI Generation Types
export interface AIWorkoutRequest {
  userProfile: UserProfile;
  previousWorkout?: WeeklyWorkout;
  feedback?: WeeklyFeedback;
  progressData?: {
    weight?: WeightProgress[];
    measurements?: MeasurementProgress[];
    volume?: VolumeProgress[];
  };
}

export interface AIWorkoutResponse {
  workout: WeeklyWorkout;
  reasoning?: string;
  adjustments?: string[];
}

// Database Schema Types (for future Supabase integration)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserProfile;
        Insert: Omit<UserProfile, "id" | "createdAt" | "updatedAt">;
        Update: Partial<Omit<UserProfile, "id">>;
      };
      workouts: {
        Row: WeeklyWorkout;
        Insert: Omit<WeeklyWorkout, "id" | "createdAt">;
        Update: Partial<Omit<WeeklyWorkout, "id">>;
      };
      exercises: {
        Row: Exercise;
        Insert: Omit<Exercise, "id">;
        Update: Partial<Omit<Exercise, "id">>;
      };
      weight_progress: {
        Row: WeightProgress;
        Insert: Omit<WeightProgress, "id">;
        Update: Partial<Omit<WeightProgress, "id">>;
      };
      measurement_progress: {
        Row: MeasurementProgress;
        Insert: Omit<MeasurementProgress, "id">;
        Update: Partial<Omit<MeasurementProgress, "id">>;
      };
      volume_progress: {
        Row: VolumeProgress;
        Insert: Omit<VolumeProgress, "id">;
        Update: Partial<Omit<VolumeProgress, "id">>;
      };
      feedback: {
        Row: WeeklyFeedback;
        Insert: Omit<WeeklyFeedback, "id">;
        Update: Partial<Omit<WeeklyFeedback, "id">>;
      };
    };
  };
}
