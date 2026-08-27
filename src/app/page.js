import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Camera, Ruler, Shirt, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Efeito Glow ao Fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-brand-500 text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            Provador Virtual 3D com Inteligência Artificial
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Experimente Roupas no Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-emerald-300">Corpo Real</span> Antes de Comprar
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal">
            Envie 3 fotos do seu corpo e suas medidas. Nosso algoritmo cria um avatar hiper-realista para você testar caimento, tamanho e estilo sem sair de casa.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/avatar-builder"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-500 hover:bg-brand-600 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl shadow-brand-500/20 hover:scale-105"
            >
              Criar Meu Avatar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <a
              href="#como-funciona"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-6 py-4 rounded-xl text-base transition-all"
            >
              Ver Como Funciona
            </a>
          </div>

          {/* Garantias rápidas */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-500" /> Fotos 100% Privadas</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Medidas Precisas em 3D</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Sem Troca de Roupas Erradas</span>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (PASSO A PASSO) */}
      <section id="como-funciona" className="py-20 bg-dark-800/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Como o FitMorph Funciona?</h2>
            <p className="text-slate-400 mt-2">Crie seu avatar em menos de 3 minutos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-slate-800 relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Preencha Suas Medidas</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Informe altura, peso, tórax, cintura e quadril para calibrarmos a estrutura óssea do avatar.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-slate-800 relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Envie 3 Fotos Rápidas</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Faça o upload de 3 fotos simples: **Frente**, **Lado** e **Costas**. Nossa IA processa o contorno corporal.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="p-8 rounded-2xl bg-dark-900 border border-slate-800 relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Prove Suas Roupas</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Seu avatar virtual é gerado. Selecione peças e veja exatamente como cada tamanho fica no seu corpo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Planos e Assinaturas</h2>
            <p className="text-slate-400 mt-2">Escolha o melhor plano para o seu guarda-roupa virtual</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Mensal */}
            <div className="p-8 rounded-2xl bg-dark-800/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">Plano Pessoal</h3>
                <p className="text-slate-400 text-sm mt-1">Para quem compra online com frequência</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-white">R$ 29,90</span>
                  <span className="text-slate-400 text-sm"> /mês</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> 1 Avatar 3D Personalizado</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Provador Ilimitado de Peças</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Análise de Tensão do Tecido</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Atualização de Medidas Livre</li>
                </ul>
              </div>
              <Link
                href="/avatar-builder"
                className="mt-8 text-center bg-slate-700 hover:bg-slate-600 font-semibold py-3 rounded-xl transition-colors"
              >
                Assinar Agora
              </Link>
            </div>

            {/* Plano Pro */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-dark-800 to-dark-900 border-2 border-brand-500 relative flex flex-col justify-between shadow-xl shadow-brand-500/10">
              <div className="absolute -top-3.5 right-6 bg-brand-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Mais Popular
              </div>
              <div>
                <h3 className="text-xl font-bold">Plano Anual</h3>
                <p className="text-slate-400 text-sm mt-1">Economize 40% assinando o ano todo</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-white">R$ 19,90</span>
                  <span className="text-slate-400 text-sm"> /mês</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Tudo do Plano Pessoal</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Até 3 Avatares (Família)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Histórico de Guarda-Roupa</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Suporte Prioritário</li>
                </ul>
              </div>
              <Link
                href="/avatar-builder"
                className="mt-8 text-center bg-brand-500 hover:bg-brand-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-500/20"
              >
                Garantir Desconto Anual
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}