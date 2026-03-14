<div align="center">

# 📱 Oxê, Comprei! — Mobile

### App mobile da plataforma Oxe, Comprei!

![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-SDK%2052-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green)

</div>

---

## 📖 Sobre

App mobile do **Oxe, Comprei!** — uma plataforma que conecta consumidores a comerciantes locais através de um mapa interativo. O consumidor descobre lojas ao redor; o comerciante ganha visibilidade digital.

---

## 🏗️ Estrutura do Projeto

O projeto usa **Expo Router** (file-based routing), onde a estrutura de arquivos define as rotas automaticamente.

```
oxe-comprei-mobile/
├── app/                           # Rotas (Expo Router)
│   ├── _layout.tsx                # Layout raiz (providers, theme)
│   ├── index.tsx                  # Redirect inicial
│   ├── (auth)/                    # Rotas públicas
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (consumer)/                # Rotas do consumidor
│   │   ├── _layout.tsx            # Tab navigator
│   │   ├── home.tsx               # 🗺️ Mapa interativo
│   │   ├── search.tsx
│   │   ├── favorites.tsx
│   │   ├── profile.tsx
│   │   └── store/
│   │       └── [id].tsx           # Detalhes da loja
│   └── (merchant)/                # Rotas do comerciante
│       ├── _layout.tsx            # Tab navigator
│       ├── dashboard.tsx
│       ├── my-store.tsx
│       ├── products/
│       │   ├── index.tsx
│       │   └── [id].tsx
│       └── profile.tsx
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes genéricos
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── Loading.tsx
│   │   ├── map/                   # Componentes do mapa
│   │   │   ├── StoreMarker.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CategoryChip.tsx
│   │   │   └── MapBottomSheet.tsx
│   │   └── store/                 # Componentes de loja
│   │       ├── StoreCard.tsx
│   │       └── StoreList.tsx
│   ├── services/                  # Comunicação com API
│   │   ├── api.ts                 # Instância Axios
│   │   ├── auth.service.ts
│   │   ├── store.service.ts
│   │   └── map.service.ts
│   ├── hooks/                     # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useLocation.ts
│   │   └── useStores.ts
│   ├── contexts/                  # Context API
│   │   ├── AuthContext.tsx
│   │   └── LocationContext.tsx
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   ├── styles/
│   │   └── theme.ts               # Cores, fontes, espaçamentos
│   └── config/
│       └── env.ts
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
├── app.json
├── tsconfig.json
├── .env
└── package.json
```

---

## 🚀 Começando

### Pré-requisitos

- Node.js >= 18
- npm >= 9
- [Expo Go](https://expo.dev/go) no celular (para testes) ou um emulador Android/iOS

### Instalação

```bash
# Entrar na pasta do mobile
cd oxe-comprei-mobile

# Instalar dependências
npm install

# Configurar variáveis de ambiente
echo 'EXPO_PUBLIC_API_URL=http://localhost:3333' > .env

# Iniciar o Expo
npx expo start
```

### Rodando no dispositivo

| Plataforma | Comando |
|------------|---------|
| Expo Go (QR Code) | `npx expo start` → escanear QR |
| Android Emulator | `npx expo start --android` |
| iOS Simulator | `npx expo start --ios` |
| Web (preview) | `npx expo start --web` |

---

## 📦 Dependências Principais

### Navegação e Core
| Pacote | Uso |
|--------|-----|
| `expo-router` | Roteamento file-based |
| `react-native-screens` | Navegação nativa otimizada |
| `react-native-safe-area-context` | Safe area em diferentes dispositivos |
| `react-native-gesture-handler` | Gestos nativos |
| `react-native-reanimated` | Animações de alta performance |

### Mapa e Localização
| Pacote | Uso |
|--------|-----|
| `react-native-maps` | MapView com markers customizados |
| `expo-location` | GPS e permissões de localização |

### Estado e Dados
| Pacote | Uso |
|--------|-----|
| `zustand` | Gerenciamento de estado global |
| `axios` | Cliente HTTP para a API |
| `react-hook-form` | Gerenciamento de formulários |
| `zod` | Validação de schemas tipada |

### UI e UX
| Pacote | Uso |
|--------|-----|
| `@gorhom/bottom-sheet` | BottomSheet nativo (preview de loja) |
| `lucide-react-native` | Ícones SVG |
| `expo-image` | Carregamento otimizado de imagens |
| `expo-secure-store` | Armazenamento seguro (JWT) |
| `expo-splash-screen` | Controle da splash screen |

---

## 🎨 Design System

### Paleta de Cores

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| `primary` | 🟠 | `#F97316` | Botões, destaques, marca |
| `primary-dark` | 🟠 | `#EA580C` | Hover, pressed states |
| `secondary` | 🔵 | `#1E3A5F` | Textos, headers, contraste |
| `background` | ⚪ | `#FAFAFA` | Fundo das telas |
| `surface` | ⬜ | `#FFFFFF` | Cards, modais |
| `text` | ⚫ | `#1A1A1A` | Texto principal |
| `text-muted` | 🩶 | `#6B7280` | Texto secundário |
| `success` | 🟢 | `#22C55E` | Confirmações |
| `error` | 🔴 | `#EF4444` | Erros, alertas |

### Tipografia

| Estilo | Tamanho | Peso | Uso |
|--------|---------|------|-----|
| `heading1` | 28px | Bold | Títulos de tela |
| `heading2` | 22px | SemiBold | Subtítulos |
| `heading3` | 18px | SemiBold | Títulos de seção |
| `body` | 16px | Regular | Texto padrão |
| `caption` | 14px | Regular | Labels, metadados |
| `small` | 12px | Regular | Badges, timestamps |

---

## 📱 Telas do App

### Fluxo de Autenticação
| Tela | Arquivo | Descrição |
|------|---------|-----------|
| Splash | `app/index.tsx` | Verifica token e redireciona |
| Welcome | `app/(auth)/welcome.tsx` | Onboarding com CTA |
| Login | `app/(auth)/login.tsx` | Email + senha |
| Cadastro | `app/(auth)/register.tsx` | Nome, email, senha, role |

### Fluxo do Consumidor
| Tela | Arquivo | Descrição |
|------|---------|-----------|
| Home / Mapa | `app/(consumer)/home.tsx` | Mapa interativo com markers |
| Busca | `app/(consumer)/search.tsx` | Busca por nome e categoria |
| Favoritos | `app/(consumer)/favorites.tsx` | Lojas salvas |
| Detalhes da Loja | `app/(consumer)/store/[id].tsx` | Info completa + produtos |
| Perfil | `app/(consumer)/profile.tsx` | Dados do consumidor |

### Fluxo do Comerciante
| Tela | Arquivo | Descrição |
|------|---------|-----------|
| Dashboard | `app/(merchant)/dashboard.tsx` | Métricas de visibilidade |
| Minha Loja | `app/(merchant)/my-store.tsx` | Editar dados da loja |
| Produtos | `app/(merchant)/products/index.tsx` | CRUD de produtos |
| Perfil | `app/(merchant)/profile.tsx` | Dados do comerciante |

---

## 🗺️ Componente do Mapa — Visão Geral

A tela `Home` é o coração do app. Sua composição:

```
┌──────────────────────────────┐
│  🔍 SearchBar (flutuante)    │
├──────────────────────────────┤
│  [Comida] [Roupa] [Serviço]  │  ← CategoryChips
├──────────────────────────────┤
│                              │
│         MapView              │
│      📍    📍                │
│          📍     📍           │
│   📍              📍         │
│              📍              │
│                        [◎]   │  ← Centralizar em mim
├──────────────────────────────┤
│  ┌────────────────────────┐  │
│  │  StoreCard (preview)   │  │  ← BottomSheet
│  │  📷 Nome | ⭐ 4.5 | 2km│  │
│  │  [Ver detalhes →]      │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `EXPO_PUBLIC_API_URL` | URL base da API | `http://localhost:3333` |

> No Expo, variáveis públicas usam o prefixo `EXPO_PUBLIC_`.

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Start | `npx expo start` | Inicia o Expo DevTools |
| Android | `npx expo start --android` | Abre no emulador Android |
| iOS | `npx expo start --ios` | Abre no simulador iOS |
| Web | `npx expo start --web` | Abre no navegador |
| Lint | `npm run lint` | Roda o ESLint |
| Reset | `npx expo start --clear` | Limpa cache e reinicia |

---

## 🧪 Testes

```bash
# Rodar todos os testes
npm run test

# Rodar com watch mode
npm run test -- --watch
```

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

[⬆ Voltar ao README principal](../README.md)

</div>