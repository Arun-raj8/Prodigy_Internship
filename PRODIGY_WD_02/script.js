let timer;
let minutes = 0, seconds = 0, milliseconds = 0;
let running = false;
let laps = [];
let elapsed = 0;
const totalDuration = 60000;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");
const progressCircle = document.getElementById("progress");

startStopBtn.addEventListener("click", function() {
    if (!running) {
        startStopBtn.innerText = "Stop";
        running = true;
        startTimer();
    } else {
        startStopBtn.innerText = "Start";
        running = false;
        clearInterval(timer);
    }
});

resetBtn.addEventListener("click", function() {
    clearInterval(timer);
    running = false;
    minutes = seconds = milliseconds = elapsed = 0;
    updateDisplay();
    startStopBtn.innerText = "Start";
    laps = [];
    lapsList.innerHTML = "";
    progressCircle.style.strokeDashoffset = 565.48;

    // Hide the lap times
    document.getElementById('lapsContainer').style.display = 'none';
    document.getElementById('lapsList').innerHTML = '';
});

lapBtn.addEventListener("click", function() {
    if (running) {
        document.getElementById('lapsContainer').style.display = 'block';
        let lapTime = `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
        laps.push(lapTime);
        displayLaps();
    }
});

function startTimer() {
    const startTime = Date.now() - elapsed;
    const endTime = startTime + totalDuration;

    timer = setInterval(() => {
        elapsed = Date.now() - startTime;
        let remaining = Math.max(0, endTime - Date.now());

        milliseconds = Math.floor((elapsed % 1000) / 10);
        seconds = Math.floor((elapsed / 1000) % 60);
        minutes = Math.floor(elapsed / 60000);

        let progress = (remaining / totalDuration) * 565.48;
        progressCircle.style.strokeDashoffset = progress;

        updateDisplay();
        if (remaining <= 0) {
            clearInterval(timer);
            running = false;
            startStopBtn.innerText = "Start";
        }
    }, 10);
}

function updateDisplay() {
    minutesEl.innerText = format(minutes);
    secondsEl.innerText = format(seconds);
    millisecondsEl.innerText = format(milliseconds);
}

function format(time) {
    return time < 10 ? `0${time}` : time;
}

function displayLaps() {
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        let li = document.createElement("li");
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}