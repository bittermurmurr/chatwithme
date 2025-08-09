// ������ 1: ���� ������ � ������� ������� � ����� ������ + ��������� ����� �� ���� ������



const laugh_array = [
    "creepy_laugh.mp3",
    "creepy_laugh_2.mp3",
    "creepy_laugh_3.mp3",
    "creepy_laugh_4.mp3"
]
// ������ 1: ���� � ������ ������ ������������ �� ��������� �����
export function glitchEffect(addMessage, userInput, botResponses) {
    const keys = Object.keys(botResponses);
    const randomKey = getRandomElement(keys);

    // ���� ��������� ��������� ������������ � ������ �����
    const messages = document.querySelectorAll("#messages .message.user");
    if (messages.length > 0) {
        const lastUserMessage = messages[messages.length - 1];
        lastUserMessage.textContent = randomKey; // ������ �� ��������� ������
    } else {
        // ���� ��� ��������� �� ������������ � ������ ���������
        addMessage("user", randomKey);
    }

    // �������� ��������� ��������, ����� ��� ��������
    setTimeout(() => {
        addMessage("bot", botResponses[randomKey]);
    }, 1500);
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ������ 2: �������� ������ � ����� (��������, �������� ����)
export function delayedQuestionEffect(addMessage, userInput, botResponses, playAudio) {
    let sound = getRandomElement(laugh_array);
    playAudio(sound); // ����������� ��������� ���� �� ������

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
