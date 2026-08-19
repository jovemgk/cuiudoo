let port;
let writer;

const btnConnect = document.getElementById('btnConnect');
const servo1 = document.getElementById('servo1');
const servo2 = document.getElementById('servo2');
const val1 = document.getElementById('val1');
const val2 = document.getElementById('val2');

btnConnect.addEventListener('click', async () => {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
    btnConnect.innerText = "Conectado!";
    btnConnect.style.backgroundColor = "#28a745";
  } catch (err) {
    console.error("Erro ao conectar à porta serial:", err);
  }
});

async function sendData(id, angle) {
  if (writer) {
    // Envia no formato "S1:90\n"
    const command = `${id}:${angle}\n`;
    const encoder = new TextEncoder();
    await writer.write(encoder.encode(command));
  }
}

servo1.addEventListener('input', (e) => {
  const angle = e.target.value;
  val1.innerText = angle;
  sendData('S1', angle);
});

servo2.addEventListener('input', (e) => {
  const angle = e.target.value;
  val2.innerText = angle;
  sendData('S2', angle);
});