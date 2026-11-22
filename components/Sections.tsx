import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Bike, Camera, CarFront, MapPin, MessageCircle } from 'lucide-react';
import { business, navigation, services, whatsapp } from '../app/config';
import { ContactLink } from './ContactLink';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Photo({ file, alt, className = '', sizes = '(max-width: 700px) 92vw, 45vw' }: {
  file: string; alt: string; className?: string; sizes?: string;
}) {
  return <Image fill src={`/images/${file}.webp`} alt={alt} sizes={sizes} className={className} />;
}

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-photo">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/hero-mobile.webp" />
          {/* The picture source selects the dedicated mobile framing before download. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero.webp" alt="Porsche preto iluminado em vermelho em um estúdio, imagem ilustrativa"
            width="1536" height="1024" fetchPriority="high" />
        </picture>
      </div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <Eyebrow>Estética automotiva · Franca, SP</Eyebrow>
          <h1 id="hero-title">
            <span className="hero-mask"><span>BRANQUINHO</span></span>
            <span className="hero-mask studio-mask"><span>STUDIO</span></span>
          </h1>
          <div className="hero-details">
            <p className="hero-tagline">Mais que estética.<br />Uma experiência de exclusividade.</p>
            <p className="hero-description">Detalhamento automotivo, cuidado e proteção para valorizar cada detalhe do seu veículo.</p>
            <div className="hero-actions">
              <ContactLink>Agendar atendimento</ContactLink>
              <a className="button button-outline" href="#servicos" data-magnetic>Explorar serviços <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap hero-foot">
        <span><MapPin size={14} aria-hidden="true" /> Franca • São Paulo</span>
        <span className="hero-caption">Imagem ilustrativa</span>
        <a href="#sobre" aria-label="Rolar para a apresentação"><ArrowDown size={17} aria-hidden="true" /></a>
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
        <div className="section-head" data-reveal>
          <div><Eyebrow>Serviços para carros</Eyebrow><h2>Cuidado em <em>cada detalhe.</em></h2></div>
          <p>Conheça nossos serviços de estética automotiva.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article key={service.key} className="service-card" data-reveal>
              <div className="service-photo photo">
                <Photo file={service.key} alt={service.alt} />
                <span className="service-index">0{index + 1}</span>
              </div>
              <div className="service-copy">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                {service.options.length > 0 && <ul>{service.options.map((option) => <li key={option}>{option}</li>)}</ul>}
                <ContactLink className="text-link" topic={service.key}>Consultar pelo WhatsApp</ContactLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MotorcycleServices() {
  return (
    <section className="section wrap motorcycle" aria-labelledby="moto-title">
      <div className="section-copy" data-reveal>
        <Eyebrow>Serviços para motos</Eyebrow>
        <h2 id="moto-title">Sua moto também merece <em>esse cuidado.</em></h2>
        <ul className="motorcycle-list">
          {['Lavagem para motos', 'Limpeza detalhada para motos', 'Polimento para motos'].map((item) =>
            <li key={item}><Bike size={18} aria-hidden="true" />{item}</li>)}
        </ul>
        <ContactLink topic="motos">Consultar serviços para motos</ContactLink>
      </div>
      <div className="moto-photo photo" data-reveal data-image>
        <Photo file="moto" alt="Motocicleta esportiva preta em um estúdio com luz vermelha" />
      </div>
    </section>
  );
}

export function VisualExperience() {
  return (
    <section className="experience wrap" aria-labelledby="experiencia-title">
      <div className="experience-frame photo">
        <Photo file="experiencia" alt="Carro esportivo preto com lanternas vermelhas refletidas no piso"
          className="experience-image" sizes="(max-width: 700px) 92vw, 86vw" />
        <div className="experience-copy">
          <h2 id="experiencia-title">O brilho está <em>nos detalhes.</em></h2>
          <p>Limpeza, acabamento e proteção em uma experiência visual que valoriza cada superfície do seu veículo.</p>
        </div>
      </div>
    </section>
  );
}

const gallery = [
  ['pintura', 'Pintura automotiva', 'Reflexo de luz vermelha na pintura preta'],
  ['roda', 'Rodas', 'Roda esportiva preta com pinça de freio vermelha'],
  ['interior', 'Interiores', 'Console e revestimento em couro preto'],
  ['vitrificacao', 'Proteção de pintura', 'Aplicação de proteção sobre um capô preto'],
  ['moto', 'Motocicletas', 'Acabamento de uma motocicleta esportiva'],
] as const;

export function Gallery() {
  return (
    <section id="resultados" className="section wrap">
      <div className="section-head" data-reveal>
        <div><Eyebrow>Resultados visuais</Eyebrow><h2>Detalhes que <em>inspiram.</em></h2></div>
        <p>Imagens ilustrativas dos serviços.</p>
      </div>
      <div className="gallery">
        {gallery.map(([file, caption, alt]) =>
          <figure key={file} className="gallery-photo photo" data-reveal data-image>
            <Photo file={file} alt={alt} sizes="(max-width: 700px) 48vw, 30vw" />
            <figcaption>{caption}</figcaption>
          </figure>)}
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section id="contato" className="section contact">
      <div className="wrap" data-reveal>
        <Eyebrow>Atendimento</Eyebrow>
        <h2>Seu veículo <em>merece mais.</em></h2>
        <p>Entre em contato e consulte o serviço ideal para seu carro ou moto.</p>
        {whatsapp()
          ? <ContactLink>Solicitar atendimento pelo WhatsApp</ContactLink>
          : <p className="contact-status"><MessageCircle size={17} aria-hidden="true" /> O número de WhatsApp será disponibilizado em breve.</p>}
        <p className="contact-note">Valores e disponibilidade mediante consulta.</p>
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
