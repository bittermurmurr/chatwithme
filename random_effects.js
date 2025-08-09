// Ёффект 1: √люк экрана Ч быстрое мигание и сдвиг текста + искажение цвета на пару секунд



const laugh_array = [
    "creepy_laugh.mp3",
    "creepy_laugh_2.mp3",
    "creepy_laugh_3.mp3",
    "creepy_laugh_4.mp3"
]
// Ёффект 1: √люк Ч замена текста пользовател€ на известную фразу
export function glitchEffect(addMessage, userInput, botResponses) {
    const keys = Object.keys(botResponses);
    const randomKey = getRandomElement(keys);

    // »щем последнее сообщение пользовател€ и мен€ем текст
    const messages = document.querySelectorAll("#messages .message.user");
    if (messages.length > 0) {
        const lastUserMessage = messages[messages.length - 1];
        lastUserMessage.textContent = randomKey; // мен€ем на известный вопрос
    } else {
        // если нет сообщений от пользовател€ Ч просто добавл€ем
        addMessage("user", randomKey);
    }

    // »митаци€ небольшой задержки, потом бот отвечает
    setTimeout(() => {
        addMessage("bot", botResponses[randomKey]);
    }, 1500);
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Ёффект 2: «адержка ответа с аудио (например, зловещий смех)
export function delayedQuestionEffect(addMessage, userInput, botResponses, playAudio) {
    let sound = getRandomElement(laugh_array);
    playAudio(sound); // ѕроигрываем случайный файл из списка

    setTimeout(() => {
        const keys = Object.keys(botResponses);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        addMessage("bot", botResponses[randomKey]);
    }, 3000); // 3 секунды задержка
}

// Ёффект 3: ѕросто молчание Ч бот отправл€ет "..."
export function silentEffect(addMessage) {
    addMessage("bot", "...");
}

// ћассив эффектов
export const effects = [glitchEffect, delayedQuestionEffect, silentEffect];
