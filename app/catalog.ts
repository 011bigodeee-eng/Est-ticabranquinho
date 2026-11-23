type ServiceGroup = { title: string; items: string[] };
type CatalogService = {
  name: string;
  description?: string;
  groups: ServiceGroup[];
  note?: string;
};
type Category = {
  key: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  services: CatalogService[];
};

const maintenanceExterior = [
  'Pré-limpeza e detalhamento das rodas e caixas de rodas.',
  'Pré-limpeza com shampoo desincrustante.',
];
const technicalDetail = 'Detalhamento de cantos de portas, grades e emblemas.';
const lubricatedWash = 'Limpeza com luva de microfibra e shampoo de alta lubrificação.';
const microfiberDry = 'Secagem com toalha de microfibra.';
const tireSeal = 'Selante nos pneus.';
const basicVacuum = 'Aspiração básica.';
const glassCleaning = 'Limpeza dos vidros.';
const fragrance = 'Aroma de preferência do cliente.';
const paintDecontamination = 'Lavagem e descontaminação da pintura.';
const manufacturerNote = 'A garantia do fabricante está condicionada às manutenções necessárias.';

export const catalog: Category[] = [
  {
    key: 'lavagem',
    title: 'Lavagem e limpeza',
    summary: 'Limpeza externa e interna e tratamento do motor a seco.',
    image: 'lavagem',
    alt: 'Luva de microfibra sobre carroceria com espuma',
    services: [
      {
        name: 'Limpeza de manutenção',
        groups: [
          { title: 'Exterior', items: [...maintenanceExterior, lubricatedWash, 'Detalhamento dos cantos de portas.', 'Secagem com toalha de microfibra própria.'] },
          { title: 'Proteção', items: ['Cera líquida com proteção de até 3 meses.', tireSeal, 'Finalizador nas caixas de rodas.'] },
          { title: 'Interior', items: ['Aspiração básica de bancos, carpetes e cantinhos.', 'Limpeza dos plásticos internos com microfibra e APC.', 'Limpeza dos vidros internos e externos.', fragrance] },
        ],
      },
      {
        name: 'Limpeza técnica',
        groups: [
          { title: 'Exterior', items: [...maintenanceExterior, technicalDetail, lubricatedWash, microfiberDry] },
          { title: 'Proteção', items: ['Selante de pintura com proteção de até 3 meses.', tireSeal, 'Proteção nas grades e caixas de rodas.'] },
          { title: 'Interior', items: [basicVacuum, 'Limpeza detalhada dos plásticos internos.', 'Revitalização dos plásticos com acabamento acetinado.', glassCleaning, 'Aroma de preferência do cliente (opcional).'] },
        ],
      },
      {
        name: 'Limpeza detalhada',
        groups: [
          { title: 'Exterior', items: [...maintenanceExterior, technicalDetail, 'Limpeza com luva de microfibra.', microfiberDry] },
          { title: 'Brilho e proteção', items: ['Enceramento técnico com politriz para brilho e uniformidade da pintura.', 'Selante de pintura até 6 meses.', 'Cristalização dos vidros até 1 ano.', tireSeal, 'Revitalização dos plásticos externos.'] },
          { title: 'Interior', items: [basicVacuum, 'Limpeza detalhada e hidratação dos plásticos internos.', glassCleaning, fragrance] },
        ],
      },
      {
        name: 'Tratamento do motor a seco',
        description: 'Limpeza especializada e proteção dos componentes do motor, sem utilização de jato de água.',
        groups: [{ title: 'Modalidades', items: ['Básica.', 'Detalhada.'] }],
      },
    ],
  },
  {
    key: 'higienizacao',
    title: 'Higienização e interiores',
    summary: 'Cuidado com tecidos, couro e demais superfícies internas.',
    image: 'higienizacao',
    alt: 'Extratora limpando um banco automotivo preto',
    services: [
      {
        name: 'Higienização interna',
        description: 'Cuidado completo para o interior.',
        groups: [{ title: 'Inclui', items: ['Limpeza detalhada de couro ou estofados.', 'Limpeza de carpete, teto, cintos e porta-malas.', 'Condicionamento dos plásticos internos.', 'Hidratação do couro.'] }],
      },
      {
        name: 'Higienização de tecidos',
        description: 'Limpeza e frescor para os tecidos.',
        groups: [{ title: 'Inclui', items: ['Limpeza detalhada dos tecidos.', 'Tratamento contra odores desagradáveis e bactérias.', 'Finalização para restaurar a aparência e o frescor.'] }],
        note: 'Sujeiras difíceis possuem adicional.',
      },
      {
        name: 'Tratamento de couro',
        groups: [
          { title: 'Limpeza', items: ['Remoção de manchas, sujeiras incrustadas e bactérias.'] },
          { title: 'Hidratação', items: ['Hidratação do couro para evitar ressecamento e rachaduras.'] },
          { title: 'Acabamento', items: ['Recuperação do aspecto original.'] },
        ],
      },
    ],
  },
  {
    key: 'polimento',
    title: 'Polimento',
    summary: 'Correção do verniz e acabamento da pintura.',
    image: 'polimento',
    alt: 'Politriz sobre a pintura de um automóvel preto',
    services: [
      {
        name: 'Polimento comercial',
        description: 'Correção de até 70% das imperfeições, conforme as condições da pintura. Ideal para preparar o veículo para venda.',
        groups: [{ title: 'Inclui', items: [paintDecontamination, 'Correção parcial do verniz.', 'Selante sintético com proteção de 6 meses.'] }],
      },
      {
        name: 'Polimento técnico',
        description: 'Para quem busca o máximo de resultado.',
        groups: [{ title: 'Inclui', items: [paintDecontamination, 'Correção completa do verniz.', 'Aplicação de proteção com cera.'] }],
      },
    ],
  },
  {
    key: 'vitrificacao',
    title: 'Proteção da pintura',
    summary: 'Vitrificação com coating cerâmico.',
    image: 'vitrificacao-gotas',
    alt: 'Gotas de água sobre o acabamento brilhante de um capô preto',
    services: [
      {
        name: 'Vitrificação',
        description: 'Proteção e brilho de showroom.',
        groups: [
          { title: 'Preparação', items: ['Polimento técnico.', 'Limpeza detalhada externa.', 'Descontaminação da pintura.'] },
          { title: 'Proteção', items: ['Aplicação de coating cerâmico.', 'Opções de proteção de 1, 3 ou 5 anos, conforme o produto.'] },
        ],
        note: manufacturerNote,
      },
    ],
  },
  {
    key: 'motos',
    title: 'Estética para motocicletas',
    summary: 'Lavagem, limpeza detalhada e polimento para motos.',
    image: 'moto',
    alt: 'Motocicleta esportiva preta em um estúdio com luz vermelha',
    services: [
      {
        name: 'Lavagem para motos Nº 1',
        description: 'O cuidado essencial para sua moto.',
        groups: [{ title: 'Inclui', items: ['Limpeza técnica.', 'Selante antiderrapante.'] }],
      },
      {
        name: 'Limpeza detalhada para motos',
        description: 'Limpeza, acabamento e proteção.',
        groups: [{ title: 'Inclui', items: ['Limpeza técnica.', 'Revitalização de plásticos.', 'Selante na pintura com proteção de 5 meses.', 'Selante antiderrapante.'] }],
      },
      {
        name: 'Polimento para motos',
        description: 'Correção e proteção para a pintura.',
        groups: [{ title: 'Inclui', items: ['Correção do verniz.', 'Selante sintético com proteção de até 6 meses ou coating cerâmico com proteção de 1, 3 ou 5 anos, conforme o produto.'] }],
        note: manufacturerNote,
      },
    ],
  },
];
