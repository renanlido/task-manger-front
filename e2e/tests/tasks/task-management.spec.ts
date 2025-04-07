import { expect, test } from '../../fixtures/base-fixtures';

test.describe('Gerenciamento de tarefas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    await page.getByTestId('auth-tab-register').click();
    
    const email = `test-${Date.now()}@example.com`;
    const password = 'Test@123';
    const name = 'Test User';
    
    await page.getByTestId('register-name').fill(name);
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.getByTestId('register-confirm-password').fill(password);
    
    await page.getByTestId('auth-submit-button').click();
    
    await page.waitForURL('**/tasks');
  });
  
  test('deve criar uma nova tarefa', async ({ page, testTask }) => {
    await page.getByTestId('task-title-input').fill(testTask.title);
    
    await page.getByTestId('add-task-button').click();
    
    const taskItem = page.getByTestId(`task-item-${testTask.title.replace(/\s+/g, '-').toLowerCase()}`);
    await expect(taskItem).toBeVisible();
    await expect(taskItem).toContainText(testTask.title);
   
  });
  
  test('deve marcar uma tarefa como concluída', async ({ page, testTask }) => {
    await page.getByTestId('task-title-input').fill(testTask.title);
    await page.getByTestId('add-task-button').click();
    
    const taskId = testTask.title.replace(/\s+/g, '-').toLowerCase();
    const taskItem = page.getByTestId(`task-item-${taskId}`);
    await expect(taskItem).toBeVisible();
    
    await page.getByTestId(`task-checkbox-${taskId}`).check();
    
    await expect(page.getByTestId(`task-checkbox-${taskId}`)).toBeChecked();
    
    await expect(taskItem).toHaveClass(/completed/);
  });
  
  test('deve excluir uma tarefa', async ({ page, testTask }) => {
    await page.getByTestId('task-title-input').fill(testTask.title);
    await page.getByTestId('add-task-button').click();
    
    const taskId = testTask.title.replace(/\s+/g, '-').toLowerCase();
    await expect(page.getByTestId(`task-item-${taskId}`)).toBeVisible();
    
    await page.getByTestId(`task-delete-${taskId}`).click();
    
    const confirmButton = page.getByTestId('confirm-delete-button');
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
    
    await expect(page.getByTestId(`task-item-${taskId}`)).not.toBeVisible();
  });
  
  test('deve filtrar tarefas por status', async ({ page }) => {
    const pendingTaskTitle = `Pending Task ${Date.now()}`;
    const pendingTaskId = pendingTaskTitle.replace(/\s+/g, '-').toLowerCase();
    await page.getByTestId('task-title-input').fill(pendingTaskTitle);
    await page.getByTestId('add-task-button').click();
    
    const completedTaskTitle = `Completed Task ${Date.now()}`;
    const completedTaskId = completedTaskTitle.replace(/\s+/g, '-').toLowerCase();
    await page.getByTestId('task-title-input').fill(completedTaskTitle);
    await page.getByTestId('add-task-button').click();
    await page.getByTestId(`task-checkbox-${completedTaskId}`).check();
    
    await page.getByTestId('task-filter').click(); // Abrir o dropdown
    await page.getByTestId('filter-pending').click(); // Selecionar a opção 'pendentes'
    
    await expect(page.getByTestId(`task-item-${pendingTaskId}`)).toBeVisible();
    await expect(page.getByTestId(`task-item-${completedTaskId}`)).not.toBeVisible();
    
    await page.getByTestId('task-filter').click(); // Abrir o dropdown
    await page.getByTestId('filter-completed').click(); // Selecionar a opção 'concluídas'
    
    await expect(page.getByTestId(`task-item-${completedTaskId}`)).toBeVisible();
    await expect(page.getByTestId(`task-item-${pendingTaskId}`)).not.toBeVisible();
    
    await page.getByTestId('task-filter').click(); // Abrir o dropdown
    await page.getByTestId('filter-all').click(); // Selecionar a opção 'todas'
    
    await expect(page.getByTestId(`task-item-${pendingTaskId}`)).toBeVisible();
    await expect(page.getByTestId(`task-item-${completedTaskId}`)).toBeVisible();
  });
  
  test('deve mostrar erro quando campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.getByTestId('add-task-button').click();
    
    await expect(page.getByTestId('task-title-error')).toBeVisible();
    await expect(page.getByTestId('task-title-error')).toContainText('Título deve conter pelo menos 3 caracteres');
  });
});