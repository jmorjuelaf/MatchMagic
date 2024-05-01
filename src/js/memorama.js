function startGame() {
    const maxPairNumber = 4;
    let foundPairs = 0; // Cambiado de const a let
    const cards = Array.from(document.querySelectorAll(".board-game figure"));
    const availableImages = [1, 2, 3, 4];
    let canPlay = false;
    let card1 = null;
    let card2 = null;
    let orderForThisRound = [];

    setNewGame();

    function setNewGame() {
        removeClickEvents();
        cards.forEach(card => card.classList.remove("opened"));
        setTimeout(startRound, 1000);
    }

    function startRound() {
        foundPairs = 0;
        orderForThisRound = availableImages.concat(availableImages);
        orderForThisRound.sort(() => Math.random() - 0.5);
        setImagesInCards();
        openCards();
    }

    function setImagesInCards() {
        cards.forEach((card, index) => {
            const image = orderForThisRound[index];
            const imgLabel = card.children[1].children[0];
            card.dataset.image = image;
            imgLabel.src = `images/${image}.jpg`; // Ruta relativa a las imágenes
        });
    }

    function openCards() {
        cards.forEach(card => card.classList.add("opened"));
        setTimeout(closeCards, 10000);
    }

    function closeCards() {
        cards.forEach(card => card.classList.remove("opened"));
        addClickEvents();
        canPlay = true;
    }

    function addClickEvents() {
        cards.forEach(card => card.addEventListener("click", flipCard));
    }

    function removeClickEvents() {
        cards.forEach(card => card.removeEventListener("click", flipCard));
    }

    function flipCard(e) {
        const clickedCard = e.target;
        if (canPlay && !clickedCard.classList.contains("opened")) {
            clickedCard.classList.add("opened");
            checkPair(clickedCard.dataset.image);
        }
    }

    function checkPair(image) {
        if (!card1) card1 = image;
        else card2 = image;

        if (card1 && card2) {
            if (card1 == card2) {
                canPlay = false;
                setTimeout(checkIfWon, 300);
            } else {
                canPlay = false;
                setTimeout(resetOpenedCards, 800);
            }
        }
    }

    function resetOpenedCards() {
        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");

        card1 = null;
        card2 = null;
        canPlay = true;
    }

    function checkIfWon() {
        foundPairs++;
        card1 = null;
        card2 = null;
        canPlay = true;

        if (maxPairNumber == foundPairs) {
            Swal.fire({
                title: '¡Ganaste!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setNewGame();
            });
        }
    }
}

        // Función para redireccionar a index.html
        function goToIndex() {
            window.location.href = "index.html";
        }

        document.addEventListener("DOMContentLoaded", startGame);
