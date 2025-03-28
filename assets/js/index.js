// Recuperar datos del formulario

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    // Guarda los datos en localStorage como texto JSON
    localStorage.setItem('juego_config', JSON.stringify(data));
    window.location.href = 'board-game.html'
})

document.querySelector('#score-board').addEventListener('click', () => {
    window.location.href = "score-board.html";
});

// Recuperación de dato de los botones modo de juego
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-modo]').forEach(button => {
      button.addEventListener('click', () => {
        document.getElementById('modoInput').value = button.getAttribute('data-modo');
        // Aplicar clase visual activa
        document.querySelectorAll('[data-modo]').forEach(btn => {
          btn.classList.remove('bg-indigo-100', 'text-indigo-700', 'border-indigo-500');
        });
        button.classList.add('bg-indigo-100', 'text-indigo-700', 'border-indigo-500');
      });
    });
});
