"use strict";
const getEl = (id) => {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Elemento "${id}" não encontrado.`);
    return el;
};
const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const timerDisplay = getEl('timer');
    const startBtn = getEl('start');
    const pauseBtn = getEl('pause');
    const resetBtn = getEl('reset');
    const focusBtn = getEl('focus');
    const shortBtn = getEl('short');
    const longBtn = getEl('long');
    const workInput = getEl('work-duration');
    const breakInput = getEl('break-duration');
    const longBreakInput = getEl('long-break-duration');
    const taskInput = getEl('task-input');
    const addTaskBtn = getEl('add-task');
    const taskList = getEl('task-list');
    let timerId = null;
    let timeLeft = Number(workInput.value) * 60 || 25 * 60;
    let running = false;
    const setRunningState = (isRunning) => {
        running = isRunning;
        startBtn.disabled = isRunning;
        pauseBtn.disabled = !isRunning;
        timerDisplay.classList.toggle('running', isRunning);
    };
    const updateDisplay = () => {
        timerDisplay.textContent = formatTime(timeLeft);
    };
    const clearTimer = () => {
        if (timerId !== null) {
            window.clearInterval(timerId);
            timerId = null;
        }
    };
    const resetTimer = (durationSeconds) => {
        clearTimer();
        setRunningState(false);
        timeLeft = Math.max(0, Math.round(durationSeconds));
        updateDisplay();
    };
    const tick = () => {
        if (timeLeft > 0) {
            timeLeft -= 1;
            updateDisplay();
        }
        else {
            clearTimer();
            setRunningState(false);
        }
    };
    const startTimer = () => {
        if (running)
            return;
        setRunningState(true);
        timerId = window.setInterval(tick, 1000);
    };
    const pauseTimer = () => {
        if (!running)
            return;
        clearTimer();
        setRunningState(false);
    };
    // Eventos principais
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', () => resetTimer(Number(workInput.value) * 60));
    focusBtn.addEventListener('click', () => resetTimer(Number(workInput.value) * 60));
    shortBtn.addEventListener('click', () => resetTimer(Number(breakInput.value) * 60));
    longBtn.addEventListener('click', () => resetTimer(Number(longBreakInput.value) * 60));
    workInput.addEventListener('change', () => resetTimer(Number(workInput.value) * 60));
    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (!task)
            return;
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
        taskInput.value = '';
    });
    // Inicia com o valor padrão
    resetTimer(timeLeft);
});
