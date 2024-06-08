
let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps').getElementsByTagName('tbody')[0];

function updateDisplay(time) {
    const minutes = String(Math.floor(time / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(() => {
            updateDisplay(Date.now() - startTime + elapsedTime);
        }, 10);
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    lapCounter = 1;
    updateDisplay(0);
    laps.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime + elapsedTime;
        const tr = document.createElement('tr');
        const lapTd = document.createElement('td');
        const timeTd = document.createElement('td');
        
        lapTd.textContent = `Lap ${lapCounter}`;
        timeTd.textContent = display.textContent;
        
        tr.appendChild(lapTd);
        tr.appendChild(timeTd);
        laps.appendChild(tr);

        lapCounter++;
    }
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

