function activarBoton(botonSeleccionado) {
    const botones = document.querySelectorAll('.btn'); // Selecciona todos los botones con la clase 'btn'
    
    botones.forEach(boton => {
        boton.classList.remove('active'); // Remueve la clase 'active' de todos
    });

    botonSeleccionado.classList.add('active'); // Activa solo el botón seleccionado
}

