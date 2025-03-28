// Rederización del board
const imagenes = [];
let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let intentos = 0;
let parejas = 0;

const config = JSON.parse(localStorage.getItem("juego_config"));
const board = document.querySelector(".grid"); // tu contenedor de cartas
const intentosSpan = document.getElementById("intentos");
const parejasSpan = document.getElementById("parejas");
const timerElement = document.getElementById("timer");
const pauseButton = document.getElementById("pauseBtn");

if (!config) {
  alert("No hay configuración encontrada. Vuelve al menú.");
  window.location.href = "index.html";
}

let totalCartas;

switch (config.level) {
  case "4x4":
    totalCartas = 16;
    break;
  case "6x6":
    totalCartas = 36;
    break;
  case "8x8":
    totalCartas = 64;
    break;
}

const cantidadUnica = totalCartas / 2;
const totalParejas = totalCartas / 2;

for (let i = 1; i <= cantidadUnica; i++) {
  imagenes.push(`assets/images/${config.tema}${i}.png`);
}

// Duplicar y mezclar usando _.shuffle de Underscore
const cartasMezcladas = _.shuffle([...imagenes, ...imagenes]);

console.log(cartasMezcladas);

cartasMezcladas.forEach((src) => {
  const carta = document.createElement("div");
  carta.className =
    "cursor-pointer aspect-square bg-gradient-to-b from-purple-500 to-indigo-700 rounded-xl flex justify-center items-center text-xl font-bold relative";
  carta.innerHTML = `
      <span class="absolute">?</span>
      <img class="opacity-0 z-0" src="${src}" alt="carta">`;
  board.appendChild(carta);
});

// Selecciona todas las cartas ya renderizadas
const cartas = document.querySelectorAll(".grid .cursor-pointer");

cartas.forEach((carta) => {
  carta.addEventListener("click", () => {
    console.log("Carta clickeada");
    if (bloqueado || carta.classList.contains("encontrada")) return;

    const img = carta.querySelector("img");
    const span = carta.querySelector("span");

    // Mostrar imagen
    img.classList.remove("opacity-0");
    img.classList.add("opacity-100");

    // Ocultar el signo de pregunta
    span.classList.add("hidden");

    // Validación de emparejamiento
    if (!primeraCarta) {
      primeraCarta = carta;
    } else if (!segundaCarta && carta !== primeraCarta) {
      segundaCarta = carta;
      bloqueado = true;

      const img1 = primeraCarta.querySelector("img").src;
      const img2 = segundaCarta.querySelector("img").src;

      intentos++;
      intentosSpan.textContent = intentos;

      if (img1 === img2) {
        primeraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");

        parejas++;
        parejasSpan.textContent = `${parejas} / ${totalParejas}`;

        resetearSeleccion();

        if (parejas === totalParejas) {
          setTimeout(() => {
            pauseTimer();
            const nombre = prompt(
              "🎉 ¡Ganaste! Ingresa tu nombre para guardar tu puntaje:"
            );

            const tiempoFinal = timerElement.textContent;
            const nuevoPuntaje = {
              jugador: nombre || "Anónimo",
              tema: config.tema,
              dificultad: config.level,
              modo: config.modo || "Solo",
              tiempo: tiempoFinal,
              intentos: intentos,
              puntos: 100 - intentos,
            };

            let scores =
              JSON.parse(localStorage.getItem("score_memorama")) || [];
            scores.push(nuevoPuntaje);
            localStorage.setItem("score_memorama", JSON.stringify(scores));

            alert("✅ Tu puntaje ha sido guardado con éxito.");
            window.location.href = "score-board.html";
          }, 300);
        }
      } else {
        setTimeout(() => {
          ocultarCarta(primeraCarta);
          ocultarCarta(segundaCarta);
          resetearSeleccion();
        }, 1000);
      }
    }
  });
}); // ← ESTE CIERRE FALTABA

function ocultarCarta(carta) {
  const img = carta.querySelector("img");
  const span = carta.querySelector("span");

  img.classList.add("opacity-0");
  img.classList.remove("opacity-100");
  span.classList.remove("hidden");
}

function resetearSeleccion() {
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}

// Función para habilitar el cronometro apenas carga la página.
let seconds = 0;
let intervalId = null;
let isPaused = false;

const updateTimerDisplay = () => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  timerElement.textContent = `${mins}:${secs}`;
};

const startTimer = () => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }
};

const pauseTimer = () => {
  clearInterval(intervalId);
  intervalId = null;
};

startTimer(); // inicia el cronómetro automáticamente

// Pausar o reanudar al hacer clic
pauseButton.addEventListener("click", () => {
  if (isPaused) {
    startTimer();
    pauseButton.innerHTML = `<i class="bi bi-pause-circle"></i> Pausar`;
  } else {
    pauseTimer();
    pauseButton.innerHTML = `<i class="bi bi-play-circle"></i> Reanudar`;
  }
  isPaused = !isPaused;
});
