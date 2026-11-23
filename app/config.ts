const number = process.env.WHATSAPP_NUMBER?.trim() ?? '5516992215034';
const instagram = process.env.INSTAGRAM_URL?.trim() || 'https://www.instagram.com/branquinhostudio/';

export const business = {
  name: 'Branquinho Studio',
  city: 'Franca',
  region: 'São Paulo',
  instagram: instagram && /^https:\/\/(www\.)?instagram\.com\/[\w.]+\/?$/.test(instagram) ? instagram : undefined,
};

export function whatsapp(service?: string) {
  if (number && /^[1-9]\d{7,14}$/.test(number)) {
    const message = service
      ? `Olá! Conheci o Branquinho Studio pelo site e gostaria de consultar valores e disponibilidade para o serviço de ${service}.`
      : 'Olá! Conheci o Branquinho Studio pelo site e gostaria de consultar os serviços e a disponibilidade de atendimento.';
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
}

export const navigation = [
  ['sobre', 'Sobre'], ['servicos', 'Serviços'], ['resultados', 'Resultados visuais'], ['contato', 'Contato'],
] as const;
