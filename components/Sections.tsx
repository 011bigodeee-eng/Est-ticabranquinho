import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Camera, ChevronDown, CarFront, MapPin, MessageCircle } from 'lucide-react';
import { business, navigation, whatsapp } from '../app/config';
import { catalog } from '../app/catalog';
import { ContactLink } from './ContactLink';
import { ServiceExplorer } from './ServiceExplorer';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Photo({ file, alt, className = '', sizes = '(max-width: 800px) 92vw, 45vw' }: {
  file: string; alt: string; className?: string; sizes?: string;
}) {
  return <Image fill src={`/images/${file}.webp`} alt={alt} sizes={sizes} className={className} />;
}

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <picture className="hero-art">
        <source media="(max-aspect-ratio: 1/2)" srcSet="/images/hero-referencia-vertical.webp" />
        <source media="(max-aspect-ratio: 5/4)" srcSet="/images/hero-referencia-carro.webp" />
        <img src="/images/hero-referencia.webp" fetchPriority="high"
          alt="Porsche preto em um estúdio com iluminação vermelha e piso refletivo. Imagem ilustrativa." />
      </picture>
      <div className="hero-content">
        <h1 id="hero-title" className="hero-heading" tabIndex={-1}>
          <span className="sr-only">Branquinho Studio</span>
          <span className="hero-wordmark" aria-hidden="true">
            <Image src="/images/hero-referencia-titulo.webp" width={878} height={70}
              alt="" loading="eager" unoptimized />
          </span>
          <span className="hero-studio" aria-hidden="true">Studio</span>
        </h1>
        <p className="hero-tagline">Mais que estética. Uma experiência de exclusividade.</p>
      </div>
      <div className="hero-mobile-actions">
        <ContactLink>Agendar atendimento</ContactLink>
        <a className="button button-outline" href="#servicos">Ver serviços <ArrowDown size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" className="section wrap about">
      <div className="about-photo photo" data-reveal data-image>
        <Photo file="pintura" alt="Reflexos vermelhos no acabamento de uma carroceria preta" />
      </div>
      <div className="section-copy" data-reveal>
        <Eyebrow>O studio</Eyebrow>
        <h2>Cada detalhe <em>importa.</em></h2>
        <p className="lead">O cuidado que seu veículo merece.</p>
        <p>No Branquinho Studio, os serviços de estética automotiva são voltados à limpeza, conservação, acabamento e proteção de carros e motocicletas.</p>
        <a className="text-link" href="#servicos">Conhecer os serviços <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicos" className="section services">
      <div className="wrap">
        <ServiceExplorer />
        <div className="service-editorial">
          {catalog.map((category, index) => {
            const liquid = category.key === 'vitrificacao';
            const polish = category.key === 'polimento';
            return (
              <article key={category.key} className="service-row" id={`servico-${category.key}`}>
                <div className={`service-photo photo${liquid ? ' liquid-photo' : ''}`} data-reveal
                  data-image={index % 2 === 0 ? 'left' : 'right'} data-pointer={liquid || polish ? '' : undefined}>
                  <Photo file={category.image} alt={category.alt}
                    className="service-image" sizes="(max-width: 800px) 92vw, 52vw" />
                  {liquid && <span className="liquid-sweep" aria-hidden="true" />}
                  {polish && <span className="pointer-reveal pointer-paint" aria-hidden="true" />}
                </div>
                <div className="service-copy" data-reveal data-stagger={liquid ? 3 : undefined}>
                  <p className="service-index"><span>0{index + 1}</span> {category.key === 'motos' ? 'Motos' : 'Carros'}</p>
                  <h3>{category.title}</h3>
                  <p>{category.summary}</p>
                  <div className="service-options">
                    {category.services.map((service) => (
                      <details className="service-option" key={service.name}>
                        <summary>{service.name}<ChevronDown size={17} aria-hidden="true" /></summary>
                        <div className="service-option-content">
                          {service.description && <p>{service.description}</p>}
                          {service.groups.map((group) => (
                            <div key={group.title} className="service-procedures">
                              <h4>{group.title}</h4>
                              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                            </div>
                          ))}
                          {service.note && <p className="service-note">{service.note}</p>}
                          <ContactLink className="text-link" service={service.name}>
                            Consultar pelo WhatsApp<span className="sr-only"> · {service.name}</span>
                          </ContactLink>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function VisualExperience() {
  return (
    <section className="experience wrap" aria-labelledby="experiencia-title">
      <div className="experience-frame photo">
        <Photo file="experiencia" alt="Carro esportivo preto com lanternas vermelhas refletidas no piso"
          className="experience-image" sizes="(max-width: 800px) 92vw, 86vw" />
        <div className="experience-copy" data-reveal>
          <h2 id="experiencia-title">A excelência está <em>nos detalhes.</em></h2>
          <p>Do cuidado com o interior ao acabamento da pintura, cada detalhe merece atenção.</p>
        </div>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section id="contato" className="section contact">
      <div className="wrap" data-reveal>
        <Eyebrow>Atendimento</Eyebrow>
        <h2>Seu veículo merece <em>esse cuidado.</em></h2>
        <p>Conheça os serviços do Branquinho Studio e consulte valores e disponibilidade de atendimento.</p>
        {!whatsapp() && <p className="contact-status"><MessageCircle size={17} aria-hidden="true" /> Agendamento pelo WhatsApp indisponível até a confirmação do número oficial.</p>}
        <div className="contact-actions">
          {whatsapp() && <ContactLink>Agendar pelo WhatsApp</ContactLink>}
          <a className="button button-outline" href="#servicos" data-magnetic>Ver serviços <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const phone = whatsapp();
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <a href="#inicio"><Image className="brand-logo" src="/images/logo.webp" width={136} height={70} alt={business.name} /></a>
          <p>Estética e detalhamento automotivo</p>
          <p><MapPin size={15} aria-hidden="true" /> {business.city} — {business.region}</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          {navigation.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <div className="footer-social">
          {phone && <a href={phone} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> WhatsApp</a>}
          {business.instagram && <a href={business.instagram} target="_blank" rel="noopener noreferrer"><Camera size={17} /> Instagram</a>}
        </div>
      </div>
      <div className="wrap footer-end"><CarFront size={16} aria-hidden="true" /> Branquinho Studio</div>
    </footer>
  );
}

export function WhatsAppButton() {
  const url = whatsapp();
  if (!url) return null;
  return <a className="floating-wa" href={url} target="_blank" rel="noopener noreferrer" aria-label="Falar com o Branquinho Studio pelo WhatsApp">
    <MessageCircle size={23} aria-hidden="true" />
  </a>;
}
