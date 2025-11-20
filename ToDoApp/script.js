import checkComplete from "./components/checkComplete.js";
import deleteIcon from "./components/deleteIcon.js";

(() => {
  const btn = document.querySelector("[data-form-btn]");
  const list = document.querySelector("[data-list]");

  // Load tasks from localStorage on page load
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
      createTaskElement(taskText);
    });
  };

  // Save tasks to localStorage
  const saveTasks = () => {
    const tasks = Array.from(list.querySelectorAll('.task')).map(task => task.innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createTaskElement = (value) => {
    const task = document.createElement("li");
    task.classList.add("card");

    const taskContent = document.createElement("div");
    taskContent.appendChild(checkComplete());

    const titleTask = document.createElement("span");
    titleTask.classList.add("task");
    titleTask.innerText = value;
    taskContent.appendChild(titleTask);

    task.appendChild(taskContent);
    const deleteBtn = deleteIcon();
    deleteBtn.addEventListener('click', () => {
      task.remove();
      saveTasks();
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
  
  // Load tasks when page loads
  loadTasks();



})();