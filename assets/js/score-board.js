document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaCuerpo");

  const puntajes = JSON.parse(localStorage.getItem("score_memorama")) || [];

  // Ordenar por mayor puntaje
  puntajes.sort((a, b) => b.puntos - a.puntos);

  puntajes.forEach((puntaje, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="py-2">${index + 1}</td>
        <td>${puntaje.jugador}</td>
        <td>${puntaje.tema}</td>
        <td>${puntaje.dificultad}</td>
        <td>${puntaje.tiempo}</td>
        <td>${puntaje.intentos}</td>
        <td>${puntaje.puntos}</td>
      `;
    tabla.appendChild(fila);
  });
});
