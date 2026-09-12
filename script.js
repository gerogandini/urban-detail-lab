const WHATSAPP = "5492215578845";

const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;

const times = Array.from(
  { length: CLOSE_HOUR - OPEN_HOUR + 1 },
  (_, i) => `${String(OPEN_HOUR + i).padStart(2, "0")}:00`
);

const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const slots = document.getElementById("slots");
const timeInput = document.getElementById("time");
const hint = document.getElementById("slotHint");
const summary = document.getElementById("summaryText");

const pad = (n) => String(n).padStart(2, "0");

function today() {
  const d = new Date();

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}`;
}

function pretty(iso) {
  if (!iso) return "";

  const [y, m, d] = iso.split("-").map(Number);

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

dateInput.min = today();
dateInput.value = today();

function renderSlots() {
  slots.innerHTML = "";
  timeInput.value = "";

  times.forEach((time) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "slot";
    button.textContent = time;

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".slot")
        .forEach((item) => item.classList.remove("selected"));

      button.classList.add("selected");
      timeInput.value = time;

      updateSummary();
    });

    slots.appendChild(button);
  });

  hint.textContent = `Horarios disponibles para el ${pretty(
    dateInput.value
  )}.`;
}

function updateSummary() {
  const date = dateInput.value;
  const time = timeInput.value;
  const service = document.getElementById("service").value;
  const name = document.getElementById("name").value.trim();

  if (!date || !time) {
    summary.textContent = "Elegí fecha y horario para continuar";
    return;
  }

  summary.textContent =
    `${pretty(date)} · ${time}` +
    `${service ? " · " + service : ""}` +
    `${name ? " · " + name : ""}`;
}

dateInput.addEventListener("change", () => {
  renderSlots();
  updateSummary();
});

["name", "service"].forEach((id) => {
  const element = document.getElementById(id);

  element.addEventListener("input", updateSummary);
  element.addEventListener("change", updateSummary);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity() || !timeInput.value) {
    form.reportValidity();

    if (!timeInput.value) {
      hint.textContent =
        "Seleccioná un horario antes de confirmar.";
    }

    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const vehicle =
    document.getElementById("vehicle").value.trim() ||
    "No especificado";
  const service = document.getElementById("service").value;
  const date = pretty(dateInput.value);
  const time = timeInput.value;

  const message = `Hola Urban Detail Lab 👋

Quiero solicitar un turno:

• Nombre: ${name}
• Teléfono: ${phone}
• Vehículo: ${vehicle}
• Servicio: ${service}
• Fecha: ${date}
• Horario: ${time}

📍 74 e/ 29 y 30
⏰ Lunes a domingos · 08:00 a 18:00

¡Gracias!`;

  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});

renderSlots();
updateSummary();
