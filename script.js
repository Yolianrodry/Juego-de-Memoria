const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let attempts = 0;
let matches = 0;
let cardValues = [];
let cardIds = [];
let timer;
let seconds = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let gameActive = false; // Variable para controlar el estado del juego

function startGame() {
    if (!gameActive) {
        gameActive = true;  // Activar el juego
        shuffleArray(cards);
        const board = document.getElementById('game-board');
        board.innerHTML = '';  // Limpiar el tablero
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('div');
            card.className = 'card hidden';
            card.id = i;
            card.addEventListener('click', revealCard);
            board.appendChild(card);
        }
        document.getElementById('attempts').innerText = '0';
        document.getElementById('timer').innerText = '0';
        clearInterval(timer);
        seconds = 0;
        timer = setInterval(() => {
            seconds++;
            document.getElementById('timer').innerText = seconds;
        }, 1000);
    }
}

function revealCard() {
    if (!gameActive) return;  // No permitir revelar cartas si el juego no está activo

    let id = this.id;
    if (cardValues.length < 2 && this.className.includes('hidden')) {
        this.style.backgroundColor = '#4CAF50';
        this.innerText = cards[id];
        this.classList.remove('hidden');
        if (cardValues.length === 0) {
            cardValues.push(cards[id]);
            cardIds.push(id);
        } else if (cardValues.length === 1) {
            cardValues.push(cards[id]);
            cardIds.push(id);
            attempts++;
            document.getElementById('attempts').innerText = attempts;
            if (cardValues[0] === cardValues[1]) {
                matches++;
                cardValues = [];
                cardIds = [];
                if (matches === cards.length / 2) {
                    alert('¡Ganaste el juego en ' + seconds + ' segundos y ' + attempts + ' intentos!');
                    clearInterval(timer);
                    gameActive = false;  // Desactivar el juego
                }
            } else {
                setTimeout(flipBack, 700);
            }
        }
    }
}

function flipBack() {
    let cardOne = document.getElementById(cardIds[0]);
    let cardTwo = document.getElementById(cardIds[1]);
    cardOne.style.backgroundColor = '#9E9E9E';
    cardOne.innerText = '';
    cardOne.className = 'card hidden';
    cardTwo.style.backgroundColor = '#9E9E9E';
    cardTwo.innerText = '';
    cardTwo.className = 'card hidden';
    cardValues = [];
    cardIds = [];
}


//document.addEventListener('DOMContentLoaded', startGame);
