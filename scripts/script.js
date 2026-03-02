function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function generateReport() {
  const data = {
    date: document.getElementById("date").value,
    dealerName: document.getElementById("dealerName").value,
    leadsMTD: Number(document.getElementById("leadsMTD").value),
    appointmentsYesterday: Number(
      document.getElementById("appointmentsYesterday").value,
    ),
    appointmentsMTD: Number(document.getElementById("appointmentsMTD").value),
    calls: Number(document.getElementById("calls").value),
    emails: Number(document.getElementById("emails").value),
    sms: Number(document.getElementById("sms").value),
    dealsDelivered: Number(document.getElementById("dealsDelivered").value),
    carsDelivered: Number(document.getElementById("carsDelivered").value),
    inventory: Number(document.getElementById("inventory").value),
  };

  const inquiryRatio =
    data.leadsMTD > 0
      ? ((data.carsDelivered / data.leadsMTD) * 100).toFixed(1)
      : 0;

  const inventoryRatio =
    data.inventory > 0
      ? ((data.carsDelivered / data.inventory) * 100).toFixed(1)
      : 0;

  const report = `BDC Report
${data.date}

🚘 ${data.dealerName} 🚘

Leads MTD: ${data.leadsMTD}
Appointments made yesterday: ${data.appointmentsYesterday}
Appointments MTD: ${data.appointmentsMTD}
Call count: ${data.calls}
Email count: ${data.emails}
SMS count: ${data.sms}
Deals delivered: ${data.dealsDelivered}
Inquiries to deliveries ratio: ${inquiryRatio}%
Cars Delivered: ${data.carsDelivered}
Inventory to Delivery ratio: ${inventoryRatio}%`;

  document.getElementById("output").value = report;
}

function copyReport() {
  const textarea = document.getElementById("output");
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

let appointments = [];
let editIndex = null;

const form = document.getElementById("appointmentForm");
const addBtn = document.getElementById("addBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const appointmentList = document.getElementById("appointmentList");
const sameCountEl = document.getElementById("sameCount");
const nextCountEl = document.getElementById("nextCount");

form.addEventListener("submit", (e) => e.preventDefault());
addBtn.addEventListener("click", addAppointment);
generateBtn.addEventListener("click", generateReport);
copyBtn.addEventListener("click", copyReport);

function addAppointment() {
  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const vehicle = document.getElementById("vehicle").value.trim();
  const time = document.getElementById("time").value;
  const type = document.getElementById("type").value;

  if (!name || !lastName || !phone || !vehicle || !time) {
    alert("Fill all fields.");
    return;
  }

  const appointment = { name, lastName, phone, vehicle, time, type };

  if (editIndex !== null) {
    appointments[editIndex] = appointment;
    editIndex = null;
  } else {
    appointments.push(appointment);
  }

  clearForm();
  renderAppointments();
}

function renderAppointments() {
  appointmentList.innerHTML = "";

  let sameCounter = 0;
  let nextCounter = 0;

  appointments.forEach((appt, index) => {
    if (appt.type === "same") sameCounter++;
    if (appt.type === "next") nextCounter++;

    let li = document.createElement("li");
    li.classList.add(`appointments__list-add`);
    li.innerHTML = `
            ${appt.name} ${appt.lastName} — ${appt.phone} — ${appt.vehicle} — ${appt.time} (${appt.type})\n
            <button data-edit="${index}">Edit</button>\n
            <button data-delete="${index}">Delete</button>
        `;
    appointmentList.appendChild(li);
  });

  sameCountEl.textContent = sameCounter;
  nextCountEl.textContent = nextCounter;
}

appointmentList.addEventListener("click", function (e) {
  const editAttr = e.target.getAttribute("data-edit");
  const deleteAttr = e.target.getAttribute("data-delete");

  if (editAttr !== null) {
    editAppointment(Number(editAttr));
  }

  if (deleteAttr !== null) {
    deleteAppointment(Number(deleteAttr));
  }
});

function editAppointment(index) {
  const appt = appointments[index];

  document.getElementById("name").value = appt.name;
  document.getElementById("lastName").value = appt.lastName;
  document.getElementById("phone").value = appt.phone;
  document.getElementById("vehicle").value = appt.vehicle;
  document.getElementById("time").value = appt.time;
  document.getElementById("type").value = appt.type;

  editIndex = index;
}

function deleteAppointment(index) {
  appointments.splice(index, 1);
  renderAppointments();
}

function generateAppointmentReport() {
  const date = document.getElementById("reportDate").value;
  const dealership = document.getElementById("dealership").value;
  const saturdayMade = document.getElementById("saturdayMade").value || 0;
  const saturdayTotal = document.getElementById("saturdayTotal").value || 0;

  if (!date || !dealership) {
    alert("Enter date and dealership.");
    return;
  }

  let sameDay = "";
  let nextDay = "";

  appointments.forEach((appt) => {
    const line = `• ${appt.name} ${appt.lastName} — ${appt.phone} — ${appt.vehicle} — ${appt.time}\n`;

    if (appt.type === "same") {
      sameDay += line;
    } else {
      nextDay += line;
    }
  });

  const report = `Appointments Report
    ${date}
🚘${dealership}🚘

Same-Day appointments (${sameCountEl.textContent}):
${sameDay || "None\n"}

Next-Day appointments (${nextCountEl.textContent}):
${nextDay || "None\n"}

Saturday appointments made: ${saturdayMade}
Saturday appointments total: ${saturdayTotal}`;

  console.log(report);

  document.getElementById("appointmentOutput").textContent = report;
}

function copyReport() {
  const textarea = document.getElementById("output");
  textarea.select();
  document.execCommand("copy");
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("vehicle").value = "";
  document.getElementById("time").value = "";
}

generateBtn.addEventListener("click", generateAppointmentReport);

const score = 10;
score = 15;
console.log(score);