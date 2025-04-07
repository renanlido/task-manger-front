import { expect, test } from '@playwright/test';

test.describe('Login de usuário', () => {
  // Antes de cada teste, registramos um usuário para poder fazer login
  test.beforeEach(async ({ page }) => {
    // Navegar para a página de registro
    await page.goto('/');
    
    // Mudar para a aba de cadastro
    await page.getByTestId('auth-tab-register').click();
    
    // Gerar email único para evitar conflitos
    const email = `test-${Date.now()}@example.com`;
    const password = 'Test@123';
    const name = 'Test User';
    
    // Preencher o formulário de registro
    await page.getByTestId('register-name').fill(name);
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.getByTestId('register-confirm-password').fill(password);
    
    // Clicar no botão de registro
    await page.getByTestId('auth-submit-button').click();
    
    // Esperar pela navegação para a página de tarefas
    await page.waitForURL('**/tasks');
    
    // Fazer logout (assumindo que existe um botão de logout no cabeçalho)
    await page.getByTestId('logout-button').click();
    
    // Armazenar as credenciais no contexto da página para uso posterior
    await page.evaluate(({ email, password, name }) => {
      window.localStorage.setItem('testCredentials', JSON.stringify({ email, password, name }));
    }, { email, password, name });
  });
  
  test('deve fazer login com sucesso', async ({ page }) => {
    // Recuperar as credenciais armazenadas
    const credentials = await page.evaluate(() => {
      return JSON.parse(window.localStorage.getItem('testCredentials') || '{}');
    });
    
    // Navegar para a página de login
    await page.goto('/');
    
    // Garantir que estamos na aba de login
    await page.getByTestId('auth-tab-login').click();
    
    // Preencher o formulário de login
    await page.getByTestId('login-email').fill(credentials.email);
    await page.getByTestId('login-password').fill(credentials.password);
    
    // Clicar no botão de login
    await page.getByTestId('auth-submit-button').click();

    await page.waitForLoadState('networkidle');
    
    // Verificar se foi redirecionado para a página de tarefas
    await expect(page).toHaveURL(/\/tasks/);
    
    // Verificar se o nome do usuário aparece no cabeçalho
    await expect(page.getByTestId('user-name')).toBeVisible();
    await expect(page.getByTestId('user-name')).toContainText(credentials.name);
  });
  
  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    // Navegar para a página de login
    await page.goto('/');
    
    // Garantir que estamos na aba de login
    await page.getByTestId('auth-tab-login').click();
    
    // Preencher o formulário com credenciais inválidas
    await page.getByTestId('login-email').fill('invalid@example.com');
    await page.getByTestId('login-password').fill('WrongPassword');
    
    // Clicar no botão de login
    await page.getByTestId('auth-submit-button').click();
    
    // Verificar mensagem de erro para credenciais inválidas
    await expect(page.getByText('Falha ao fazer login')).toBeVisible();
  });
  
  test('deve mostrar erro quando campos obrigatórios não são preenchidos', async ({ page }) => {
    // Navegar para a página de login
    await page.goto('/');
    
    // Garantir que estamos na aba de login
    await page.getByTestId('auth-tab-login').click();
    
    // Clicar no botão de login sem preencher os campos
    await page.getByTestId('auth-submit-button').click();
    
    // Verificar mensagens de erro para campos obrigatórios
    // As mensagens de erro são exibidas diretamente nos campos de formulário
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page.getByText('Senha deve conter pelo menos 8 caracteres')).toBeVisible();
  });
});