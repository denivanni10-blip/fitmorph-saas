import './globals.css';

export const metadata = {
  title: 'FitMorph - Provador Virtual Inteligente',
  description: 'Crie seu avatar 3D com suas medidas exatas e provador de roupas antes de comprar.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-dark-900 text-slate-100 antialiased selection:bg-brand-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}