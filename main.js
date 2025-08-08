const messagesContainer = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Функция вывода сообщения
function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Запуск сценария из dialogue.js
function startDialogue() {
    let delay = 1000;
    dialogueScript.forEach(line => {
        setTimeout(() => {
            addMessage(line.sender, line.text);
        }, delay);
        delay += 2000;
    });
}

// Обработка ввода пользователя
function handleUserInput() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    setTimeout(() => {
        const lower = text.toLowerCase();
        let foundResponse = null;
        for (let key in botResponses) {
            if (lower.includes(key)) {
                foundResponse = botResponses[key];
                break;
            }
        }
        if (foundResponse) {
            addMessage("bot", foundResponse);
        } else {
            addMessage("bot", "...");
        }
    }, 1500);
}

sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") handleUserInput();
});

// Запуск при загрузке
startDialogue();
