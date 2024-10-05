let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

// DOM Elements
const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

// Start or Stop Timer
startStopBtn.addEventListener("click", function() {
    if (!running) {
        startStopBtn.textContent = "Stop";
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        running = true;
    } else {
        startStopBtn.textContent = "Start";
        clearInterval(timerInterval);
        difference = updatedTime;
        running = false;
    }
});

// Reset Timer
resetBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    timeDisplay.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    lapsContainer.innerHTML = ''; // Clear laps
    lapCounter = 0; // Reset lap counter
});

// Update the time
function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let milliseconds = Math.floor((updatedTime % 1000) / 10);
    let seconds = Math.floor((updatedTime / 1000) % 60);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);

    milliseconds = (milliseconds < 10 ? "0" : "") + milliseconds;
    seconds = (seconds < 10 ? "0" : "") + seconds;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    timeDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

// Record Lap
lapBtn.addEventListener("click", function() {
    if (running) {
        lapCounter++;
        const lapTime = timeDisplay.textContent;

        const lapElement = document.createElement("div");
        lapElement.classList.add("lap");

        lapElement.innerHTML = `
            <span class="lap-number">Lap ${lapCounter}</span>
            <span class="lap-time">${lapTime}</span>
        `;

        lapsContainer.appendChild(lapElement);

        if (lapCounter === 1) {
            const clearLapsBtn = document.createElement("button");
            clearLapsBtn.classList.add("clear-laps-btn");
            clearLapsBtn.textContent = "Clear Laps";
            clearLapsBtn.addEventListener("click", clearLaps);
            lapsContainer.appendChild(clearLapsBtn);
        }
    }
});

// Clear Laps
function clearLaps() {
    lapsContainer.innerHTML = '';
    lapCounter = 0;
}
