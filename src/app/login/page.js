'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Shirt, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        // Criar nova conta no Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setSuccessMsg('Conta criada com sucesso! Verifique seu e-mail ou faça login.');
      } else {
        // Fazer login no Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Redireciona para o criador do avatar após o login
        router.push('/avatar-builder');
      }
    } catch (error) {
      setErrorMsg(error.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-dark-800/60 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Efeito Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-2xl rounded-full pointer-events-none" />

          {/* Cabeçalho do Card */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/20">
              <Shirt className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {isSignUp ? 'Criar sua conta' : 'Acessar o FitMorph'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {isSignUp 
                ? 'Insira seus dados para começar a testar roupas' 
                : 'Entre para acessar seu avatar e provador virtual'}
            </p>
          </div>

          {/* Mensagem de Erro */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Mensagem de Sucesso */}
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-500 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 mt-6 hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Cadastrar Minha Conta' : 'Entrar no Provador'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Alternar entre Login e Cadastro */}
          <div className="mt-6 text-center text-xs text-slate-400">
            {isSignUp ? 'Já possui uma conta?' : 'Ainda não tem uma conta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-brand-500 font-semibold hover:underline ml-1"
            >
              {isSignUp ? 'Fazer Login' : 'Criar Conta Agora'}
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}