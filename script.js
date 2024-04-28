// Arreglo para saber qué divs ya están ocupados
let arreglo = ["", "", ""];
// Variable para almacenar el último elemento soltado
let lastDroppedElement = null;
// Variable para almacenar el contenedor original del último elemento soltado
let originalContainer = null;

// Función que evita que se abra como enlace al soltar un elemento
function allowDrop(ev) {
    ev.preventDefault();
}

// Qué sucede cuando se arrastra un elemento
function drag(ev) {
    // Establece el tipo de datos y el valor del dato arrastrado
    // En este caso, el dato es texto y el valor es el id del elemento arrastrado
    ev.dataTransfer.setData("text", ev.target.id);
}

// Qué sucede cuando se suelta un elemento arrastrado
// Qué sucede cuando se suelta un elemento arrastrado
function drop(ev) {
    // Obtengo el nombre del id del div donde se soltará el elemento
    let targetId = parseInt(ev.target.id);

    // Verifico si el espacio está vacío antes de soltar el elemento
    if (arreglo[targetId] === "") {
        // Obtengo los datos arrastrados
        let data = ev.dataTransfer.getData("text");
        // Agrego al arreglo el nombre del id
        arreglo[targetId] = data;
        // Almaceno el elemento arrastrado
        lastDroppedElement = document.getElementById(data);
        // Almaceno el contenedor original del elemento
        originalContainer = ev.target.parentNode; // Obtener el contenedor padre del elemento soltado
        // Agrego el elemento arrastrado al elemento soltado   
        ev.target.appendChild(lastDroppedElement);
        // Agregar una clase al contenedor original para indicar que la imagen ha sido devuelta
        originalContainer.classList.add('dropped');
    }

    // Controlo si ya están arrastrados todos los elementos
    if (arreglo.every(element => element !== "")) {
        // Controlo si hay coincidencia
        if (arreglo[0] === "gato" && arreglo[1] === "perro" && arreglo[2] === "loro") {
            document.querySelector("h1").innerHTML = "¡MUY BIEN!";
        } else {
            document.querySelector("h1").innerHTML = "¡INTENTA DE NUEVO!";
        }
    }
}

// Deshacer el último movimiento
function undoMove() {
    // Verificar si hay un elemento para deshacer y si tenemos el contenedor original
    if (lastDroppedElement && originalContainer) {
        // Verificar si el contenedor original ya ha sido marcado como devuelto
        if (!originalContainer.classList.contains('dropped')) {
            // Devolver el elemento al contenedor original
            originalContainer.appendChild(lastDroppedElement);
            // Limpiar la entrada en el arreglo
            let index = arreglo.indexOf(lastDroppedElement.id);
            arreglo[index] = "";
            // Limpiar la variable de último elemento soltado y el contenedor original
            lastDroppedElement = null;
            originalContainer = null;
        }
    }
}


// Restablecer el juego al estado inicial
function resetGame() {
    // Reiniciar el arreglo de elementos arrastrados
    arreglo = ["", "", ""];
    // Recargar la página para restablecerla al estado inicial
    window.location.reload();
}

// Deshacer el último movimiento
function undoMove() {
    // Verificar si hay un elemento para deshacer y si tenemos el contenedor original
    if (lastDroppedElement && originalContainer) {
        // Devolver el elemento al contenedor original
        originalContainer.appendChild(lastDroppedElement);
        // Limpiar la entrada en el arreglo
        let index = arreglo.indexOf(lastDroppedElement.id);
        arreglo[index] = "", "", "";
        // Limpiar la variable de último elemento soltado y el contenedor original
        lastDroppedElement = null;
        originalContainer = null;
    }
}

// Escuchar el evento de clic en el botón de reinicio
document.getElementById("resetButton").addEventListener("click", resetGame);
// Escuchar el evento de clic en el botón deshacer
document.getElementById("undoButton").addEventListener("click", undoMove);
