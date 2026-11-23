import { CinematicIntro } from '../components/CinematicIntro';
import { Header } from '../components/Header';
import { Motion } from '../components/Motion';
import { Hero, About, Services, MotorcycleServices, VisualExperience, ContactCTA, Footer, WhatsAppButton } from '../components/Sections';
import { Gallery } from '../components/Gallery';
import { business, navigation, whatsapp } from './config';

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: 'Estética e detalhamento automotivo para carros e motocicletas.',
    address: { '@type': 'PostalAddress', addressLocality: business.city, addressRegion: 'SP', addressCountry: 'BR' },
  };
  return (
    <>
      <CinematicIntro />
      <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
      <Header links={navigation} contact={whatsapp()} />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <MotorcycleServices />
        <VisualExperience />
        <Gallery />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    </>
  );
}
