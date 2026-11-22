import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = { themeColor: '#050505', viewportFit: 'cover' };

export const metadata: Metadata = {
  title: 'Branquinho Studio | Estética Automotiva em Franca - SP',
  description: 'Conheça os serviços de lavagem, higienização, polimento e vitrificação do Branquinho Studio em Franca, SP. Consulte valores e atendimento pelo WhatsApp.',
  icons: { icon: '/images/icon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
