"use client";

import {
  Calendar,
  LayoutDashboard,
  Users,
  Stethoscope,
  CreditCard,
  MoreVertical,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: Calendar, label: "Agendamentos", href: "/agendamentos" },
  { icon: Stethoscope, label: "Médicos", href: "/medicos" },
  { icon: Users, label: "Pacientes", href: "/pacientes" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-border rounded-lg p-2 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-border bg-white transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center gap-2 px-5 py-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a56db]">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-[#1a56db]">
            dr.agenda
          </span>
        </div>
        <nav className="flex-1 px-3">
          <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">
            Menu Principal
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-[#1a56db] text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
              CC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Clinica Care</p>
              <p className="text-xs text-muted-foreground truncate">
                mail@example.com
              </p>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
