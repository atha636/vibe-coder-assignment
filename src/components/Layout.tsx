import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useListStore } from "@/store/listStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
const count = useListStore((state) => state.profiles.length);
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-bold text-slate-900 tracking-tight hover:text-slate-700"
          >
            Influencer Search
          </Link>
          <Link
            to="/list"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:scale-105 active:scale-95 transition-all duration-150 inline-block"
          >
            My List {count > 0 && `(${count})`}
          </Link>
        </div>
        {title && (
          <div className="max-w-5xl mx-auto px-4 pb-3">
            <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
          </div>
        )}
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
