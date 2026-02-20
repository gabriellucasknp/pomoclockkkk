
type ButtonEl = HTMLButtonElement;
type InputEl = HTMLInputElement;
type TimerEl = HTMLElement;

const getEl = <T extends HTMLElement>(id: string): T => {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Elemento "${id}" não encontrado.`);
    return el as T;
};

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const timerDisplay = getEl<TimerEl>('timer');
    const startBtn = getEl<ButtonEl>('start');
    const pauseBtn = getEl<ButtonEl>('pause');
    const resetBtn = getEl<ButtonEl>('reset');
    const focusBtn = getEl<ButtonEl>('focus');
    const shortBtn = getEl<ButtonEl>('short');
    const longBtn = getEl<ButtonEl>('long');
    const workInput = getEl<InputEl>('work-duration');
    const breakInput = getEl<InputEl>('break-duration');
    const longBreakInput = getEl<InputEl>('long-break-duration');
    const taskInput = getEl<InputEl>('task-input');
    const addTaskBtn = getEl<ButtonEl>('add-task');
    const taskList = getEl<HTMLUListElement>('task-list');

    let timerId: number | null = null;
    let timeLeft = Number(workInput.value) * 60 || 25 * 60;
    let running = false;

    const setRunningState = (isRunning: boolean): void => {
        running = isRunning;
        startBtn.disabled = isRunning;
        pauseBtn.disabled = !isRunning;
        timerDisplay.classList.toggle('running', isRunning);
    };

    const updateDisplay = (): void => {
        timerDisplay.textContent = formatTime(timeLeft);
    };

    const clearTimer = (): void => {
        if (timerId !== null) {
            window.clearInterval(timerId);
            timerId = null;
        }
    };

    const resetTimer = (durationSeconds: number): void => {
        clearTimer();
        setRunningState(false);
        timeLeft = Math.max(0, Math.round(durationSeconds));
        updateDisplay();
    };

    const tick = (): void => {
        if (timeLeft > 0) {
            timeLeft -= 1;
            updateDisplay();
        } else {
            clearTimer();
            setRunningState(false);
        }
    };

    const startTimer = (): void => {
        if (running) return;
        setRunningState(true);
        timerId = window.setInterval(tick, 1000);
    };

    const pauseTimer = (): void => {
        if (!running) return;
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
        if (!task) return;

        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
        taskInput.value = '';
    });

    // Inicia com o valor padrão
    resetTimer(timeLeft);
});
