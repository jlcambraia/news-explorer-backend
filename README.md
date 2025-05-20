# News Explorer - Back-end

Este é o back-end da aplicação **News Explorer**. A API foi construída com **Node.js**, **Express** e **MongoDB**, com suporte a autenticação JWT, registro e login de usuários, bem como salvamento e remoção de artigos de notícias personalizados por usuário.

## Funcionalidades da API

- Registro e login de usuários com autenticação JWT
- Criptografia de senhas com bcrypt
- Salvamento de artigos de notícias com associação ao usuário
- Remoção de artigos somente pelo proprietário
- Middleware de autorização para rotas protegidas
- Validações com Celebrate/Joi
- Logs de requisições e erros com Winston
- Deploy com HTTPS e domínio público

## 🔧 Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB com Mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- celebrate (Joi)
- winston
- cors

## Rotas da Autenticação

POST /signup - Registro de novo usuário
POST /signin - Login de usuário (JWT)

## Rotas de Usuário

GET /users/me - Retorna nome e e-mail do usuário logado

## Rotas de Artigos

GET /articles - Retorna todos os artigos salvos pelo usuário
POST /articles - Cria um novo artigo
DELETE /articles/:articleId - Remove artigo salvo (somente do dono do artigo)

## Autor

Desenvolvido por João Luiz Cambraia durante o Bootcamp da TripleTen.
