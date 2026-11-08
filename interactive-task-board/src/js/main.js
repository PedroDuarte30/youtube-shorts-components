let draggedCard = null;
let taskIdCounter = 3;

// Drag and Drop APIs
function drag(event) {
  draggedCard = event.target;
  event.dataTransfer.setData('text/plain', event.target.id);
  setTimeout(() => event.target.classList.add('dragging'), 0);
}

function allowDrop(event) {
  event.preventDefault();
  const column = event.target.closest('.kanban-column');
  if (column) column.classList.add('drag-over');
}

document.querySelectorAll('.kanban-column').forEach(column => {
  column.addEventListener('dragleave', () => column.classList.remove('drag-over'));
});

function drop(event) {
  event.preventDefault();
  const column = event.target.closest('.kanban-column');
  if (column) {
    column.classList.remove('drag-over');
    const taskList = column.querySelector('.task-list');
    if (draggedCard) {
      draggedCard.classList.remove('dragging');
      taskList.appendChild(draggedCard);
      draggedCard = null;
    }
  }
}

// Criar Tarefa Dinâmica
function addTask() {
  const input = document.getElementById('new-task-title');
  const badgeSelect = document.getElementById('new-task-badge');
  const titleText = input.value.trim();

  if (!titleText) return;

  const taskId = `task-${taskIdCounter++}`;
  const taskCard = document.createElement('div');
  taskCard.className = 'task-card';
  taskCard.setAttribute('draggable', 'true');
  taskCard.setAttribute('ondragstart', 'drag(event)');
  taskCard.id = taskId;

  taskCard.innerHTML = `
    <div class="task-header">
      <span class="task-badge">${badgeSelect.value}</span>
      <button class="delete-btn" onclick="removeTask(event)">&times;</button>
    </div>
    <h4>${titleText}</h4>
    <p>Created dynamically via JavaScript input.</p>
  `;

  document.querySelector('#todo-column .task-list').appendChild(taskCard);
  input.value = '';
}

// Remover Tarefa (stopPropagation evita conflitos com o Drag)
function removeTask(event) {
  event.stopPropagation();
  const card = event.target.closest('.task-card');
  if (card) {
    card.style.transform = 'scale(0.9)';
    card.style.opacity = '0';
    setTimeout(() => card.remove(), 200);
  }
}