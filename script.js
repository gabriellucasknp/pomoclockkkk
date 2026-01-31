import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(<App />);


document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const resetBtn = document.getElementById('reset');
    const focusBtn = document.getElementById('focus');
    const shortBtn = document.getElementById('short');
    const longBtn = document.getElementById('long');
    const workInput = document.getElementById('work-duration');
    const breakInput = document.getElementById('break-duration');
    const longBreakInput = document.getElementById('long-break-duration');
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Temporizador
    let timer = null;
    let timeLeft = 25 * 60;
    let running = false;

    function updateDisplay() {
        const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const sec = String(timeLeft % 60).padStart(2, '0');
        timerDisplay.textContent = `${min}:${sec}`;
    }

    function startTimer() {
        if (running) return;
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                running = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!running) return;
        running = false;
        clearInterval(timer);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }

    function resetTimer(duration) {
        clearInterval(timer);
        running = false;
        timeLeft = duration;
        updateDisplay();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }

    // funções dos botões
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', () => {
        resetTimer(Number(workInput.value) * 60);
    });

    focusBtn.addEventListener('click', () => {
        resetTimer(Number(workInput.value) * 60);
    });
    shortBtn.addEventListener('click', () => {
        resetTimer(Number(breakInput.value) * 60);
    });
    longBtn.addEventListener('click', () => {
        resetTimer(Number(longBreakInput.value) * 60);
    });

    workInput.addEventListener('change', () => {
        resetTimer(Number(workInput.value) * 60);
    });

    // lista de tarefas
    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            const li = document.createElement('li');
            li.textContent = task;
            taskList.appendChild(li);
            taskInput.value = '';
        }
    });

    // Iniciar o tempo com o valor padrão
    resetTimer(Number(workInput.value) * 60);

});
