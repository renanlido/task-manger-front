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

# Executar testes específicos (exemplo: apenas testes de autenticação)
yarn test:e2e --grep "Login"
```

## Dicas para Desenvolvimento

### Boas Práticas

- Os testes utilizam fixtures para reutilização de código e configuração
- Para adicionar novos testes, crie arquivos `.spec.ts` dentro do diretório `tests/`
- Para modificar a configuração do Playwright, edite o arquivo `playwright.config.ts` na raiz do projeto
- Sempre use `data-testid` para selecionar elementos, evitando dependências de classes CSS ou texto

### Testando Componentes do Radix UI

Os componentes do Radix UI são componentes personalizados que não seguem a estrutura padrão de elementos HTML. Aqui estão algumas dicas para testá-los:

#### Select

O componente `Select` do Radix UI não é um elemento `<select>` HTML padrão, portanto não podemos usar `selectOption()`:

```typescript
// Incorreto
await page.getByTestId('task-filter').selectOption('pending');

// Correto
// 1. Clique no trigger para abrir o dropdown
await page.getByTestId('task-filter').click();
// 2. Clique na opção desejada
await page.getByTestId('filter-pending').click();
```

#### Dialog/Modal

Para testar modais do Radix UI:

```typescript
// Abrir o modal
await page.getByTestId('open-dialog-button').click();

// Verificar se o modal está visível
await expect(page.getByTestId('dialog-content')).toBeVisible();

// Interagir com elementos dentro do modal
await page.getByTestId('dialog-confirm-button').click();
```

#### Checkbox

Para testar checkboxes do Radix UI:

```typescript
// Marcar o checkbox
await page.getByTestId('task-checkbox').click();

// Verificar se está marcado (verificando a classe ou atributo data-state)
await expect(page.getByTestId('task-checkbox')).toHaveAttribute('data-state', 'checked');
// ou
await expect(page.getByTestId('task-checkbox')).toBeChecked();
```

#### Tabs

Para testar tabs do Radix UI:

```typescript
// Clicar em uma aba
await page.getByTestId('auth-tab-login').click();

// Verificar se o conteúdo da aba está visível
await expect(page.getByTestId('login-form')).toBeVisible();
```

### Depurando Testes

Para depurar testes que estão falhando:

1. Use o modo de depuração:

   ```bash
   yarn test:e2e:debug
   ```

2. Adicione `await page.pause()` em seu teste para pausar a execução e inspecionar o estado:

   ```typescript
   test('deve fazer login com sucesso', async ({ page }) => {
     await page.goto('/');
     await page.pause(); // Pausa aqui para depuração
     // Resto do teste...
   });
   ```

3. Use screenshots para capturar o estado da página em pontos específicos:

   ```typescript
   await page.screenshot({ path: 'debug-screenshot.png' });
   ```
