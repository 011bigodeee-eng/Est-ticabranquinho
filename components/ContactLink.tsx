import { ArrowUpRight } from 'lucide-react';
import { whatsapp } from '../app/config';

type Props = {
  children: React.ReactNode;
  service?: string;
  className?: string;
};

export function ContactLink({ children, service, className = 'button button-red' }: Props) {
  const url = whatsapp(service);
  return (
    <a className={className} href={url ?? '#contato'} target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined} data-magnetic>
      {url ? children : 'Ver disponibilidade de contato'}<ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
