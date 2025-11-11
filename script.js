const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");

// Carregar tarefas salvas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Adicionar tarefa
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = { id: Date.now(), text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

// Renderizar lista
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;

    const btns = document.createElement("div");
    btns.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Concluir";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", () => toggleTask(task.id));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    btns.append(completeBtn, editBtn, deleteBtn);
    li.append(span, btns);
    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const newText = prompt("Edite a tarefa:");
  if (newText) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, text: newText } : t));
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
