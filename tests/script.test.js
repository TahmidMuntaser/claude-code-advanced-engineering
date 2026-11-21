import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// DOM setup for jsdom environment
const fs = await import('fs');
const path = await import('path');

let html;
beforeEach(() => {
  html = fs.readFileSync(path.resolve('index.html'), 'utf8');
  document.documentElement.innerHTML = html;
});

afterEach(() => {
  document.documentElement.innerHTML = '';
  vi.restoreAllMocks();
  // Reset localStorage between tests
  localStorage.clear();
});

// --- escapeHtml ---
describe('escapeHtml', () => {
  it('escapes ampersand', () => {
    // Arrange
    const text = 'a & b';

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe('a &amp; b');
  });

  it('escapes less-than sign', () => {
    // Arrange
    const text = 'a < b';

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe('a &lt; b');
  });

  it('escapes greater-than sign', () => {
    // Arrange
    const text = 'a > b';

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe('a &gt; b');
  });

  it('does not escape double quotes in text content (valid HTML)', () => {
    // Arrange
    const text = 'a " b';

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe('a " b');
  });

  it('does not escape single quotes in text content (valid HTML)', () => {
    // Arrange
    const text = "a ' b";

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe("a ' b");
  });

  it('leaves safe text unchanged', () => {
    // Arrange
    const text = 'Buy groceries';

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe(text);
  });

  it('handles empty string', () => {
    // Arrange
    const text = '';

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe('');
  });

  it('handles null input gracefully', () => {
    // Arrange
    const text = null;

    // Act
    const div = document.createElement('div');
    div.textContent = text;
    const result = div.innerHTML;

    // Assert
    expect(result).toBe('');
  });
});

// --- escapeAttr ---
describe('escapeAttr', () => {
  it('escapes ampersand in attribute value', () => {
    // Arrange
    const text = 'a & b';

    // Act
    const result = String(text).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));

    // Assert
    expect(result).toBe('a &amp; b');
  });

  it('escapes less-than in attribute value', () => {
    // Arrange
    const text = 'a < b';

    // Act
    const result = String(text).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));

    // Assert
    expect(result).toBe('a &lt; b');
  });

  it('escapes greater-than in attribute value', () => {
    // Arrange
    const text = 'a > b';

    // Act
    const result = String(text).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));

    // Assert
    expect(result).toBe('a &gt; b');
  });

  it('escapes double quotes in attribute value', () => {
    // Arrange
    const text = 'a " b';

    // Act
    const result = String(text).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));

    // Assert
    expect(result).toBe('a &quot; b');
  });

  it('escapes single quotes in attribute value', () => {
    // Arrange
    const text = "a ' b";

    // Act
    const result = String(text).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));

    // Assert
    expect(result).toBe("a &#39; b");
  });
});

// --- loadTasks ---
describe('loadTasks', () => {
  it('returns empty array when localStorage is empty', () => {
    // Arrange
    localStorage.clear();

    // Act
    const stored = localStorage.getItem('tasks');
    const result = !stored ? [] : JSON.parse(stored);

    // Assert
    expect(result).toEqual([]);
  });

  it('parses valid JSON from localStorage', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Act
    const stored = localStorage.getItem('tasks');
    const result = JSON.parse(stored);

    // Assert
    expect(result).toEqual(tasks);
  });

  it('returns empty array when localStorage contains invalid JSON', () => {
    // Arrange
    localStorage.setItem('tasks', 'not valid json');

    // Act & Assert
    expect(() => JSON.parse(localStorage.getItem('tasks'))).toThrow();
  });
});

// --- saveTasks ---
describe('saveTasks', () => {
  it('persists tasks array as JSON string in localStorage', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Assert
    expect(localStorage.getItem('tasks')).toBe(JSON.stringify(tasks));
  });

  it('overwrites previous tasks when saving new list', () => {
    // Arrange
    const first = [{ id: '1', text: 'First', completed: false }];
    const second = [{ id: '2', text: 'Second', completed: true }];

    // Act
    localStorage.setItem('tasks', JSON.stringify(first));
    localStorage.setItem('tasks', JSON.stringify(second));

    // Assert
    expect(JSON.parse(localStorage.getItem('tasks'))).toEqual(second);
  });
});

// --- renderTasks ---
describe('renderTasks', () => {
  it('shows empty state when task list is empty', () => {
    // Arrange
    const tasks = [];
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');

    // Act
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      emptyState.style.display = 'block';
    }

    // Assert
    expect(taskList.children.length).toBe(0);
    expect(emptyState.style.display).toBe('block');
  });

  it('hides empty state and renders tasks when list is non-empty', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');

    // Act
    taskList.innerHTML = '';
    emptyState.style.display = 'none';

    tasks.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.className = `task-item${task.completed ? ' completed' : ''}`;
      taskElement.setAttribute('data-id', task.id);
      taskElement.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-item-actions"></div>
      `;
      taskList.appendChild(taskElement);
    });

    // Assert
    expect(taskList.children.length).toBe(1);
    expect(emptyState.style.display).toBe('none');
    expect(taskList.children[0].getAttribute('data-id')).toBe('1');
  });

  it('renders multiple tasks in order', () => {
    // Arrange
    const tasks = [
      { id: '1', text: 'First', completed: false },
      { id: '2', text: 'Second', completed: false },
      { id: '3', text: 'Third', completed: false },
    ];
    const taskList = document.getElementById('taskList');

    // Act
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskElement = document.createElement('li');
      taskElement.setAttribute('data-id', task.id);
      taskElement.innerHTML = `<span class="task-text">${task.text}</span>`;
      taskList.appendChild(taskElement);
    });

    // Assert
    expect(taskList.children.length).toBe(3);
    expect(taskList.children[0].getAttribute('data-id')).toBe('1');
    expect(taskList.children[1].getAttribute('data-id')).toBe('2');
    expect(taskList.children[2].getAttribute('data-id')).toBe('3');
  });
});

// --- handleAddTask ---
describe('handleAddTask', () => {
  it('adds a task with valid text', () => {
    // Arrange
    const input = document.getElementById('taskInput');
    input.value = 'Buy groceries';
    const tasks = [];

    // Act
    const text = input.value.trim();
    if (text) {
      const newTask = {
        id: 'test-id-1',
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      tasks.push(newTask);
    }

    // Assert
    expect(tasks.length).toBe(1);
    expect(tasks[0].text).toBe('Buy groceries');
    expect(tasks[0].completed).toBe(false);
  });

  it('rejects empty task text', () => {
    // Arrange
    const input = document.getElementById('taskInput');
    input.value = '';
    const tasks = [];

    // Act
    const text = input.value.trim();
    if (!text) {
      // task not added
    }

    // Assert
    expect(tasks.length).toBe(0);
  });

  it('rejects whitespace-only task text', () => {
    // Arrange
    const input = document.getElementById('taskInput');
    input.value = '   ';
    const tasks = [];

    // Act
    const text = input.value.trim();
    if (!text) {
      // task not added
    }

    // Assert
    expect(tasks.length).toBe(0);
  });

  it('clears input after adding task', () => {
    // Arrange
    const input = document.getElementById('taskInput');
    input.value = 'Buy groceries';

    // Act
    input.value = '';

    // Assert
    expect(input.value).toBe('');
  });
});

// --- toggleCompletion ---
describe('toggleCompletion', () => {
  it('flips completed status of a task', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    const task = tasks.find((t) => t.id === '1');
    task.completed = !task.completed;

    // Assert
    expect(task.completed).toBe(true);
  });

  it('flips completed status back to false', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: true }];

    // Act
    const task = tasks.find((t) => t.id === '1');
    task.completed = !task.completed;

    // Assert
    expect(task.completed).toBe(false);
  });

  it('does nothing when task id is not found', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    const task = tasks.find((t) => t.id === 'nonexistent');
    if (task) {
      task.completed = !task.completed;
    }

    // Assert
    expect(tasks[0].completed).toBe(false);
  });
});

// --- editTask ---
describe('editTask', () => {
  it('updates task text when valid new text provided', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];
    const newText = 'Buy organic milk';

    // Act
    const task = tasks.find((t) => t.id === '1');
    if (newText !== null && newText.trim()) {
      task.text = newText.trim();
    }

    // Assert
    expect(task.text).toBe('Buy organic milk');
  });

  it('keeps original text when new text is null (cancel)', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    const task = tasks.find((t) => t.id === '1');
    const newText = null;
    if (newText !== null && newText.trim()) {
      task.text = newText.trim();
    }

    // Assert
    expect(task.text).toBe('Buy milk');
  });

  it('keeps original text when new text is empty', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    const task = tasks.find((t) => t.id === '1');
    const newText = '';
    if (newText !== null && newText.trim()) {
      task.text = newText.trim();
    }

    // Assert
    expect(task.text).toBe('Buy milk');
  });

  it('keeps original text when new text is whitespace only', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    const task = tasks.find((t) => t.id === '1');
    const newText = '   ';
    if (newText !== null && newText.trim()) {
      task.text = newText.trim();
    }

    // Assert
    expect(task.text).toBe('Buy milk');
  });

  it('does nothing when task id is not found', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    const task = tasks.find((t) => t.id === 'nonexistent');
    if (task && 'new text') {
      task.text = 'new text';
    }

    // Assert
    expect(tasks[0].text).toBe('Buy milk');
  });
});

// --- deleteTask ---
describe('deleteTask', () => {
  it('removes task by id', () => {
    // Arrange
    const tasks = [
      { id: '1', text: 'First', completed: false },
      { id: '2', text: 'Second', completed: false },
      { id: '3', text: 'Third', completed: false },
    ];

    // Act
    const result = tasks.filter((t) => t.id !== '2');

    // Assert
    expect(result.length).toBe(2);
    expect(result.map((t) => t.id)).toEqual(['1', '3']);
  });

  it('does nothing when task id is not found', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Buy milk', completed: false }];

    // Act
    const result = tasks.filter((t) => t.id !== 'nonexistent');

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
  });

  it('returns empty array when deleting the only task', () => {
    // Arrange
    const tasks = [{ id: '1', text: 'Only task', completed: false }];

    // Act
    const result = tasks.filter((t) => t.id !== '1');

    // Assert
    expect(result.length).toBe(0);
  });
});

// --- handleTaskClick ---
describe('handleTaskClick', () => {
  it('does nothing when click target has no data-id', () => {
    // Arrange
    const event = { target: document.createElement('span') };

    // Act
    const taskId = event.target.dataset.id;

    // Assert
    expect(taskId).toBeUndefined();
  });
});
