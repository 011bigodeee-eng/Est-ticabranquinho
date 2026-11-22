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

Copie `.env.example` para `.env.local`. O número oficial informado já está configurado. Use `WHATSAPP_NUMBER` para substituí-lo, incluindo código do país e DDD, apenas dígitos. Preencha `INSTAGRAM_URL` com a URL oficial, se houver. Reinicie o servidor de desenvolvimento após alterações. Em produção, defina as variáveis antes de gerar o build.

Cada botão de consulta abre o WhatsApp com a mensagem correspondente. O botão flutuante aparece em telas pequenas. Se a variável for definida com um valor inválido, os links levam à seção que informa a indisponibilidade do agendamento.

As informações e modalidades ficam em `app/config.ts`. As imagens podem ser substituídas em `public/images/`, mantendo os textos alternativos em sincronia.
