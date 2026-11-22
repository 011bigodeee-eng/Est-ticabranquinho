# Branquinho Studio

Landing page de estética e detalhamento automotivo em Franca, SP. As fotografias são ilustrativas.

## Desenvolvimento

Requer Node.js 20.9 ou superior.

```sh
npm ci
npm run dev
```

A página abre na porta 3000. Use `npm run typecheck` para verificar o TypeScript, `npm run build` para gerar o build de produção e `npm start` para servi-lo.

## Contatos

Copie `.env.example` para `.env.local`. Preencha `WHATSAPP_NUMBER` com o número oficial, incluindo código do país e DDD, apenas dígitos. Preencha `INSTAGRAM_URL` com a URL oficial, se houver. Reinicie o servidor de desenvolvimento após alterações. Em produção, defina as variáveis antes de gerar o build.

Sem um número oficial, os botões de consulta levam à seção de atendimento, que informa a indisponibilidade do contato. Com o número configurado, cada botão abre o WhatsApp com a mensagem correspondente e o botão flutuante aparece em telas pequenas.

As informações e modalidades ficam em `app/config.ts`. As imagens podem ser substituídas em `public/images/`, mantendo os textos alternativos em sincronia.
