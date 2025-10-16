let queue = [];
let history = [];
const MAX_SIZE = 100;

function showOutput(message) {
  document.getElementById("output").textContent = message;
}

function addPatient() {
  const id = parseInt(document.getElementById("id").value);
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const symptoms = document.getElementById("symptoms").value;

  if (!id || !name || !age || !gender || !symptoms) {
    showOutput("⚠️ Please fill all fields.");
    return;
  }

  if (queue.length >= MAX_SIZE) {
    showOutput("❌ Cannot add patient. Queue is full.");
    return;
  }

  const patient = { id, name, age, gender, symptoms };
  queue.push(patient);
  history.push(patient);
  showOutput(`✅ Patient ${name} added to queue.`);
}

function servePatient() {
  if (queue.length === 0) {
    showOutput("📭 No patients are there.");
    return;
  }

  const served = queue.shift();
  showOutput(`🩺 Serving Patient: ${served.name} (ID: ${served.id})`);
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

function displayQueue() {
  if (queue.length === 0) {
    showOutput("📭 Queue is empty.");
    return;
  }

  let output = "🧾 Current Queue:\n";
  queue.forEach(p => {
    output += `ID: ${p.id}, Name: ${p.name}, Age: ${p.age}, Gender: ${p.gender}, Symptoms: ${p.symptoms}\n`;
  });
  showOutput(output);
}

function countPatients() {
  showOutput(`🔢 Total patients in queue: ${queue.length}`);
}

function checkAvailability() {
  if (queue.length >= MAX_SIZE) {
    showOutput("❌ No slots available. The queue is full.");
  } else {
    showOutput("✅ Slots are available");
  }
}

function searchPatient() {
  const id = prompt("Enter Patient ID to search:");
  const patient = queue.find(p => p.id === parseInt(id));
  if (patient) {
    showOutput(`🔍 Found: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}, Symptoms: ${patient.symptoms}`);
  } else {
    showOutput(`❌ No patient with ID ${id} found in queue.`);
  }
}

function showHistory() {
  if (history.length === 0) {
    showOutput("📭 No patient history available.");
    return;
  }

  let output = "📜 Patient History:\n";
  history.forEach(p => {
    output += `ID: ${p.id}, Name: ${p.name}, Age: ${p.age}, Gender: ${p.gender}, Symptoms: ${p.symptoms}\n`;
  });

  showOutput(output);
}
