const deleteDate = document.getElementById("delete");

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
