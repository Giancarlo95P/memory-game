function activarBoton(botonSeleccionado) {
    const botones = document.querySelectorAll('.btn'); // Selecciona todos los botones con la clase 'btn'
    
    botones.forEach(boton => {
        boton.classList.remove('btn-primary-option-select'); // Remueve la clase 'active' de todos
    });

    botonSeleccionado.classList.add('btn-primary-option-select'); // Activa solo el botón seleccionado
}

