# Gerenciador de Tarefas

Uma aplicação web para gerenciamento de tarefas pessoais, construída com React, TypeScript e Vite.

## Funcionalidades

- Registro e autenticação de usuários
- Criação, edição e exclusão de tarefas
- Marcação de tarefas como concluídas
- Filtro de tarefas por status (pendentes/concluídas)
- Interface responsiva e amigável

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- React Router Dom
- React Hook Form + Zod
- Tailwind CSS
- Playwright (testes E2E)

## Instalação e Execução

### Usando Yarn

```bash
# Clonar o repositório
git clone [url-do-repositorio]
cd [nome-do-repositorio]

# Instalar dependências
yarn install

# Executar em modo de desenvolvimento
yarn dev

# Construir para produção
yarn build

# Visualizar build de produção
yarn preview
```

### Usando Docker

O projeto inclui configurações Docker para facilitar a execução em diferentes ambientes. Ambos os serviços constroem a aplicação e a servem usando o pacote `serve` na porta 5173.

```bash
# Construir e executar em modo de produção (serviço app-dev)
docker-compose up app-dev

# Construir e executar em modo de produção (serviço app-prod)
docker-compose up app-prod
```

## Testes E2E

Este projeto utiliza Playwright para testes end-to-end. Os testes cobrem as principais funcionalidades da aplicação:

- Registro de usuário
- Login com sucesso
- Criação de nova tarefa
- Marcar tarefa como concluída
- Exclusão de tarefa
- Filtro por status (pendente/concluída)
- Bloqueio de acesso para rotas privadas sem autenticação
- Validações de formulário

Para executar os testes:

```bash
# Instalar os navegadores necessários para o Playwright
npx playwright install

# Executar todos os testes
yarn test:e2e

# Executar os testes com interface visual
yarn test:e2e:ui

# Executar os testes em modo de depuração
yarn test:e2e:debug
```

Para mais detalhes sobre os testes, consulte a [documentação de testes](./e2e/README.md).

## Estrutura do Projeto

```
├── e2e/                # Testes end-to-end com Playwright
├── public/             # Arquivos públicos
├── src/                # Código fonte
│   ├── assets/         # Recursos estáticos (imagens, etc.)
│   ├── components/     # Componentes React
│   ├── contexts/       # Contextos React
│   ├── hooks/          # Hooks personalizados
│   ├── lib/            # Bibliotecas e utilitários
│   ├── pages/          # Páginas da aplicação
│   ├── routes/         # Configuração de rotas
│   └── types/          # Definições de tipos TypeScript
└── ...                 # Arquivos de configuração
```

## Licença

MIT
