'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Sparkles, LogOut, LogIn, CreditCard, Shirt } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', user.id)
          .single();
        if (profile) setCredits(profile.credits || 0);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', currentUser.id)
          .single();
        if (profile) setCredits(profile.credits || 0);
      } else {
        setCredits(0);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-white text-lg tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-black font-black shadow-md shadow-brand-500/20">
            <Shirt className="w-5 h-5" />
          </div>
          <span>FitMorph</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            Provador 3D
          </Link>
          <Link href="/planos" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            Planos & Creditos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link 
                href="/planos"
                className="px-3 py-1.5 rounded-xl bg-dark-800 border border-slate-700 hover:border-slate-600 text-xs font-bold flex items-center gap-2 text-slate-200 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span>{credits} Creditos</span>
              </Link>

              <Link
                href="/planos"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-extrabold text-xs transition-all shadow-md shadow-brand-500/10"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Comprar Creditos
              </Link>

              <button
                onClick={handleLogout}
                title="Sair"
                className="p-2 rounded-xl bg-dark-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-red-400 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/planos"
                className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Planos
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-extrabold text-xs transition-all shadow-md shadow-brand-500/10"
              >
                <LogIn className="w-3.5 h-3.5" />
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}