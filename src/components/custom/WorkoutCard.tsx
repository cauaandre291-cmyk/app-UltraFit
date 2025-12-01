import { Clock, Flame, Dumbbell } from "lucide-react";
import Link from "next/link";

interface WorkoutCardProps {
  title: string;
  description: string;
  duration: string;
  calories: string;
  exercises: number;
  progress: number;
  href: string;
}

export default function WorkoutCard({
  title,
  description,
  duration,
  calories,
  exercises,
  progress,
  href,
}: WorkoutCardProps) {
  return (
    <Link href={href}>
      <div className="bg-blue-50 rounded-2xl p-6 hover:bg-blue-100 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          </div>
          <Dumbbell className="w-12 h-12 text-blue-500" />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Flame className="w-4 h-4 text-blue-500" />
            <span>{calories}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Dumbbell className="w-4 h-4 text-blue-500" />
            <span>{exercises} exercícios</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progresso</span>
            <span className="text-blue-500 font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
