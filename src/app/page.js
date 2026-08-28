'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, Zap, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Experimente Roupas no Seu <br/>
            <span className="text-brand-500">Corpo Real</span> Antes de Comprar
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Nossa Inteligência Artificial veste qualquer peça de roupa na sua foto em segundos. Sem manequins genéricos, veja o caimento exato em você.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-brand-500 rounded-xl hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20"
          >
            Acessar Provador Virtual
          </Link>
        </section>

        {/* PRICING SECTION UNIFICADA */}
        <section className="py-20 px-4 bg-dark-950 border-t border-slate-800" id="planos">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-white mb-4">Planos e Pacotes</h2>
              <p className="text-slate-400">Compre créditos avulsos. Sem mensalidades, pague apenas pelo que usar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Pacote Básico */}
              <div className="bg-dark-800 border border-slate-800 rounded-3xl p-8 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white">Pacote Básico</h3>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                    R$ 19,90
                  </div>
                  <p className="text-sm text-slate-400 mt-2">Pagamento único</p>
                </div>
                <ul className="mt-6 mb-8 space-y-4 flex-1">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    <span><strong>20 Créditos</strong> de IA</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    <span>Gerações em alta qualidade</span>
                  </li>
                </ul>
                <a href="https://pay.kiwify.com.br/esrXRjz" target="_blank" className="w-full py-3 rounded-xl bg-dark-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-center">
                  Comprar 20 Créditos
                </a>
              </div>

              {/* Pacote Pro */}
              <div className="bg-dark-800 border-2 border-brand-500 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-2 shadow-2xl shadow-brand-500/10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    Mais Popular
                  </span>
                </div>
                <div className="mb-4 mt-2">
                  <h3 className="text-2xl font-bold text-white">Pacote Pro</h3>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                    R$ 49,90
                  </div>
                  <p className="text-sm text-slate-400 mt-2">Pagamento único</p>
                </div>
                <ul className="mt-6 mb-8 space-y-4 flex-1">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    <span><strong>100 Créditos</strong> de IA</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    <span>Prioridade na fila</span>
                  </li>
                </ul>
                <a href="https://pay.kiwify.com.br/gXxqx6g" target="_blank" className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-center">
                  Comprar 100 Créditos
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}