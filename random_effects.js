// ������ 1: ���� ������ � ������� ������� � ����� ������ + ��������� ����� �� ���� ������
export function glitchEffect(addMessage, userInput, botResponses) {
    addMessage("bot", "[SYSTEM ERROR]... glitching...");

    // ������� ������ ����� �� ���������� ���������
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
        if (glitchCount > 10) { // ����� 1 ������� ������� (10*100ms)
            clearInterval(glitchInterval);
            container.style.filter = "none";
            container.style.transform = "none";

            // ����� ����� � ���������� ��������� ��������� �����
            const keys = Object.keys(botResponses);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            addMessage("bot", botResponses[randomKey]);
        }
    }, 100);
}

// ������ 2: �������� ������ � ����� (��������, �������� ����)
export function delayedQuestionEffect(addMessage, userInput, botResponses, playAudio) {
    playAudio("creepy_laugh.mp3"); // ���� ������ ���� � ����� � �����

    setTimeout(() => {
        const keys = Object.keys(botResponses);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        addMessage("bot", botResponses[randomKey]);
    }, 3000); // 3 ������� ��������
}

// ������ 3: ������ �������� � ��� ���������� "..."
export function silentEffect(addMessage) {
    addMessage("bot", "...");
}

// ������ ��������
export const effects = [glitchEffect, delayedQuestionEffect, silentEffect];
