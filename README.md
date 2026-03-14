<div align="center">

# 🛒 Oxê, Comprei!

### Transformando o comércio local no mundo digital

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-green)

</div>

---

## 📖 Sobre o Projeto

**Oxe, Comprei!** é uma plataforma mobile que conecta comerciantes locais a consumidores através de um **mapa interativo**. O app dá visibilidade digital a pequenos negócios do Nordeste, permitindo que qualquer pessoa descubra o que existe ao redor.

### Como funciona?

🏪 **Comerciante** se cadastra no app, registra sua loja com localização, produtos, fotos e horário de funcionamento. Automaticamente, sua loja vira um ponto no mapa.

🗺️ **Consumidor** abre o app e visualiza um mapa com todas as lojas da região. Pode buscar por categoria, explorar detalhes e descobrir comércios que nem sabia que existiam.

---

## 🏗️ Arquitetura do Projeto

```
OXE_COMPREI/
├── docs/                      # Documentação, diagramas, wireframes
├── oxe-comprei-mobile/        # App mobile (React Native + Expo)
├── oxe-comprei-api/           # API REST (Node.js + TypeScript)
├── .gitignore
└── README.md                  # ← Você está aqui
```

| Módulo | Stack | Descrição |
|--------|-------|-----------|
| **Mobile** | React Native, Expo, TypeScript | App para consumidores e comerciantes |
| **API** | Node.js, Express, TypeScript, Prisma | Backend REST com autenticação e geolocalização |
| **Banco** | PostgreSQL + PostGIS | Armazenamento com suporte a queries geoespaciais |

---

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [Expo CLI](https://docs.expo.dev/)
- [Docker](https://www.docker.com/) (para o banco de dados)
- [Git](https://git-scm.com/)

### Instalação rápida

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/oxe-comprei.git
cd OXE_COMPREI

# Backend
cd oxe-comprei-api
npm install
cp .env.example .env
npm run dev

# Frontend (em outro terminal)
cd oxe-comprei-mobile
npm install
npx expo start
```

> Consulte o README de cada módulo para instruções detalhadas.

---

## 👥 Tipos de Usuário

### 🛍️ Consumidor
- Visualiza lojas no mapa interativo
- Busca por nome, categoria ou proximidade
- Salva lojas favoritas
- Navega por detalhes e produtos da loja

### 🏪 Comerciante
- Cadastra e gerencia sua loja
- Adiciona produtos e serviços
- Acompanha métricas de visibilidade (visualizações, favoritos)
- Edita informações, fotos e horário de funcionamento

---

## 🗺️ Funcionalidades Principais

- [x] Autenticação (login/cadastro) com roles
- [ ] Mapa interativo com markers por categoria
- [ ] Busca por nome, categoria e proximidade
- [ ] Cadastro de lojas com geolocalização
- [ ] CRUD de produtos por loja
- [ ] Sistema de favoritos
- [ ] Dashboard do comerciante
- [ ] Filtros por categoria
- [ ] Perfil do consumidor e comerciante

---

## 🛠️ Tech Stack Completa

**Frontend Mobile**
- React Native + Expo SDK
- Expo Router (file-based routing)
- React Native Maps + Expo Location
- Zustand (estado global)
- React Hook Form + Zod (formulários)
- Axios (HTTP client)

**Backend API**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL + PostGIS
- JWT (autenticação)
- Zod (validação)

**DevOps**
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- ESLint + Prettier

---

## 📂 Documentação

| Documento | Link |
|-----------|------|
| README do Frontend | [`oxe-comprei-mobile/README.md`](./oxe-comprei-mobile/README.md) |
| README do Backend | [`oxe-comprei-api/README.md`](./oxe-comprei-api/README.md) |

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das alterações (`git commit -m 'feat: adiciona minha feature'`)
4. Faça push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Padrão de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `style:` | Formatação, sem mudança de lógica |
| `refactor:` | Refatoração de código |
| `test:` | Adição ou correção de testes |
| `chore:` | Manutenção, dependências |

---

---

## 👥 Equipe

| Nome | GitHub |
|-----|-----|
| **Paulo Gabriel Moraes** | [@Gabri3lMoraes](https://github.com/Gabri3lMoraes) |
| **João Victor Azevedo** | [@JoaoAzevedo184](https://github.com/JoaoAzevedo184) |
| **Pedro Santos** | [@pedrosantosdev08](https://github.com/pedrosantosdev08) |

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

<div align="center">

Feito com 🧡 no Nordeste

**Oxê, Comprei!** — Valorizando o comércio local

</div>