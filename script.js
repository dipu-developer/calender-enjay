document.getElementById("toggleSidebar").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("closed");
  document.getElementById("mainContent").classList.toggle("expanded");
});

const yearlyCalendar = document.getElementById("yearlyCalendar");
const viewSelect = document.getElementById("view");
const notesContainer = document.getElementById("notes");
const months = document.getElementById("days");
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // Month is 1-indexed
const deleteDate = document.getElementById("delete");

// Ensure notes are displayed on page load
renderCalendar();
renderNotes();

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
      // Render week view (not implemented in this example)
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
    html += '<div class="day"></div>';
  }

  // Add cells for each day in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month}-${day}`;
    html += `<div class="day" data-date="${dateKey}" onclick="addNotePrompt('${dateKey}')">${day}</div>`;
  }

  // Add empty cells for days after the last day of the month to complete the grid
  const lastDayOfMonth = new Date(year, month, 0).getDay();
  for (let i = lastDayOfMonth + 1; i < 7; i++) {
    html += '<div class="day"></div>';
  }

  html += `</div>
                </div>`; // Close month div

  return html;
}

function addNotePrompt(dateKey) {
  const note = prompt(`Add note for ${dateKey}:`);
  if (note !== null && note !== "") {
    // Get existing notes from localStorage or initialize an empty object if no notes exist
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    // Add or update the note for the selected date
    storedNotes[dateKey] = note;
    // Store the updated notes in localStorage
    localStorage.setItem("notes", JSON.stringify(storedNotes));
    // Render the notes
    renderNotes();
  }
}

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

function showNext() {
  const selectedView = viewSelect.value;

  switch (selectedView) {
    case "year":
      currentYear++;
      break;
    case "month":
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
      break;
    case "week":
      // Implement week view (not implemented in this example)
      break;
    default:
      break;
  }

  renderCalendar();
  handleOptionChange();
}

function showPreview() {
  const selectedView = viewSelect.value;

  switch (selectedView) {
    case "year":
      currentYear--;
      break;
    case "month":
      currentMonth--;
      if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
      }
      break;
    case "week":
      // Implement week view (not implemented in this example)
      break;
    default:
      break;
  }

  renderCalendar();
  handleOptionChange();
}
function handleOptionChange() {
  renderCalendar();
  const days = document.getElementById("days");
  const month = document.getElementById("month");
  console.log();
  if (viewSelect.value === "month") {
    month.classList.add("w-100");
    days.classList.add("h-100");
  }
  if (selectedOption === "year") {
    selectElement.classList.remove("w-100");
  }
}
deleteDate.addEventListener("click", function () {
  localStorage.clear();
  renderNotes();
});

function deleteNote(dateKey) {
  // Get notes from localStorage
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
  // Check if the note exists
  if (dateKey in storedNotes) {
    // Delete the note
    delete storedNotes[dateKey];
    // Store the updated notes in localStorage
    localStorage.setItem("notes", JSON.stringify(storedNotes));
    // Render the notes
    renderNotes();
  }
}
