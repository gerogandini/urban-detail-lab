const WHATSAPP="5492215578845";
const OPEN_HOUR=8, CLOSE_HOUR=18;
const times=Array.from({length:CLOSE_HOUR-OPEN_HOUR+1},(_,i)=>`${String(OPEN_HOUR+i).padStart(2,"0")}:00`);
const form=document.getElementById("bookingForm"),dateInput=document.getElementById("date"),slots=document.getElementById("slots"),timeInput=document.getElementById("time"),hint=document.getElementById("slotHint"),summary=document.getElementById("summaryText");
const pad=n=>String(n).padStart(2,"0");
function today(){const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`}
function pretty(iso){if(!iso)return"";const[y,m,d]=iso.split("-").map(Number);return new Intl.DateTimeFormat("es-AR",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(new Date(y,m-1,d))}
dateInput.min=today();dateInput.value=today();
function renderSlots(){slots.innerHTML="";timeInput.value="";times.forEach(time=>{const b=document.createElement("button");b.type="button";b.className="slot";b.textContent=time;b.addEventListener("click",()=>{document.querySelectorAll(".slot").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");timeInput.value=time;updateSummary()});slots.appendChild(b)});hint.textContent=`Horarios disponibles para el ${pretty(dateInput.value)}.`}
function updateSummary(){const d=dateInput.value,t=timeInput.value,s=document.getElementById("service").value,n=document.getElementById("name").value.trim();if(!d||!t){summary.textContent="Elegí fecha y horario para continuar";return}summary.textContent=`${pretty(d)} · ${t}${s?" · "+s:""}${n?" · "+n:""}`}
dateInput.addEventListener("change",()=>{renderSlots();updateSummary()});
["name","service"].forEach(id=>{document.getElementById(id).addEventListener("input",updateSummary);document.getElementById(id).addEventListener("change",updateSummary)});
form.addEventListener("submit",e=>{e.preventDefault();if(!form.checkValidity()||!timeInput.value){form.reportValidity();if(!timeInput.value)hint.textContent="Seleccioná un horario antes de confirmar.";return}
const name=document.getElementById("name").value.trim(),phone=document.getElementById("phone").value.trim(),vehicle=document.getElementById("vehicle").value.trim()||"No especificado",service=document.getElementById("service").value,date=pretty(dateInput.value),time=timeInput.value;
const message=`Hola Urban Detail Lab 👋

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
window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer")});
renderSlots();updateSummary();
