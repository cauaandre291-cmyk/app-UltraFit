import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  image?: string;
  href: string;
}

export default function ExerciseCard({
  name,
  sets,
  reps,
  weight,
  image,
  href,
}: ExerciseCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">💪</span>
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{name}</h4>
          <p className="text-sm text-gray-600">
            {sets} séries • {reps}
            {weight && ` • ${weight}`}
          </p>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </Link>
  );
}
