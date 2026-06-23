/* ==========================================
   TASKFLOW
   Growth Companion
========================================== */

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];

/* ==========================================
   RENDER
========================================== */

function render() {

    renderList(
        todos,
        "todoList",
        "todoCounter",
        "Task",
        toggleTodo,
        deleteTodo
    );

    renderList(
        goals,
        "wishList",
        "goalCounter",
        "Goal",
        toggleGoal,
        deleteGoal
    );

    saveData();

}

/* ==========================================
   UNIVERSAL LIST RENDERER
========================================== */

function renderList(data, listID, counterID, singular, toggleFn, deleteFn) {

    const list = document.getElementById(listID);
    const counter = document.getElementById(counterID);

    counter.textContent =
        `${data.length} ${data.length === 1 ? singular : singular + "s"}`;

    if (data.length === 0) {

        list.innerHTML = `

            <div class="empty-state">

                <h3>Nothing here yet</h3>

                <p>
                    Add your first ${singular.toLowerCase()} to get started.
                </p>

            </div>

        `;

        return;

    }

    list.innerHTML = data.map((item, index) => `

        <li>

            <div class="task">

                <input
                    type="checkbox"
                    ${item.done ? "checked" : ""}
                    onclick="${toggleFn.name}(${index})">

                <span class="${item.done ? "done" : ""}">
                    ${item.text}
                </span>

            </div>

            <div class="actions">

                <button
                    class="danger"
                    onclick="${deleteFn.name}(${index})">

                    ✕

                </button>

            </div>

        </li>

    `).join("");

}

/* ==========================================
   TODAY'S FOCUS
========================================== */

function addTodo() {

    const input = document.getElementById("todoInput");

    const value = input.value.trim();

    if (!value) return;

    todos.unshift({

        text: value,
        done: false

    });

    input.value = "";

    render();

}

function toggleTodo(index) {

    todos[index].done = !todos[index].done;

    render();

}

function deleteTodo(index) {

    todos.splice(index, 1);

    render();

}

/* ==========================================
   FUTURE GOALS
========================================== */

function addWish() {

    const input = document.getElementById("wishInput");

    const value = input.value.trim();

    if (!value) return;

    goals.unshift({

        text: value,
        done: false

    });

    input.value = "";

    render();

}

function toggleGoal(index) {

    goals[index].done = !goals[index].done;

    render();

}

function deleteGoal(index) {

    goals.splice(index, 1);

    render();

}

/* ==========================================
   LOCAL STORAGE
========================================== */

function saveData() {

    localStorage.setItem("todos", JSON.stringify(todos));

    localStorage.setItem("goals", JSON.stringify(goals));

}

/* ==========================================
   ENTER KEY SUPPORT
========================================== */

document
    .getElementById("todoInput")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            addTodo();

        }

    });

document
    .getElementById("wishInput")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            addWish();

        }

    });

/* ==========================================
   INITIALIZE
========================================== */

render();