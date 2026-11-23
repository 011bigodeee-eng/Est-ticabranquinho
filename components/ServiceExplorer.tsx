import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { services } from '../app/config';
import { ContactLink } from './ContactLink';

const summaries = {
  lavagem: 'Limpeza externa e interna.',
  higienizacao: 'Cuidado com tecidos, bancos e couro.',
  polimento: 'Correção de pintura e recuperação do brilho.',
  vitrificacao: 'Proteção cerâmica e acabamento de alto brilho.',
};

export function ServiceExplorer() {
  return (
    <section className="explorer" aria-labelledby="explorer-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">Serviços para carros</p>
          <h2 id="explorer-title">Encontre o <em>cuidado ideal.</em></h2>
        </div>
      </div>
      <ul className="explorer-grid">
        {services.map((service) => (
          <li key={service.key} className="explorer-card">
            <a className="explorer-link" href={`#servico-${service.key}`} aria-label={`Ver detalhes de ${service.name}`}>
              <div className="explorer-photo photo">
                <Image src={`/images/${service.key}.webp`} fill
                  sizes="(max-width: 1050px) 46vw, (max-width: 1440px) 23vw, 310px" alt="" />
              </div>
              <div className="explorer-copy">
                <div className="explorer-card-title">
                  <h3>{service.name}</h3>
                  <ArrowDown size={17} aria-hidden="true" />
                </div>
                <p>{summaries[service.key]}</p>
              </div>
            </a>
            <ContactLink className="explorer-contact text-link" topic={service.key}>WhatsApp<span className="sr-only"> · {service.name}</span></ContactLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
