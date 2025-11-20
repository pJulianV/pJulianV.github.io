import checkComplete from "./components/checkComplete.js";
import deleteIcon from "./components/deleteIcon.js";

(() => {
  const btn = document.querySelector("[data-form-btn]");
  const list = document.querySelector("[data-list]");

  // Load tasks from localStorage on page load
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      // Handle both old format (string) and new format (object)
      if (typeof task === 'string') {
        createTaskElement(task, false);
      } else {
        createTaskElement(task.text, task.completed);
      }
    });
  };

  // Save tasks to localStorage with completed state
  const saveTasks = () => {
    const tasks = Array.from(list.querySelectorAll('.card')).map(card => ({
      text: card.querySelector('.task').innerText,
      completed: card.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createTaskElement = (value, completed = false) => {
    const task = document.createElement("li");
    task.classList.add("card");
    if (completed) task.classList.add("completed");

    const taskContent = document.createElement("div");
    taskContent.style.display = "flex";
    taskContent.style.alignItems = "center";
    taskContent.style.gap = "10px";
    
    const checkBtn = checkComplete();
    checkBtn.addEventListener('click', () => {
      task.classList.toggle("completed");
      titleTask.style.textDecoration = task.classList.contains("completed") ? "line-through" : "none";
      titleTask.style.opacity = task.classList.contains("completed") ? "0.6" : "1";
      saveTasks();
    });
    taskContent.appendChild(checkBtn);

    const titleTask = document.createElement("span");
    titleTask.classList.add("task");
    titleTask.innerText = value;
    titleTask.contentEditable = false;
    if (completed) {
      titleTask.style.textDecoration = "line-through";
      titleTask.style.opacity = "0.6";
    }
    
    // Double click to edit
    titleTask.addEventListener('dblclick', () => {
      titleTask.contentEditable = true;
      titleTask.focus();
      titleTask.style.border = "1px dashed #667eea";
    });
    
    titleTask.addEventListener('blur', () => {
      titleTask.contentEditable = false;
      titleTask.style.border = "none";
      if (titleTask.innerText.trim()) {
        saveTasks();
      } else {
        task.remove();
        saveTasks();
      }
    });
    
    taskContent.appendChild(titleTask);

    task.appendChild(taskContent);
    const deleteBtn = deleteIcon();
    deleteBtn.addEventListener('click', () => {
      task.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        task.remove();
        saveTasks();
      }, 300);
    });
    task.appendChild(deleteBtn);
    list.appendChild(task);
  };

  const createTask = (evento) => {
    evento.preventDefault();
    const input = document.querySelector("[data-form-input]");
    const value = input.value.trim();

    // Prevent empty tasks
    if (!value) {
      input.focus();
      return;
    }

    createTaskElement(value);
    input.value = "";
    saveTasks();
  };

  btn.addEventListener("click", createTask);
  
  // Allow Enter key to submit
  const input = document.querySelector("[data-form-input]");
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        createTask(e);
      }
    });
  }
  
  // Load tasks when page loads
  loadTasks();



})();