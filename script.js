/**
 * Todo List Application
 * Uses localStorage to persist tasks across browser sessions
 */

// Constants
const STORAGE_KEY = 'tasks';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from localStorage
  const tasks = loadTasks();
  renderTasks(tasks);

  // Event listeners
  addBtn.addEventListener('click', handleAddTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddTask();
  });
  taskList.addEventListener('click', handleTaskClick);
});

// Load tasks from localStorage
function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    // Corrupted localStorage — start fresh rather than crash on load
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Render tasks to the DOM
function renderTasks(tasks) {
  // Clear existing list
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.className = `task-item${task.completed ? ' completed' : ''}`;
    taskElement.setAttribute('data-id', task.id);

    taskElement.innerHTML = `
      <span class="task-text">${escapeHtml(task.text)}</span>
      <div class="task-item-actions">
        <button class="complete-btn ${task.completed ? 'completed' : ''}"
                data-id="${escapeAttr(task.id)}"
                aria-label="${task.completed ? 'Mark incomplete' : 'Mark complete'}">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="edit-btn" data-id="${escapeAttr(task.id)}" aria-label="Edit task">Edit</button>
        <button class="delete-btn" data-id="${escapeAttr(task.id)}" aria-label="Delete task">Delete</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}

// Escape HTML special characters
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Escape a value for safe insertion into HTML attributes
function escapeAttr(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

// Handle task click events (delegate to task list)
function handleTaskClick(event) {
  const target = event.target;
  const taskId = target.dataset.id;

  if (!taskId) return;

  // Complete task
  if (target.classList.contains('complete-btn')) {
    toggleCompletion(taskId);
    return;
  }

  // Edit task
  if (target.classList.contains('edit-btn')) {
    editTask(taskId);
    return;
  }

  // Delete task
  if (target.classList.contains('delete-btn')) {
    deleteTask(taskId);
  }
}

// Add a new task
function handleAddTask() {
  const text = taskInput.value.trim();

  if (!text) {
    // Shake input to indicate error
    taskInput.style.borderColor = '#ef4444';
    taskInput.style.boxShadow = '0 0 0 3px #fee2e2';
    setTimeout(() => {
      taskInput.style.borderColor = '';
      taskInput.style.boxShadow = '';
    }, 500);
    return;
  }

  const tasks = loadTasks();
  const newTask = {
    id: crypto.randomUUID(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks(tasks);
  taskInput.value = '';
}

// Toggle task completion status
function toggleCompletion(taskId) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks(tasks);
  }
}

// Edit an existing task
function editTask(taskId) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return;

  const newText = prompt('Edit task:', task.text);

  if (newText !== null && newText.trim()) {
    task.text = newText.trim();
    saveTasks(tasks);
    renderTasks(tasks);
  }
}

// Delete a task
function deleteTask(taskId) {
  const tasks = loadTasks().filter((t) => t.id !== taskId);
  saveTasks(tasks);
  renderTasks(tasks);
}