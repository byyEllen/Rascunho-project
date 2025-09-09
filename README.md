# Bestiário Digital

Uma aplicação full-stack moderna e elegante para catalogar criaturas, raças, itens e magias de sistemas de RPG. Interface imersiva com tema gótico em preto e vermelho, combinando elementos medievais fantásticos com design moderno.

##  Funcionalidades

###  Sistemas RPG Suportados
- **Dungeons & Dragons (D&D 5e)**
- **Tormenta20 (T20)**
- **Vampiro: A Máscara**

###  Navegação e Filtros
- Seletor de sistema RPG no header
- Filtros por categoria na sidebar:
  - Monstros
  - Raças
  - Itens
  - Magias
- Barra de pesquisa global
- Contador de itens por categoria

### Sistema de Favoritos
- Marcar qualquer item como favorito
- Visualizar todos os favoritos em seção dedicada
- Persistência local (localStorage)
- Contador de favoritos no header

### Gerenciamento de PDFs
- **Livros de Regras**: Upload de PDFs dos sistemas
- **Fichas de Personagem**: Upload de fichas específicas por sistema
- Download e remoção de arquivos
- Organização por sistema RPG

### Autenticação e Perfil
- Perfil personalizado do usuário
- Sistema preferido salvo
- Favoritos sincronizados com o servidor

### Interface
- Tema gótico com paleta preta e vermelha
- Cards com efeitos hover e animações suaves
- Design responsivo
- Scrollbar personalizada
- Tipografia medieval (Cinzel) para títulos

##  Conteúdo por Sistema

### Dungeons & Dragons (D&D 5e)

####  Raças (9)
- Anão das Montanhas
- Elfo Alto
- Halfling Pés Peludos
- Humano Variante
- Draconato Dourado
- Gnomo da Floresta
- Meio-Elfo Bardo
- Meio-Orc Bárbaro
- Tiefling Infernal

#### Monstros (35) - Organizados por Categoria

**Bestas e Animais**
- Lobo Cinzento, Urso Pardo, Leão Majestoso, Águia Dourada, Tubarão Branco

**Humanoides**
- Orc Guerreiro, Goblin Ladino, Kobold Armadilheiro, Gnoll Caçador, Drow Assassino, Hobgoblin Capitão

**Mortos-vivos**
- Zumbi Putrefato, Esqueleto Guerreiro, Vampiro Nobre, Lich Supremo, Fantasma Vingativo

**Aberrações**
- Beholder Tirano, Mind Flayer, Gibbering Mouther

**Dragões**
- Dragão Vermelho Ancião, Dragão Azul Adulto, Dragão Verde Jovem, Dragão Dourado Ancião, Dragão Prateado Adulto

**Gigantes**
- Gigante de Gelo, Gigante de Fogo, Gigante das Nuvens, Gigante das Tempestades

**Elementais**
- Elemental de Fogo, Elemental de Água, Elemental de Ar, Elemental de Terra

**Demônios e Diabos**
- Balor Senhor Demônio, Pit Fiend Arquidiabo, Succubus Sedutora

### Tormenta20 (T20)

####  Raças (9)
- Humano de Arton
- Anão de Doherimm
- Elfo de Lenórienn
- Goblin das Montanhas
- Lefou Corrompido
- Minotauro de Tauron
- Qareen dos Desertos
- Hynne Aventureiro
- Kliren Inventor

#### ⚔️ Itens e Magias
- Espada Flamejante Mágica
- Raio das Trevas
- Armadura Demoníaca

### Vampiro: A Máscara

#### Clãs Vampíricos (7)
- Brujah Rebelde
- Gangrel Selvagem
- Malkavian Louco
- Nosferatu das Sombras
- Toreador Artista
- Tremere Feiticeiro
- Ventrue Nobre

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript ^5.4.0
- **Styling**: Tailwind CSS v4 + Sass ^1.69.0
- **Estado**: Redux Toolkit ^1.9.7 + React-Redux ^8.1.3
- **Componentes**: shadcn/ui + Lucide React
- **HTTP Client**: Axios ^1.6.0

### Backend
- **Runtime**: Node.js ^20.11.0
- **Framework**: Express ^4.18.2
- **Linguagem**: TypeScript ^5.4.0
- **Banco de Dados**: MongoDB ^6.0 + Mongoose ^7.5.0
- **Autenticação**: JWT (jsonwebtoken ^9.0.2)
- **Segurança**: bcrypt ^5.1.1, helmet, cors, rate-limiting
- **Dev Tools**: ts-node-dev ^2.0.0

## 📁 Estrutura do Projeto

\`\`\`
bestiario-digital/
├── backend/
│   ├── src/
│   │   ├── controllers/         # Controladores da API
│   │   │   ├── authController.ts
│   │   │   ├── criaturaController.ts
│   │   │   ├── racaController.ts
│   │   │   ├── itemController.ts
│   │   │   └── magiaController.ts
│   │   ├── models/              # Modelos do MongoDB
│   │   │   ├── User.ts
│   │   │   ├── Criatura.ts
│   │   │   ├── Raca.ts
│   │   │   ├── Item.ts
│   │   │   └── Magia.ts
│   │   ├── routes/              # Rotas RESTful
│   │   │   ├── auth.ts
│   │   │   ├── criaturas.ts
│   │   │   ├── racas.ts
│   │   │   ├── itens.ts
│   │   │   ├── magias.ts
│   │   │   └── pdfs.ts
│   │   ├── middlewares/         # Middlewares
│   │   │   └── auth.ts          # JWT Authentication
│   │   └── server.ts            # Servidor principal
│   ├── uploads/                 # Arquivos PDF
│   │   └── pdfs/               # PDFs organizados
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/ (raiz do projeto)
│   ├── app/
│   │   ├── globals.css          # Estilos globais e tema
│   │   ├── layout.tsx           # Layout principal
│   │   └── page.tsx             # Página principal (SPA)
│   ├── redux/
│   │   ├── store.ts             # Store Redux
│   │   └── slices/              # Redux slices
│   │       ├── authSlice.ts
│   │       ├── criaturaSlice.ts
│   │       ├── favoritosSlice.ts
│   │       └── uiSlice.ts
│   ├── components/
│   │   └── ui/                  # Componentes shadcn/ui
│   ├── public/
│   │   └── *.png               # Imagens das criaturas
│   ├── package.json
│   └── tsconfig.json
└── README.md                   # Esta documentação
\`\`\`

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil atual (protegido)
- `PUT /api/auth/profile` - Atualizar perfil (protegido)

### Criaturas
- `GET /api/criaturas` - Listar criaturas
- `GET /api/criaturas/:id` - Buscar criatura
- `POST /api/criaturas` - Criar criatura (protegido)
- `PUT /api/criaturas/:id` - Atualizar criatura (protegido)
- `DELETE /api/criaturas/:id` - Deletar criatura (protegido)

### Raças
- `GET /api/racas` - Listar raças
- `GET /api/racas/:id` - Buscar raça
- `POST /api/racas` - Criar raça (protegido)
- `PUT /api/racas/:id` - Atualizar raça (protegido)
- `DELETE /api/racas/:id` - Deletar raça (protegido)

### Itens
- `GET /api/itens` - Listar itens
- `GET /api/itens/:id` - Buscar item
- `POST /api/itens` - Criar item (protegido)
- `PUT /api/itens/:id` - Atualizar item (protegido)
- `DELETE /api/itens/:id` - Deletar item (protegido)

### Magias
- `GET /api/magias` - Listar magias
- `GET /api/magias/:id` - Buscar magia
- `POST /api/magias` - Criar magia (protegido)
- `PUT /api/magias/:id` - Atualizar magia (protegido)
- `DELETE /api/magias/:id` - Deletar magia (protegido)

### PDFs
- `POST /api/pdfs/upload` - Upload de PDF (protegido)
- `GET /api/pdfs` - Listar PDFs
- `GET /api/pdfs/:filename` - Download de PDF
- `DELETE /api/pdfs/:filename` - Deletar PDF (protegido)

### Health Check
- `GET /api/health` - Status da API

## 🎯 Como Usar

1. **Registrar/Login**: Crie uma conta ou faça login
2. **Selecionar Sistema**: Use o dropdown no header para escolher entre D&D, Tormenta20 ou Vampiro
3. **Filtrar Conteúdo**: Use a sidebar para filtrar por Monstros, Raças, Itens ou Magias
4. **Pesquisar**: Digite na barra de pesquisa para encontrar itens específicos
5. **Favoritar**: Clique no ❤️ nos cards para marcar como favorito
6. **Gerenciar PDFs**: Use as seções "Livros de Regras" e "Fichas de Personagem" para upload de documentos
7. **Ver Favoritos**: Clique em "Favoritos" na sidebar para ver todos os itens marcados

## 🎨 Design

- **Paleta**: Preto (#000000), Vermelho (#DC2626), Cinza escuro (#1F1F1F)
- **Tipografia**: Cinzel para títulos medievais, DM Sans para textos
- **Efeitos**: Hover com brilho vermelho, sombras suaves, transições fluidas
- **Layout**: Grid responsivo, cards organizados, sidebar fixa

## 📊 Estatísticas Atuais

- **Total de Itens**: 60+
- **Sistemas**: 3
- **Raças D&D**: 9
- **Monstros D&D**: 35 (8 categorias)
- **Raças Tormenta20**: 9
- **Clãs Vampiro**: 7
- **Funcionalidades**: Autenticação, CRUD completo, Favoritos, Upload PDFs, Pesquisa, Filtros

## 🔧 Scripts Disponíveis

### Frontend
\`\`\`bash
npm run dev      # Desenvolvimento com hot reload
npm run build    # Build para produção
npm run start    # Executar build de produção
npm run lint     # Linting do código
npm run type-check # Verificação de tipos TypeScript
\`\`\`

### Backend
\`\`\`bash
npm run dev      # Desenvolvimento com hot reload (ts-node-dev)
npm run build    # Compilar TypeScript para JavaScript
npm run start    # Executar versão compilada
npm test         # Executar testes (Jest)
\`\`\`

## 🚀 Deploy

### Backend (Railway/Heroku/DigitalOcean)

1. **Configurar variáveis de ambiente:**
   \`\`\`env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...  # MongoDB Atlas
   JWT_SECRET=sua-chave-super-segura
   FRONTEND_URL=https://seu-frontend.vercel.app
   \`\`\`

2. **Deploy:**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

### Frontend (Vercel/Netlify)

1. **Configurar variável de ambiente:**
   \`\`\`env
   NEXT_PUBLIC_API_URL=https://sua-api.railway.app/api
   \`\`\`

2. **Deploy:**
   \`\`\`bash
   npm run build
   \`\`\`

## 🛠️ Desenvolvimento

### Estrutura de Desenvolvimento
- **Frontend**: SPA (Single Page Application) com Next.js
- **Backend**: API RESTful com Express
- **Banco**: MongoDB com Mongoose ODM
- **Autenticação**: JWT com middleware personalizado
- **Upload**: Multer para arquivos PDF

### Comandos Úteis

\`\`\`bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Verificar portas em uso
lsof -i :3000  # Frontend
lsof -i :5000  # Backend

# Logs do MongoDB (se local)
sudo tail -f /var/log/mongodb/mongod.log
\`\`\`

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com MongoDB:**
   - Verifique se o MongoDB está rodando
   - Confirme a string de conexão no `.env`
   - Para Atlas, verifique IP whitelist

2. **CORS Error:**
   - Verifique se `FRONTEND_URL` está correto no backend
   - Confirme se `NEXT_PUBLIC_API_URL` aponta para o backend

3. **JWT Error:**
   - Verifique se `JWT_SECRET` está definido
   - Confirme se o token não expirou

4. **Upload de PDF não funciona:**
   - Verifique permissões da pasta `uploads/`
   - Confirme se o middleware `multer` está configurado

### Logs Úteis

\`\`\`bash
# Backend logs
cd backend && npm run dev

# Frontend logs
npm run dev

# MongoDB logs (local)
sudo journalctl -u mongodb
\`\`\`
