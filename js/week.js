
    // Get the current date
    const currentDate = new Date();

    // Get the current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    let currentDayIndex = currentDate.getDay();

    // Calculate the start date of the current week (Sunday)
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDayIndex);

    // Time slots
    const timeSlots = [
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
    ];

    // Create the calendar
    function createCalendar() {
        const calendar = document.getElementById("calendar");
        calendar.innerHTML = "";

        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = day.toDateString();

            // Add time slots
            for (let j = 0; j < timeSlots.length; j++) {
                const timeSlot = document.createElement("div");
                timeSlot.classList.add("time-slot");
                timeSlot.textContent = timeSlots[j];
                timeSlot.addEventListener("click", () => showTaskInput(day.toDateString(), timeSlots[j]));
                dayElement.appendChild(timeSlot);
            }
            calendar.appendChild(dayElement);
        }
    }

// Show input for task on click
function showTaskInput(dateString, timeString) {
    const taskList = document.getElementById("taskList");
    const taskInput = prompt(`Enter task for ${dateString} at ${timeString}:`);
    if (taskInput) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.textContent = `${dateString} ${timeString}: ${taskInput}`;
        taskList.appendChild(taskElement);
        // Save task to local storage
        localStorage.setItem(`${dateString} ${timeString}`, taskInput);
    }
}

// Display tasks from local storage
function displayTasks() {
  console.log("week function is called")
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let html = "";
    for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        const dateString = day.toDateString();
        for (let j = 0; j < timeSlots.length; j++) {
            const timeString = timeSlots[j];
            const taskInput = localStorage.getItem(`${dateString} ${timeString}`);
            if (taskInput) {
                const taskElement = document.createElement("div");
                taskElement.classList.add("task");
                taskElement.textContent = `${dateString} ${timeString}: ${taskInput}`;
                taskList.appendChild(taskElement);
            }
        }
    }
}
    // Go to previous week
    function prevWeek() {
        startDate.setDate(startDate.getDate() - 7);
        createCalendar();
        displayTasks();
    }

    // Go to next week
    function nextWeek() {
        startDate.setDate(startDate.getDate() + 7);
        createCalendar();
        displayTasks();
    }

    // Initialize
    createCalendar();
    displayTasks();
