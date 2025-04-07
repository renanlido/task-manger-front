import { expect, test } from '@playwright/test';

test.describe('Registro de usuu00e1rio', () => {
  test('deve registrar um novo usuário com sucesso', async ({ page }) => {
    // Navegar para a pu00e1gina de registro
    await page.goto('/');
    
    // Mudar para a aba de cadastro
    await page.getByTestId('auth-tab-register').click();
    
    // Gerar email u00fanico para evitar conflitos
    const email = `test-${Date.now()}@example.com`;
    const password = 'Test@123';
    const name = 'Test User';
    
    // Preencher o formulu00e1rio de registro
    await page.getByTestId('register-name').fill(name);
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.getByTestId('register-confirm-password').fill(password);
    
    // Clicar no botu00e3o de registro
    await page.getByTestId('auth-submit-button').click();
    
    // Verificar se foi redirecionado para a pu00e1gina de tarefas
    await expect(page).toHaveURL(/\/tasks/);
    
    // Verificar se o nome do usuu00e1rio aparece no cabeu00e7alho
    await expect(page.getByTestId('user-name')).toBeVisible();
    await expect(page.getByTestId('user-name')).toContainText(name);
  });
  
  test('deve mostrar erro quando campos obrigatórios não são preenchidos', async ({ page }) => {
    // Navegar para a pu00e1gina de registro
    await page.goto('/');
    
    // Mudar para a aba de cadastro
    await page.getByTestId('auth-tab-register').click();
    
    // Clicar no botu00e3o de registro sem preencher os campos
    await page.getByTestId('auth-submit-button').click();
    
    // Verificar mensagens de erro para campos obrigatu00f3rios
    await expect(page.getByTestId('register-name-error')).toBeVisible();
    await expect(page.getByTestId('register-name-error')).toContainText('Nome deve conter pelo menos 3 caracteres');
    await expect(page.getByTestId('register-email-error')).toBeVisible();
    await expect(page.getByTestId('register-email-error')).toContainText('Email inválido');
    await expect(page.getByTestId('register-password-error')).toBeVisible();
    await expect(page.getByTestId('register-password-error')).toContainText('Senha deve conter pelo menos 8 caracteres');
    await expect(page.getByTestId('register-confirm-password-error')).toBeVisible();
    await expect(page.getByTestId('register-confirm-password-error')).toContainText('Senha deve conter pelo menos 8 caracteres');
  });
  
  test('deve mostrar erro quando as senhas não coincidem', async ({ page }) => {
    // Navegar para a pu00e1gina de registro
    await page.goto('/');
    
    // Mudar para a aba de cadastro
    await page.getByTestId('auth-tab-register').click();
    
    // Preencher o formulu00e1rio com senhas diferentes
    await page.getByTestId('register-name').fill('Test User');
    await page.getByTestId('register-email').fill('test@example.com');
    await page.getByTestId('register-password').fill('Test@123');
    await page.getByTestId('register-confirm-password').fill('DifferentPassword');
    
    // Clicar no botu00e3o de registro
    await page.getByTestId('auth-submit-button').click();
    
    // Verificar mensagem de erro para senhas que nu00e3o coincidem
    await expect(page.getByTestId('register-confirm-password-error')).toBeVisible();
    await expect(page.getByTestId('register-confirm-password-error')).toContainText('As senhas não coincidem');
  });
});