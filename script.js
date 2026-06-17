const counter = document.getElementById("counter");
const percentage = document.getElementById("percentage");
const resetBtn = document.getElementById("resetBtn");

const habits = document.querySelectorAll('input[type="checkbox"]');

function updateCounter() {

    let completed = 0;

    habits.forEach(habit => {
        if (habit.checked) {
            completed++;
        }
    });

    counter.textContent =
        `Completed Today: ${completed} / ${habits.length}`;

    const percent = Math.round(
        (completed / habits.length) * 100
    );

    percentage.textContent =
        `Success Rate: ${percent}%`;
}

habits.forEach(habit => {

    const savedValue = localStorage.getItem(habit.id);

    if (savedValue === "true") {
        habit.checked = true;
    }

    habit.addEventListener("change", () => {

        localStorage.setItem(habit.id, habit.checked);

        updateCounter();

    });

});

resetBtn.addEventListener("click", () => {

    habits.forEach(habit => {

        habit.checked = false;

        localStorage.setItem(habit.id, false);

    });

    updateCounter();

});

updateCounter();