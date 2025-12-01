"use client";

import { Home, Activity, Search, Dumbbell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Treinos" },
    { href: "/atividades", icon: Activity, label: "Atividades" },
    { href: "/explorar", icon: Search, label: "Explorar" },
    { href: "/exercicios", icon: Dumbbell, label: "Exercícios" },
    { href: "/corpo", icon: User, label: "Corpo" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-400"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
