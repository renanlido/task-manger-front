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
git clone https://github.com/renanlido/taskmanager-frontend.git
cd taskmanager-frontend

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
docker-compose up
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

### Executando os Testes

```bash
# Instalar os navegadores necessários para o Playwright
npx playwright install

# Executar todos os testes
yarn test:e2e

# Executar os testes com interface visual
yarn test:e2e:ui

# Executar os testes em modo de depuração
yarn test:e2e:debug

# Executar testes específicos (exemplo: apenas testes de autenticação)
yarn test:e2e --grep "Login"
```

### Desenvolvendo Testes E2E

#### Estrutura de Testes

Os testes estão organizados na pasta `e2e/` com a seguinte estrutura:

```
e2e/
├── fixtures/       # Fixtures reutilizáveis para os testes
├── tests/          # Testes organizados por funcionalidade
│   ├── auth/       # Testes relacionados à autenticação
│   └── tasks/      # Testes relacionados ao gerenciamento de tarefas
```

#### Boas Práticas para Testes E2E

1. **Use data-testid para seletores**: Adicione atributos `data-testid` aos elementos que precisam ser testados.

   ```tsx
   <button data-testid="add-task-button">Adicionar Tarefa</button>
   ```

2. **Crie fixtures reutilizáveis**: Para configurações comuns como autenticação de usuário.

3. **Isole os testes**: Cada teste deve ser independente e não depender do estado de outros testes.

#### Testando Componentes do Radix UI

Para componentes personalizados como os do Radix UI, é necessário uma abordagem diferente dos elementos HTML padrão:

**Exemplo: Selecionando opções em um Select do Radix UI**

```typescript
// Incorreto (funciona apenas para elementos <select> HTML padrão)
await page.getByTestId('task-filter').selectOption('pending');

// Correto para componentes Select do Radix UI
// 1. Clique no trigger para abrir o dropdown
await page.getByTestId('task-filter').click();
// 2. Clique na opção desejada
await page.getByTestId('filter-pending').click();
```

**Exemplo: Interagindo com Dialog/Modal do Radix UI**

```typescript
// Abrir o modal
await page.getByTestId('open-dialog-button').click();
// Interagir com elementos dentro do modal
await page.getByTestId('dialog-confirm-button').click();
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
