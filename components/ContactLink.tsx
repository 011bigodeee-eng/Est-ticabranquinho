import { ArrowUpRight } from 'lucide-react';
import { whatsapp, type ContactTopic } from '../app/config';

type Props = {
  children: React.ReactNode;
  topic?: ContactTopic;
  className?: string;
};

export function ContactLink({ children, topic, className = 'button button-red' }: Props) {
  const url = whatsapp(topic);
  return (
    <a className={className} href={url ?? '#contato'} target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined} data-magnetic>
      {children}<ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
