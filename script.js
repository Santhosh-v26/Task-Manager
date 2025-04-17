document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const progressBar = document.getElementById("progress-bar");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
  
    // Theme toggle
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode");
      themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
  
    // Add task
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = "";
      }
    });
  
    // Add task to list
    function addTask(text) {
      const taskItem = document.createElement("li");
      taskItem.className = "task";
      taskItem.innerHTML = `
        <span>${text}</span>
        <div class="buttons">
          <button class="complete-btn">✔️</button>
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">❌</button>
        </div>
      `;
  
      // Mark task as complete
      taskItem.querySelector(".complete-btn").addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        updateProgress();
      });
  
      // Edit task
      taskItem.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit your task:", text);
        if (newText !== null) {
          taskItem.querySelector("span").textContent = newText.trim() || text;
        }
      });
  
      // Delete task with slide-out animation
      taskItem.querySelector(".delete-btn").addEventListener("click", () => {
        taskItem.classList.add("slide-out");
        setTimeout(() => {
          taskList.removeChild(taskItem);
          updateProgress();
        }, 400);
      });
  
      taskList.appendChild(taskItem);
      updateProgress();
    }
  
    // Update progress bar
    function updateProgress() {
      const tasks = taskList.querySelectorAll(".task");
      const completedTasks = taskList.querySelectorAll(".task.completed");
      const progress = tasks.length ? (completedTasks.length / tasks.length) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }
  });

  