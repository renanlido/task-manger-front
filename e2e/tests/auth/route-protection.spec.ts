import { expect, test } from '@playwright/test';

test.describe('Proteção de rotas', () => {
  test('deve redirecionar para login ao tentar acessar rota privada sem autenticação', async ({ page }) => {
    // Tentar acessar diretamente a página de tarefas sem estar autenticado
    await page.goto('/tasks');
    
    // Verificar se foi redirecionado para a página de login
    await expect(page).toHaveURL(/\/login/);
  });
  
  test('deve permitir acesso a rotas privadas após autenticação', async ({ page }) => {
    // Registrar um novo usuário
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
    
    // Verificar se foi redirecionado para a página de tarefas
    await expect(page).toHaveURL(/\/tasks/);
    
    // Verificar se o conteúdo da página de tarefas está visível
    await expect(page.getByTestId('tasks-heading')).toBeVisible();
    await expect(page.getByTestId('tasks-heading')).toContainText('Gerenciador de Tarefas');
  });
  
  test('deve manter o usuário na página de tarefas após recarregar a página', async ({ page }) => {
    // Registrar um novo usuário
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
    
    // Verificar se foi redirecionado para a página de tarefas
    await expect(page).toHaveURL(/\/tasks/);
    
    // Recarregar a página
    await page.reload();
    
    // Verificar se continua na página de tarefas
    await expect(page).toHaveURL(/\/tasks/);
    await expect(page.getByTestId('tasks-heading')).toBeVisible();
    await expect(page.getByTestId('tasks-heading')).toContainText('Gerenciador de Tarefas');
  });
});