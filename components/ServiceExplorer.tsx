import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { catalog } from '../app/catalog';

export function ServiceExplorer() {
  return (
    <section className="explorer" aria-labelledby="explorer-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">Serviços para carros e motos</p>
          <h2 id="explorer-title">Encontre o <em>cuidado ideal.</em></h2>
        </div>
        <p>Imagens ilustrativas.</p>
      </div>
      <ul className="explorer-grid">
        {catalog.map((category) => (
          <li key={category.key} className="explorer-card">
            <a className="explorer-link" href={`#servico-${category.key}`} aria-label={`Ver detalhes de ${category.title}`}>
              <div className="explorer-photo photo">
                <Image src={`/images/${category.image}.webp`} fill
                  sizes="(max-width: 1050px) 46vw, (max-width: 1440px) 19vw, 250px" alt="" />
              </div>
              <div className="explorer-copy">
                <div className="explorer-card-title">
                  <h3>{category.title}</h3>
                  <ArrowDown size={17} aria-hidden="true" />
                </div>
                <p>{category.summary}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
