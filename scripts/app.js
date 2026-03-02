const App = {
  state: {
    appointments: [],
    editIndex: null,
    reports: []
  },

init() {
  this.cacheDOM();
  this.bindEvents();
  console.log("App initialized");
},

  cacheDOM() {
    // Daily report
    this.reportForm = document.querySelector("#reportForm");
    this.reportOutput = document.querySelector("#output");

    // Appointment system
    this.appointmentForm = document.querySelector("#appointmentForm");
    this.appointmentList = document.querySelector("#appointmentList");
    this.sameCount = document.querySelector("#sameCount");
    this.nextCount = document.querySelector("#nextCount");
    this.appointmentOutput = document.querySelector("#appointmentOutput");
  },

  bindEvents() {
  // Appointment buttons
  this.addBtn = document.querySelector("#addBtn");
  this.generateBtn = document.querySelector("#generateBtn");
  this.copyBtn = document.querySelector("#copyBtn");

  this.addBtn.addEventListener("click", this.handleAddAppointment.bind(this));
  this.generateBtn.addEventListener("click", this.handleGenerateAppointmentReport.bind(this));
  this.copyBtn.addEventListener("click", this.handleCopyAppointmentReport.bind(this));
},

// Placeholder events

handleAddAppointment() {
  console.log("Add clicked");
},

handleGenerateAppointmentReport() {
  console.log("Generate appointment report clicked");
},

handleCopyAppointmentReport() {
  console.log("Copy appointment report clicked");
}
// ---------------------------------
};

App.init();

