const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

function start() {
    setScore(getScore());
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0;
}

function addOne() {
    setScore(getScore() + 1);
}

$circle.addEventListener('click', (event) => {
    const rect = $circle.getBoundingClientRect();

    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientX - rect.top - rect.height / 2;

    const DEG = 20;

    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`);
        $circle.style.setProperty('--tiltY', `0deg`);
    }, 30);

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;
    plusOne.textContent = '+1';

    const img = document.createElement('img');
    img.src = './assets/coin.png';
    img.alt = 'coin';
    img.classList.add('jscoin');
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.left = `${event.clientX - rect.left}px`;
    img.style.top = `${event.clientY - rect.top}px`;

    $circle.parentElement.appendChild(plusOne);
    $circle.parentElement.appendChild(img);

    addOne();

    setTimeout(() => {
        plusOne.remove();
        img.remove();
    }, 1000);
});

start();
