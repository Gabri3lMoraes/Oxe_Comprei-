<div align="center">

# 🔧 Oxe, Comprei! — API

### Backend REST da plataforma Oxe, Comprei!

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-4169E1?logo=postgresql&logoColor=white)

</div>

---

## 📖 Sobre

API REST responsável por toda a lógica de negócios do **Oxe, Comprei!**: autenticação de usuários, gerenciamento de lojas e produtos, e queries geoespaciais para o mapa interativo.

---

## 🏗️ Arquitetura

O projeto segue uma **arquitetura modular por domínio**, onde cada feature é isolada em seu próprio módulo com controller, service, routes e model.

```
oxe-comprei-api/
├── src/
│   ├── config/                    # Configurações (DB, env, auth)
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── auth.ts
│   ├── modules/                   # Módulos de domínio
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.dto.ts
│   │   │   └── auth.test.ts
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── user.model.ts
│   │   │   └── user.test.ts
│   │   ├── store/
│   │   │   ├── store.controller.ts
│   │   │   ├── store.service.ts
│   │   │   ├── store.routes.ts
│   │   │   ├── store.model.ts
│   │   │   └── store.test.ts
│   │   ├── product/
│   │   │   ├── product.controller.ts
│   │   │   ├── product.service.ts
│   │   │   ├── product.routes.ts
│   │   │   ├── product.model.ts
│   │   │   └── product.test.ts
│   │   └── map/
│   │       ├── map.controller.ts
│   │       ├── map.service.ts
│   │       └── map.routes.ts
│   ├── shared/                    # Código compartilhado
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── role.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── geolocation.ts
│   │   └── errors/
│   │       └── AppError.ts
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── prisma/
│   │       └── schema.prisma
│   ├── app.ts                     # Configuração do Express
│   └── server.ts                  # Entry point
├── tests/
│   └── integration/
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
├── .env.example
├── tsconfig.json
├── jest.config.ts
└── package.json
```

---

## 🚀 Começando

### Pré-requisitos

- Node.js >= 18
- npm >= 9
- Docker e Docker Compose (para o PostgreSQL)

### Instalação

```bash
# Entrar na pasta do backend
cd oxe-comprei-api

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Subir o banco de dados com Docker
docker compose -f docker/docker-compose.yml up -d

# Rodar as migrations
npm run prisma:migrate

# Gerar o Prisma Client
npm run prisma:generate

# Iniciar em modo dev
npm run dev
```

O servidor estará rodando em `http://localhost:3333`.

---

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3333` |
| `DATABASE_URL` | URL de conexão PostgreSQL | `postgresql://user:pass@localhost:5432/oxecomprei` |
| `JWT_SECRET` | Chave secreta para tokens JWT | `sua-chave-super-secreta` |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `7d` |

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Dev | `npm run dev` | Inicia o servidor com hot reload (tsx watch) |
| Build | `npm run build` | Compila TypeScript para JavaScript |
| Start | `npm run start` | Roda a versão compilada (produção) |
| Test | `npm run test` | Roda os testes com Jest |
| Migrate | `npm run prisma:migrate` | Roda as migrations do banco |
| Generate | `npm run prisma:generate` | Gera o Prisma Client |
| Studio | `npm run prisma:studio` | Abre o Prisma Studio (GUI do banco) |

---

## 📡 Endpoints da API

### Autenticação

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/auth/register` | Cadastro de usuário | ❌ |
| `POST` | `/auth/login` | Login (retorna JWT) | ❌ |
| `POST` | `/auth/forgot-password` | Solicitar reset de senha | ❌ |

### Usuários

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `GET` | `/users/me` | Dados do usuário logado | ✅ |
| `PUT` | `/users/me` | Atualizar perfil | ✅ |
| `DELETE` | `/users/me` | Deletar conta | ✅ |

### Lojas

| Método | Rota | Descrição | Auth | Role |
|--------|------|-----------|------|------|
| `POST` | `/stores` | Criar loja | ✅ | Comerciante |
| `GET` | `/stores` | Listar lojas (com filtros) | ❌ | — |
| `GET` | `/stores/:id` | Detalhes da loja | ❌ | — |
| `PUT` | `/stores/:id` | Atualizar loja | ✅ | Dono |
| `DELETE` | `/stores/:id` | Remover loja | ✅ | Dono |

### Produtos

| Método | Rota | Descrição | Auth | Role |
|--------|------|-----------|------|------|
| `POST` | `/stores/:storeId/products` | Criar produto | ✅ | Dono |
| `GET` | `/stores/:storeId/products` | Listar produtos da loja | ❌ | — |
| `PUT` | `/products/:id` | Atualizar produto | ✅ | Dono |
| `DELETE` | `/products/:id` | Remover produto | ✅ | Dono |

### Mapa

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `GET` | `/map/stores` | Lojas por raio de proximidade | ❌ |
| `GET` | `/map/categories` | Categorias disponíveis | ❌ |

**Query params do `/map/stores`:**
- `lat` — Latitude do usuário
- `lng` — Longitude do usuário
- `radius` — Raio de busca em km (default: 5)
- `category` — Filtro por categoria (opcional)

---

## 🗄️ Modelo de Dados

### Entidades principais

**User**
- `id`, `name`, `email`, `password`, `role` (CONSUMER | MERCHANT), `avatar`, `createdAt`, `updatedAt`

**Store**
- `id`, `name`, `description`, `category`, `phone`, `latitude`, `longitude`, `address`, `openingHours`, `coverImage`, `ownerId`, `createdAt`, `updatedAt`

**Product**
- `id`, `name`, `description`, `price`, `image`, `storeId`, `createdAt`, `updatedAt`

**Favorite**
- `id`, `userId`, `storeId`, `createdAt`

---

## 🧪 Testes

```bash
# Rodar todos os testes
npm run test

# Rodar com coverage
npm run test -- --coverage

# Rodar um módulo específico
npm run test -- --testPathPattern=auth
```

---

## 🐳 Docker

```bash
# Subir apenas o banco de dados
docker compose -f docker/docker-compose.yml up -d

# Subir tudo (API + banco)
docker compose -f docker/docker-compose.yml --profile full up -d

# Ver logs
docker compose -f docker/docker-compose.yml logs -f
```

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

[⬆ Voltar ao README principal](../README.md)

</div>