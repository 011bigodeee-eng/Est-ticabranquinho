'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

type Service = {
  key: string;
  name: string;
  headline: string;
  alt: string;
  description: string;
  contact?: string;
};

export function ServiceExplorer({ items }: { items: Service[] }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const item = items[selected];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    const positions: Record<string, number> = {
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowRight: index === last ? 0 : index + 1,
      Home: 0,
      End: last,
    };
    const next = positions[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="explorer" aria-labelledby="explorer-title">
      <h2 id="explorer-title">Encontre o <em>cuidado ideal.</em></h2>
      <div className="explorer-tabs" role="tablist" aria-label="Categorias de serviços">
        {items.map((service, index) => (
          <button key={service.key} ref={(element) => { tabs.current[index] = element; }}
            type="button" id={`tab-${service.key}`} role="tab" aria-selected={selected === index}
            aria-controls={`panel-${service.key}`} tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)} onKeyDown={(event) => navigate(event, index)}>
            {service.key === 'lavagem' ? 'Lavagem' : service.name}
          </button>
        ))}
      </div>
      {items.map((service, index) => (
        <div className="explorer-panel" key={service.key} id={`panel-${service.key}`} role="tabpanel"
          aria-labelledby={`tab-${service.key}`} hidden={selected !== index}>
          {index === selected && <>
            <div className="explorer-photo photo">
              <Image src={`/images/${item.key}.webp`} fill sizes="(max-width: 700px) 90vw, 44vw" alt={item.alt} />
            </div>
            <div className="explorer-copy">
              <h3>{item.headline}</h3>
              <p>{item.description}</p>
              <a className="text-link" href={item.contact ?? '#contato'} target={item.contact ? '_blank' : undefined}
                rel={item.contact ? 'noopener noreferrer' : undefined}>
                {item.contact ? 'Consultar pelo WhatsApp' : 'Ver disponibilidade de contato'} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </>}
        </div>
      ))}
    </section>
  );
}
