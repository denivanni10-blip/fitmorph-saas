'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Sparkles, HelpCircle, Star, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PlanosPage() {
  const [billingCycle, setBillingCycle] = useState('mensal'); // 'mensal' ou 'anual'

  const plans = [
    {
      name: 'Gratuito',
      tagline: 'Para quem quer apenas experimentar a IA.',
      priceMensal: 'R$ 0',
      priceAnual: 'R$ 0',
      period: 'para sempre',
      popular: false,
      buttonText: 'Plano Atual',
      buttonVariant: 'secondary',
      features: [
        '3 provas de roupa por mês',
        'Qualidade de imagem padrão',
        'Suporte comunitário',
        'Acesso ao provador básico',
      ],
    },
    {
      name: 'Personal Style',
      tagline: 'Perfeito para quem ama moda e compra online.',
      priceMensal: 'R$ 29,90',
      priceAnual: 'R$ 23,90',
      period: '/mês',
      popular: true,
      buttonText: 'Assinar Personal',
      buttonVariant: 'primary',
      features: [
        '50 provas de roupa por mês',
        'Processamento Ultra-Rápido (IA de alta velocidade)',
        'Resolução HD nas imagens',
        'Histórico ilimitado de provas salvas',
        'Acesso a todas as categorias de roupas',
        'Suporte prioritário via WhatsApp',
      ],
    },
    {
      name: 'Lojista & Creator',
      tagline: 'Ideal para lojas de roupas, e-commerce e criadores.',
      priceMensal: 'R$ 79,90',
      priceAnual: 'R$ 63,90',
      period: '/mês',
      popular: false,
      buttonText: 'Assinar Pro Creator',
      buttonVariant: 'outline',
      features: [
        '300 provas de roupa por mês',
        'Máxima resolução (4K Ultra-Sharp)',
        'Direito de uso comercial das imagens',
        'Fila VIP sem espera no servidor',
        'Exportação em lote',
        'Gerente de conta exclusivo',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Como funcionam os créditos de prova?',
      a: 'Cada vez que você envia uma peça para provar no seu avatar e a IA gera o resultado, 1 crédito é consumido. Os créditos são renovados mensalmente.',
    },
    {
      q: 'Posso cancelar minha assinatura quando quiser?',
      a: 'Com certeza! Você pode cancelar sua assinatura a qualquer momento com apenas 1 clique no seu painel, sem taxas extras ou fidelidade.',
    },
    {
      q: 'A IA funciona para qualquer tipo de roupa?',
      a: 'Sim! Funciona com camisetas, camisas de time, jaquetas, vestidos, calças, saias e moletons. Basta enviar uma foto nítida da peça.',
    },
    {
      q: 'Seus dados e fotos estão seguros?',
      a: 'Totalmente. Suas fotos são processadas em ambiente criptografado e nunca são vendidas ou compartilhadas com terceiros.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100">
      <Navbar />

      {/* ADICIONADO pt-28 PARA O CONTEÚDO NÃO FICAR ATRÁS DA NAVBAR FIXA */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* CABEÇALHO */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Planos Flexíveis</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Escolha o plano ideal para o seu estilo
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
            Desbloqueie todo o potencial da nossa IA e veja como qualquer roupa fica no seu corpo antes mesmo de comprar.
          </p>

          {/* TOGGLE MENSAL / ANUAL */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold transition-colors ${billingCycle === 'mensal' ? 'text-white' : 'text-slate-400'}`}>
              Cobrança Mensal
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'mensal' ? 'anual' : 'mensal')}
              className="relative w-14 h-8 bg-dark-800 rounded-full p-1 border border-slate-700 transition-colors focus:outline-none"
            >
              <div
                className={`w-6 h-6 rounded-full bg-brand-500 transition-transform ${
                  billingCycle === 'anual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${billingCycle === 'anual' ? 'text-white' : 'text-slate-400'}`}>
              Cobrança Anual
              <span className="text-[10px] bg-brand-500/20 text-brand-500 px-2 py-0.5 rounded-full font-bold">
                20% OFF
              </span>
            </span>
          </div>
        </div>

        {/* CARDS DE PLANOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-dark-800/90 border-2 border-brand-500 shadow-2xl shadow-brand-500/10 md:-translate-y-2'
                  : 'bg-dark-800/40 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-black" />
                  Mais Escolhido
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-xs text-slate-300 mb-6 min-h-[32px]">{plan.tagline}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    {billingCycle === 'anual' ? plan.priceAnual : plan.priceMensal}
                  </span>
                  <span className="text-slate-400 text-xs">{plan.period}</span>
                </div>

                <ul className="space-y-3.5 text-xs text-slate-200 mb-8 border-t border-slate-800/80 pt-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.buttonVariant === 'primary'
                    ? 'bg-brand-500 hover:bg-brand-600 text-black shadow-lg shadow-brand-500/20'
                    : plan.buttonVariant === 'outline'
                    ? 'border border-brand-500/50 text-brand-500 hover:bg-brand-500/10'
                    : 'bg-slate-800 text-slate-400 cursor-default'
                }`}
              >
                <span>{plan.buttonText}</span>
                {plan.buttonVariant !== 'secondary' && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

        {/* SEÇÃO FAQ */}
        <div className="max-w-3xl mx-auto border-t border-slate-800 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand-500" />
              Perguntas Frequentes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-dark-800/30 border border-slate-800/80 rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GARANTIA */}
        <div className="mt-16 bg-dark-800/40 border border-slate-800 rounded-2xl p-6 text-center max-w-xl mx-auto flex items-center justify-center gap-4">
          <ShieldCheck className="w-10 h-10 text-brand-500 shrink-0" />
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Garantia de Satisfação</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Experimente sem riscos. Se não ficar satisfeito com os resultados nos primeiros 7 dias, devolvemos 100% do seu dinheiro.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}