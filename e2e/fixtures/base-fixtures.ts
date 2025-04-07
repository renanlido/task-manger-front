import { test as base } from '@playwright/test';

export type UserData = {
  email: string;
  password: string;
  name?: string;
};

export type TaskData = {
  title: string;
  description?: string;
};

export const test = base.extend({
  // Dados de teste para usuu00e1rio
  testUser: async ({}, use) => {
    const testUser: UserData = {
      email: `test-${Date.now()}@example.com`,
      password: 'Test@123',
      name: 'Test User',
    };
    await use(testUser);
  },

  // Dados de teste para tarefa
  testTask: async ({}, use) => {
    const testTask: TaskData = {
      title: `Test Task ${Date.now()}`,
      description: 'This is a test task description',
    };
    await use(testTask);
  },

  // Usuu00e1rio autenticado
  authenticatedPage: async ({ page, testUser }, use) => {
    // Navegar para a pu00e1gina de login
    await page.goto('/login');
    
    // Preencher o formulu00e1rio de login
    await page.getByTestId('login-email').fill(testUser.email);
    await page.getByTestId('login-password').fill(testUser.password);
    
    // Clicar no botu00e3o de login
    await page.getByTestId('auth-submit-button').click();
    
    // Esperar pela navegau00e7u00e3o para a pu00e1gina de tarefas
    await page.waitForURL('**/tasks');
    
    await use(page);
  },
});

export { expect } from '@playwright/test';
