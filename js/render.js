function renderNotes() {
  // Get notes from localStorage
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
  // Generate HTML for notes
  let notesHTML = "";
  for (const dateKey in storedNotes) {
    notesHTML += `<p class="d-flex jc"><span><strong>${dateKey}:</strong> ${storedNotes[dateKey]}</span> <img src="img/minus.svg" alt="minus"  class="delete-note minus" data-date="${dateKey}"></p>`;
  }
  // Display notes in the container
  notesContainer.innerHTML = notesHTML;
  const deleteButtons = document.querySelectorAll(".delete-note");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dateKey = this.getAttribute("data-date");
      deleteNote(dateKey);
    });
  });
}

function renderCalendar() {
  let html = "";
  const selectedView = viewSelect.value;

  switch (selectedView) {
    case "year":
      html = renderYearView(currentYear);
      break;
    case "month":
      html = renderMonthView(currentYear, currentMonth);
      break;
    case "week":
      // html = renderWeeksView(currentYear, currentMonth);
      html = displayTasks();
      console.log("week is select");
      break;
    default:
      break;
  }

  yearlyCalendar.innerHTML = html;
}

function renderYearView(year) {
  let html = "";
  for (let month = 0; month < 12; month++) {
    html += renderMonthView(year, month + 1);
  }
  return html;
}

function renderMonthView(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
    month: "long",
  });
  // console.log(month)
  let html = `<div class="month" id="month">
                  <div class="month-name">${monthName} ${year}</div>
                  <div class="days" id="days">`;

  // Add day labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < 7; i++) {
    html += `<div class="day label">${dayLabels[i]}</div>`;
  }

  // Add empty cells for days before the first day of the month
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  for (let i = 0; i < firstDayOfMonth; i++) {
    html += '<div class="day empty"></div>'; // Add class "empty" to represent empty days
  }

  // Add cells for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month}-${day}`;
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    const note = storedNotes[dateKey] || ""; // Get the note for this day
    html += `<div class="day tit ${
      note ? "green " : ""
    }" data-date="${dateKey}" onclick="addNotePrompt('${dateKey}')" >${day}<br><span class=" ${
      note ? "tooltiptext" : "d-none"
    }">${note}</span></div>`;
  }

  // Add empty cells for days after the last day of the month to complete the grid
  const lastDayOfMonth = new Date(year, month, 0).getDay();
  for (let i = lastDayOfMonth + 1; i < 7; i++) {
    html += '<div class="day empty"></div>'; // Add class "empty" to represent empty days
  }

  html += `</div>
            </div>`; // Close month div

  return html;
}
