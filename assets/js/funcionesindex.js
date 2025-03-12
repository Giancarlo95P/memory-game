function activeButton(botonSeleccionado) {
    const buttons = document.querySelectorAll('.btn-primary-option'); 
    
    buttons.forEach(botonSeleccionado => {
        botonSeleccionado.classList.remove('btn-primary-option-select'); 
    });

    botonSeleccionado.classList.add('btn-primary-option-select');
}

function saveOptions() {
    const tema = document.getElementById('temaSelect').value;
    const level = document.getElementById('levelSelect').value;
    const buttonActivated = document.querySelector('.btn-primary-option-select');
    const gameType = buttonActivated ? buttonActivated.textContent.trim() : "Solo";
    localStorage.setItem('tema', tema);
    localStorage.setItem('level', level);
    localStorage.setItem('modoJuego', gameType);
    console.log("¡Configuración guardada correctamente!");

}