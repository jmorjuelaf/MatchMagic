// Arreglo para saber qué divs ya están ocupados
let arreglo = ["", "", "", "", "", "", "", "", "", "", "", ""];
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
        newContainer = ev.target.parentNode; // Obtener el contenedor padre del elemento soltado
        // Agrego el elemento arrastrado al elemento soltado   
        ev.target.appendChild(lastDroppedElement);
        // Agregar una clase al contenedor original para indicar que la imagen ha sido devuelta
        newContainer.classList.add('dropped');
            originalContainer = document.getElementById(`${data}-container`)
    }

    // Función para mostrar SweetAlert con el mensaje de éxito o fracaso
function showResultAlert(isSuccess) {
    if (isSuccess) {
        Swal.fire({
            title: '¡MUY BIEN!',
            text: 'Has completado el rompecabezas correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            // Reiniciar el juego después de que el usuario haga clic en Aceptar
            resetGame();
        });
    } else {
        Swal.fire({
            title: '¡INTENTA DE NUEVO!',
            text: 'Algo no está bien, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            // Reiniciar el juego después de que el usuario haga clic en Aceptar
            resetGame();
        });
    }
}

// Controlo si ya están arrastrados todos los elementos
if (arreglo.every(element => element !== "")) {
    // Controlo si hay coincidencia
    const isSuccess = arreglo[0] === "camara" && arreglo[1] === "cassette" && arreglo[2] === "celular" && arreglo[3] === "consola" && arreglo[4] === "control" && arreglo[5] === "impresora" && arreglo[6] === "monitor" && arreglo[7] === "mouse" && arreglo[8] === "portatil" && arreglo[9] === "robot" && arreglo[10] === "tablet" && arreglo[11] === "televisor";
    showResultAlert(isSuccess);
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
    arreglo = ["", "", "", "", "", "", "", "", "", "", "", ""];
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
        arreglo[index] = "", "", "", "", "", "", "", "", "", "", "", "";
        // Limpiar la variable de último elemento soltado y el contenedor original
        lastDroppedElement = null;
        originalContainer = null;
    }
}
// Función para redireccionar a index.html
function goToIndex() {
    window.location.href = "index.html";
}
// Escuchar el evento de clic en el botón de reinicio
//document.getElementById("resetButton").addEventListener("click", resetGame);
// Escuchar el evento de clic en el botón deshacer
document.getElementById("undoButton").addEventListener("click", undoMove);