const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let jumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!jumping) {
            jump();
        }
    }
};

function jump() {
    jumping = true;
    let upInterval = setInterval(() => {
        // Vai executar tudo aqui a cada x ms
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    jumping = false;
                } else { // Descendo
                    position -= 15;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function criaCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 5500 + 500;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus)

    let leftInterval = setInterval(() => {

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Fim de juego
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class = "game-over"> Fim de jogo! </h1>'
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(criaCactus, randomTime);
}

criaCactus();
document.addEventListener('keyup', handleKeyUp);