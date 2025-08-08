// Ёффект 1: √люк экрана Ч быстрое мигание и сдвиг текста + искажение цвета на пару секунд
export function glitchEffect(addMessage, userInput, botResponses) {
    addMessage("bot", "[SYSTEM ERROR]... glitching...");

    // —оздаем эффект глюка на контейнере сообщений
    const container = document.getElementById("messages");
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        if (glitchCount % 2 === 0) {
            container.style.filter = "hue-rotate(90deg) saturate(200%) blur(1px)";
            container.style.transform = "translate(" + (Math.random() * 10 - 5) + "px," + (Math.random() * 10 - 5) + "px)";
        } else {
            container.style.filter = "none";
            container.style.transform = "none";
        }
        glitchCount++;
        if (glitchCount > 10) { // около 1 секунды эффекта (10*100ms)
            clearInterval(glitchInterval);
            container.style.filter = "none";
            container.style.transform = "none";

            // ѕосле глюка Ч показываем случайный известный ответ
            const keys = Object.keys(botResponses);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            addMessage("bot", botResponses[randomKey]);
        }
    }, 100);
}

// Ёффект 2: «адержка ответа с аудио (например, зловещий смех)
export function delayedQuestionEffect(addMessage, userInput, botResponses, playAudio) {
    playAudio("creepy_laugh.mp3"); // ‘айл должен быть в папке с игрой

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
