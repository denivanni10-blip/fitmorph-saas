import { Shirt } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-dark-900 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-black font-bold">
            <Shirt className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-base">FitMorph AI</span>
        </div>

        <p className="text-slate-500 text-center">
          © {new Date().getFullYear()} FitMorph. Provador Virtual 3D. Todos os direitos reservados.
        </p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-200 transition-colors">Termos</a>
          <a href="#" className="hover:text-slate-200 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-slate-200 transition-colors">Suporte</a>
        </div>
      </div>
    </footer>
  );
}