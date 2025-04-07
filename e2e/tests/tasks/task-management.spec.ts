import { expect, test } from '../../fixtures/base-fixtures';

test.describe('Gerenciamento de tarefas', () => {
  // Usamos a fixture authenticatedPage para ter um usuu00e1rio ju00e1 autenticado
  test.beforeEach(async ({ page }) => {
    // Registrar um novo usuu00e1rio para os testes
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
    
    // Esperar pela navegau00e7u00e3o para a pu00e1gina de tarefas
    await page.waitForURL('**/tasks');
  });
  
  test('deve criar uma nova tarefa', async ({ page, testTask }) => {
    // Preencher o formulu00e1rio de criau00e7u00e3o de tarefa
    await page.getByTestId('task-title-input').fill(testTask.title);
    await page.getByTestId('task-description-input').fill(testTask.description || '');
    
    // Clicar no botu00e3o de criar tarefa
    await page.getByTestId('add-task-button').click();
    
    // Verificar se a tarefa foi adicionada u00e0 lista
    const taskItem = page.getByTestId(`task-item-${testTask.title.replace(/\s+/g, '-').toLowerCase()}`);
    await expect(taskItem).toBeVisible();
    await expect(taskItem).toContainText(testTask.title);
    if (testTask.description) {
      await expect(taskItem).toContainText(testTask.description);
    }
  });
  
  test('deve marcar uma tarefa como concluu00edda', async ({ page, testTask }) => {
    // Criar uma nova tarefa
    await page.getByTestId('task-title-input').fill(testTask.title);
    await page.getByTestId('task-description-input').fill(testTask.description || '');
    await page.getByTestId('add-task-button').click();
    
    // Esperar a tarefa aparecer na lista
    const taskId = testTask.title.replace(/\s+/g, '-').toLowerCase();
    const taskItem = page.getByTestId(`task-item-${taskId}`);
    await expect(taskItem).toBeVisible();
    
    // Marcar a tarefa como concluu00edda
    await page.getByTestId(`task-checkbox-${taskId}`).check();
    
    // Verificar se a tarefa estu00e1 marcada como concluu00edda
    await expect(page.getByTestId(`task-checkbox-${taskId}`)).toBeChecked();
    
    // Verificar se a tarefa aparece com estilo de concluu00edda
    await expect(taskItem).toHaveClass(/completed/);
  });
  
  test('deve excluir uma tarefa', async ({ page, testTask }) => {
    // Criar uma nova tarefa
    await page.getByTestId('task-title-input').fill(testTask.title);
    await page.getByTestId('task-description-input').fill(testTask.description || '');
    await page.getByTestId('add-task-button').click();
    
    // Esperar a tarefa aparecer na lista
    const taskId = testTask.title.replace(/\s+/g, '-').toLowerCase();
    await expect(page.getByTestId(`task-item-${taskId}`)).toBeVisible();
    
    // Clicar no botu00e3o de excluir da tarefa
    await page.getByTestId(`task-delete-${taskId}`).click();
    
    // Confirmar a exclusu00e3o (se houver um diu00e1logo de confirmau00e7u00e3o)
    const confirmButton = page.getByTestId('confirm-delete-button');
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
    
    // Verificar se a tarefa foi removida da lista
    await expect(page.getByTestId(`task-item-${taskId}`)).not.toBeVisible();
  });
  
  test('deve filtrar tarefas por status', async ({ page }) => {
    // Criar uma tarefa pendente
    const pendingTaskTitle = `Pending Task ${Date.now()}`;
    const pendingTaskId = pendingTaskTitle.replace(/\s+/g, '-').toLowerCase();
    await page.getByTestId('task-title-input').fill(pendingTaskTitle);
    await page.getByTestId('add-task-button').click();
    
    // Criar uma tarefa e marcu00e1-la como concluu00edda
    const completedTaskTitle = `Completed Task ${Date.now()}`;
    const completedTaskId = completedTaskTitle.replace(/\s+/g, '-').toLowerCase();
    await page.getByTestId('task-title-input').fill(completedTaskTitle);
    await page.getByTestId('add-task-button').click();
    await page.getByTestId(`task-checkbox-${completedTaskId}`).check();
    
    // Filtrar por tarefas pendentes
    await page.getByTestId('task-filter').selectOption('pending');
    
    // Verificar se apenas a tarefa pendente estu00e1 visu00edvel
    await expect(page.getByTestId(`task-item-${pendingTaskId}`)).toBeVisible();
    await expect(page.getByTestId(`task-item-${completedTaskId}`)).not.toBeVisible();
    
    // Filtrar por tarefas concluu00eddas
    await page.getByTestId('task-filter').selectOption('completed');
    
    // Verificar se apenas a tarefa concluu00edda estu00e1 visu00edvel
    await expect(page.getByTestId(`task-item-${completedTaskId}`)).toBeVisible();
    await expect(page.getByTestId(`task-item-${pendingTaskId}`)).not.toBeVisible();
    
    // Filtrar por todas as tarefas
    await page.getByTestId('task-filter').selectOption('all');
    
    // Verificar se ambas as tarefas estu00e3o visu00edveis
    await expect(page.getByTestId(`task-item-${pendingTaskId}`)).toBeVisible();
    await expect(page.getByTestId(`task-item-${completedTaskId}`)).toBeVisible();
  });
  
  test('deve mostrar erro quando campos obrigatu00f3rios nu00e3o su00e3o preenchidos', async ({ page }) => {
    // Tentar criar uma tarefa sem preencher o tu00edtulo
    await page.getByTestId('add-task-button').click();
    
    // Verificar mensagem de erro para campo obrigatu00f3rio
    await expect(page.getByTestId('task-title-error')).toBeVisible();
    await expect(page.getByTestId('task-title-error')).toContainText('Tu00edtulo u00e9 obrigatu00f3rio');
  });
});