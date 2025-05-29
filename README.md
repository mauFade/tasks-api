# Projeto Tasks API

Este é um aplicativo full-stack para gerenciamento de tarefas, construído com Node.js, Express, Prisma, PostgreSQL e Next.js.

## Estrutura do Projeto

- `backend/`: API Node.js + Express com Prisma ORM
- `frontend/`: Aplicação Next.js

## Pré-requisitos

- Node.js 20 ou superior
- Gerenciador de pacotes Yarn
- Docker e Docker Compose (apenas para o banco de dados)

## Como Iniciar

### Configuração do Backend

1. Navegue até o diretório do backend:

```bash
cd backend
```

2. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

3. Instale as dependências:

```bash
yarn install
```

4. Inicie o banco de dados:

```bash
docker-compose up
```

5. Gere os arquivos necessários do Prisma

```bash
npx prisma generate
```

6. Roda as migrations do Prisma

```bash
npx prisma migrate dev
```

7. Inicie o servidor backend em um terminal separado de onde o banco de dados estiver rodando:

```bash
yarn dev
```

A API do backend estará disponível em http://localhost:8081

### Configuração do Frontend

1. Navegue até o diretório do frontend:

```bash
cd frontend
```

2. Configure as variáveis de ambiente:

```bash
cp .env.local.example .env.local
```

3. Instale as dependências:

```bash
yarn install
```

4. Inicie o servidor de desenvolvimento do frontend:

```bash
yarn dev
```

A aplicação frontend estará disponível em http://localhost:3000

## Desenvolvimento

### Backend

O backend é uma aplicação Node.js usando Express e Prisma. Roda na porta 3001.

Principais características:

- API RESTful
- Prisma ORM para operações no banco de dados
- Autenticação com JWT
- Validação de entrada com Celebrate

### Frontend

O frontend é uma aplicação Next.js com React. Roda na porta 3000.

Principais características:

- Interface moderna com Tailwind CSS
- React Query para busca de dados
- Gerenciamento de formulários com React Hook Form
- Validação de esquemas com Zod

## Banco de Dados

A aplicação utiliza PostgreSQL como banco de dados. O banco de dados é configurado automaticamente quando você executa o Docker Compose.

Credenciais padrão do banco de dados:

- Banco de dados: tasks_db
- Usuário: postgres
- Senha: postgres
- Porta: 5432

## Parando a Aplicação

Para parar o banco de dados:

```bash
docker-compose down
```

Para parar e remover todos os dados (incluindo o volume do banco de dados):

```bash
docker-compose down -v
```
