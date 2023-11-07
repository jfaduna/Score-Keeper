const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const selectedSport = document.querySelector('#sport')
const sportButtons = document.querySelectorAll('.sport-button')
const sports = ['basketball', 'volleyball', 'football', 'tableTennis']

const image = document.querySelector('#sportsImage')
const images = {
    basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    volleyball: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    football: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tableTennis: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3784&q=80'
}
const resetButton = document.querySelector('#reset')
const selectedWinningScore = document.querySelector("#playto")

let winningScore = parseInt(selectedWinningScore.value);
let isGameOver = false;

selectedWinningScore.addEventListener("change", function () {
    winningScore = parseInt(this.value)
    reset();
})

sportButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sport = button.dataset.sport;
        selectedSport.textContent = sport[0].toUpperCase() + sport.slice(1)
        sports.forEach(s => {
            if (s === sport) {
                image.src = images[`${s}`]
                button.classList.add('is-active');
            } else {
                document.querySelector(`[data-sport="${s}"]`).classList.remove('is-active');
            }
        });
    });
});

p1.button.addEventListener("click", () => updateScores(p1, p2))
p2.button.addEventListener("click", () => updateScores(p2, p1))

resetButton.addEventListener("click", reset)

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        player.display.textContent = player.score;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success')
            opponent.display.classList.add('has-text-danger')
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
    }
}

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}
