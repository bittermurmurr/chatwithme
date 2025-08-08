import { glitchEffect, delayedQuestionEffect, silentEffect, effects } from './random_effects.js';

const messagesContainer = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let startTime = Date.now();
let idleTimer;
let currentIdleIndex = 0;
let currentDialogueIndex = 0;
let currentPhase = "early";
let finalStarted = false;

// Функция вывода сообщения
function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Получаем аудио элемент и проигрываем аудиофайл
function playAudio(filename) {
    const audio = new Audio(filename);
    audio.play();
}

// Определяем фазу по времени с момента запуска
function updatePhase() {
    const elapsed = (Date.now() - startTime) / 1000; // секунды
    if (elapsed < 120) currentPhase = "early";
    else if (elapsed < 240) currentPhase = "mid";
    else currentPhase = "late";
}

// Отправка очередной фразы по фазе
function sendNextDialogue() {
    updatePhase();
    const phaseArray = dialogues[currentPhase];
    if (currentDialogueIndex < phaseArray.length) {
        addMessage("bot", phaseArray[currentDialogueIndex]);
        currentDialogueIndex++;
    }
}

// Таймер молчания — если игрок молчит, бот говорит idle-фразу
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (currentIdleIndex >= dialogues.idle.length) currentIdleIndex = 0;
        addMessage("bot", dialogues.idle[currentIdleIndex]);
        currentIdleIndex++;
        resetIdleTimer();
    }, 10000); // 10 секунд молчания
}

// Финальный криповый конец
function showCreepyEnd() {
    finalStarted = true;
    const ip = getFakeIP();
    addMessage("bot", `IP: ${ip}`);
    addMessage("bot", "Thank you. I got what I wanted. The conversation is over.");
    setTimeout(() => {
        document.body.innerHTML = `
      <div style="background:black; height:100vh; display:flex; align-items:center; justify-content:center; flex-direction: column;">
        <h1 style="color:#ff0000; font-family: monospace; margin-bottom: 20px;">Connection lost...</h1>
        <img src="creepy_face.png" alt="Creepy Face" style="max-width: 300px; width: 100%;">
      </div>
    `;
    }, 4000);
}

// Генератор «фейкового» IP — для атмосферы
function getFakeIP() {
    return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
}

// Обработка ввода пользователя
function handleUserInput() {
    if (finalStarted) return; // после финала игнорируем ввод

    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    resetIdleTimer();

    updatePhase();

    // Проверяем ключевые слова в ответах
    const lower = text.toLowerCase();
    let foundResponse = null;
    for (let key in botResponses) {
        if (lower.includes(key)) {
            foundResponse = botResponses[key];
            break;
        }
    }

    if (foundResponse) {
        setTimeout(() => {
            addMessage("bot", foundResponse);
        }, 1500);
    } else {
        // Если вопрос не распознан — вызываем случайный эффект
        const effect = effects[Math.floor(Math.random() * effects.length)];
        if (effect === delayedQuestionEffect) {
            effect(addMessage, text, botResponses, playAudio);
        } else {
            effect(addMessage, text, botResponses);
        }
    }
}

// Запуск стартовых диалогов с задержками
function startDialogue() {
    let delay = 1000;
    dialogues.early.forEach(line => {
        setTimeout(() => {
            addMessage("bot", line);
        }, delay);
        delay += 2000;
    });
    currentDialogueIndex = dialogues.early.length;
}

// Запуск финала по таймеру 5 минут
setTimeout(() => {
    showCreepyEnd();
}, 300000); // 300000 мс = 5 минут

sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") handleUserInput();
});

// Запуск
startDialogue();
resetIdleTimer();
