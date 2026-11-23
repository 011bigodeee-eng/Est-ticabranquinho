const number = process.env.WHATSAPP_NUMBER?.trim() ?? '5516992215034';
const instagram = process.env.INSTAGRAM_URL?.trim() || 'https://www.instagram.com/branquinhostudio/';

export const business = {
  name: 'Branquinho Studio',
  city: 'Franca',
  region: 'São Paulo',
  instagram: instagram && /^https:\/\/(www\.)?instagram\.com\/[\w.]+\/?$/.test(instagram) ? instagram : undefined,
};

export const messages = {
  general: 'Olá! Conheci o Branquinho Studio pelo site e gostaria de consultar os serviços e a disponibilidade de atendimento.',
  lavagem: 'Olá! Gostaria de consultar os serviços de lavagem automotiva.',
  higienizacao: 'Olá! Gostaria de saber mais sobre os serviços de higienização.',
  polimento: 'Olá! Gostaria de consultar as opções de polimento automotivo.',
  vitrificacao: 'Olá! Gostaria de solicitar informações sobre vitrificação automotiva.',
  motos: 'Olá! Gostaria de consultar os serviços de estética para motocicletas.',
};

export type ContactTopic = keyof typeof messages;

export function whatsapp(topic: ContactTopic = 'general') {
  if (number && /^[1-9]\d{7,14}$/.test(number)) {
    return `https://wa.me/${number}?text=${encodeURIComponent(messages[topic])}`;
  }
}

export const services = [
  {
    key: 'lavagem', name: 'Lavagem automotiva', headline: 'Limpeza que valoriza cada detalhe.', alt: 'Luva de microfibra sobre carroceria com espuma',
    description: 'Serviços de limpeza externa e interna, com opções de manutenção, limpeza técnica e detalhamento.',
    options: ['Limpeza de manutenção', 'Limpeza técnica', 'Limpeza detalhada', 'Tratamento de motor a seco'],
  },
  {
    key: 'higienizacao', name: 'Higienização', headline: 'Cuidado que começa por dentro.', alt: 'Limpeza profissional de um banco automotivo preto',
    description: 'Cuidados especializados para tecidos, bancos, revestimentos e superfícies internas do veículo.',
    options: ['Higienização interna', 'Higienização de tecidos', 'Tratamento de couro'],
  },
  {
    key: 'polimento', name: 'Polimento', headline: 'O brilho em sua melhor forma.', alt: 'Politriz sobre a pintura brilhante de um veículo',
    description: 'Tratamentos de acabamento e correção de pintura para recuperar o brilho e valorizar a aparência do veículo.',
    options: ['Polimento comercial', 'Polimento técnico'],
  },
  {
    key: 'vitrificacao', name: 'Vitrificação', headline: 'Proteção com acabamento extraordinário.', alt: 'Aplicador de microfibra sobre pintura automotiva preta',
    description: 'Proteção cerâmica da pintura, com acabamento de alto brilho e opções de durabilidade conforme o produto aplicado.',
    options: [],
  },
] as const;

export const navigation = [
  ['sobre', 'Sobre'], ['servicos', 'Serviços'], ['resultados', 'Resultados visuais'], ['contato', 'Contato'],
] as const;
