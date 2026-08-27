'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Shirt, User, LogOut, Zap } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const checkUserAndCredits = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        fetchCredits(user.id);
      }
    };

    checkUserAndCredits();

    // Escuta mudanças na autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCredits(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchCredits = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setCredits(data.credits);
      }
    } catch (err) {
      console.error('Erro ao carregar créditos:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Shirt className="w-5 h-5 text-brand-500" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            Fit<span className="text-brand-500">Morph</span>
          </span>
        </Link>

        {/* NAVEGAÇÃO */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <Link href="/dashboard" className="hover:text-brand-500 transition-colors">
            Provador 3D
          </Link>
          <Link href="/planos" className="hover:text-brand-500 transition-colors">
            Planos & Créditos
          </Link>
        </nav>

        {/* BOTÕES DE ACESSO & CRÉDITOS */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* BADGE DE CRÉDITOS */}
              <Link
                href="/planos"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-500 hover:bg-brand-500/20 text-xs font-bold transition-all"
                title="Clique para recarregar créditos"
              >
                <Zap className="w-3.5 h-3.5 fill-brand-500" />
                <span>{credits} {credits === 1 ? 'Crédito' : 'Créditos'}</span>
              </Link>

              {/* EMAIL */}
              <span className="text-xs text-slate-300 hidden sm:inline-block max-w-[140px] truncate">
                {user.email}
              </span>

              {/* BOTÃO LOGOUT */}
              <button
                onClick={handleLogout}
                className="p-2 bg-dark-800 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl transition-colors"
                title="Sair da Conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-md shadow-brand-500/10"
            >
              <User className="w-4 h-4" />
              <span>Entrar</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}