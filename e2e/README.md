# Testes E2E com Playwright

Este diretório contém testes end-to-end (E2E) para a aplicação de gerenciamento de tarefas, utilizando o framework Playwright.

## Estrutura de Diretórios

```
e2e/
├── fixtures/       # Fixtures reutilizáveis para os testes
├── tests/          # Testes organizados por funcionalidade
│   ├── auth/       # Testes relacionados à autenticação
│   └── tasks/      # Testes relacionados ao gerenciamento de tarefas
└── README.md       # Esta documentação
```

## Funcionalidades Testadas

1. **Autenticação**
   - Registro de usuário
   - Login com sucesso
   - Validações de formulário
   - Proteção de rotas privadas

2. **Gerenciamento de Tarefas**
   - Criação de nova tarefa
   - Marcar tarefa como concluída
   - Exclusão de tarefa
   - Filtro por status (pendente/concluída)
   - Validações de formulário

## Executando os Testes

Para executar os testes, utilize os seguintes comandos:

```bash
# Instalar as dependências (caso ainda não tenha feito)
yarn install

# Instalar os navegadores necessários para o Playwright
npx playwright install

# Executar todos os testes
yarn test:e2e

# Executar os testes com interface visual
yarn test:e2e:ui

# Executar os testes em modo de depuração
yarn test:e2e:debug
```

## Dicas para Desenvolvimento

- Os testes utilizam fixtures para reutilização de código e configuração
- Para adicionar novos testes, crie arquivos `.spec.ts` dentro do diretório `tests/`
- Para modificar a configuração do Playwright, edite o arquivo `playwright.config.ts` na raiz do projeto
