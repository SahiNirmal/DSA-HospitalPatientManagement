const queue = [];
const history = [];
const MAX = 100;

document.getElementById("patientForm").addEventListener("submit", function(e) {
  e.preventDefault();
  if (queue.length >= MAX) {
    showOutput("Queue is full! Cannot add new patient.");
    return;
  }

  const patient = {
    id: parseInt(document.getElementById("id").value),
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    symptoms: document.getElementById("symptoms").value
  };

  queue.push(patient);
  showOutput(` Patient ${patient.name} added successfully!`);
  this.reset();
});

function servePatient() {
  if (queue.length === 0) {
    showOutput(" No patients in queue.");
    return;
  }
  const patient = queue.shift();
  history.push(patient);
  showOutput(`🩺 Serving Patient:\nID: ${patient.id} | Name: ${patient.name} | Age: ${patient.age} | Gender: ${patient.gender} | Symptoms: ${patient.symptoms}`);
}

function displayQueue() {
  if (queue.length === 0) {
    showOutput(" No patients are waiting in the queue.");
    return;
  }
  let output = " Patients Waiting in Queue:\n";
  queue.forEach(p => {
    output += `ID: ${p.id} | Name: ${p.name} | Age: ${p.age} | Gender: ${p.gender} | Symptoms: ${p.symptoms}\n`;
  });
  showOutput(output);
}

function countPatients() {
  showOutput(`Total patients in queue: ${queue.length}`);
}

function checkFull() {
  showOutput(`Queue is ${queue.length >= MAX ? "Full" : "Not Full"}`);
}

function checkEmpty() {
  showOutput(`Queue is ${queue.length === 0 ? "Empty" : "Not Empty"}`);
}

function searchPatient() {
  const id = prompt("Enter Patient ID to search:");
  const patient = queue.find(p => p.id === parseInt(id));
  if (patient) {
    showOutput(`✅ Patient Found:\nID: ${patient.id} | Name: ${patient.name} | Age: ${patient.age} | Gender: ${patient.gender} | Symptoms: ${patient.symptoms}`);
  } else {
    showOutput(`❌ No patient with ID ${id} found in queue.`);
  }
}

function showHistory() {
  if (history.length === 0) {
    showOutput(" No patient history available.");
    return;
  }
  let output = " Patient History:\n";
  history.forEach(p => {
    output += `ID: ${p.id} | Name: ${p.name} | Age: ${p.age} | Gender: ${p.gender} | Symptoms: ${p.symptoms}\n`;
  });
  showOutput(output);
}

function deleteFromHistory() {
  const id = prompt("Enter Patient ID to delete from history:");
  const index = history.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const removed = history.splice(index, 1)[0];
    showOutput(`🗑️ Patient ${removed.name} (ID: ${removed.id}) removed from history.`);
  } else {
    showOutput(`❌ No patient with ID ${id} found in history.`);
  }
}

function showOutput(message) {
  document.getElementById("output").innerText = message;
}