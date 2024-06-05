const CLOCK_CONTAINER = document.querySelector(".modal-content .clock-container");

const createItem = (index) => {
  const item = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = index;
  item.appendChild(span);
  return item;
};

const createStripe = (numberOfItems) => {
  const stripe = document.createElement("ul");
  stripe.classList.add("stripe");
  for (let i = 0; i < numberOfItems; i++) {
    stripe.appendChild(createItem(i));
  }
  CLOCK_CONTAINER.appendChild(stripe);
};

const moveStripe = (selectedItem, stripe) => {
  const items = Array.from(stripe.children);
  const item = items.find((elem) => elem.textContent === selectedItem);
  if (!item) return;

  const offset = item.offsetTop;
  stripe.style.transform = `translateY(-${offset}px)`;

  items.forEach((elem) => elem.classList.remove("selected"));
  item.classList.add("selected");
};

// Función para actualizar el reloj
const updateClock = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
  // Actualizar las rayas del reloj
  const timeParts = [hours[0], hours[1], minutes[0], minutes[1], seconds[0], seconds[1]];
  const stripes = CLOCK_CONTAINER.querySelectorAll(".stripe");
  stripes.forEach((stripe, index) => moveStripe(timeParts[index], stripe));
};

// Generate stripes
[3, 10, 6, 10, 6, 10].forEach(createStripe);

updateClock();
setInterval(updateClock, 1000);

// Evento para detectar movimiento del cursor
document.onmousemove = function() {
  // Aquí puedes agregar la lógica para cerrar el reloj y volver a page/index.html
  // Por ejemplo, si estás usando una iframe, podrías enviar un mensaje al padre para que recargue la página
  window.parent.postMessage('closeClock', '*');
};

// Escuchar mensajes del iframe
window.addEventListener('message', (event) => {
  if (event.data === 'closeClock') {
      window.location.href = '../page/index.html';
  }
}, false);


// Función para mostrar el modal del reloj
function showModal() {
    // Oscurecer la pantalla
    document.getElementById('overlay').style.display = 'block';
    // Mostrar el reloj
    document.getElementById('clockModal').style.display = 'flex';
    updateClock(); 
}
// Función para iniciar la detección de inactividad y mostrar el modal
function inactivityTime() {
    let time;
    window.onload = resetTimer;
    // Eventos para detectar actividad
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function showModal() {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('clockModal').style.display = 'flex';
        updateClock();
    }

    function closeModal() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('clockModal').style.display = 'none';
    }

    function resetTimer() {
        clearTimeout(time);
        closeModal(); // Cierra el modal si hay movimiento
        time = setTimeout(showModal, 5000); // 5 segundos de inactividad
    }
}

inactivityTime(); // Iniciar la detección de inactividad
