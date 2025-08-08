// Сценарий чата — массив объектов
const dialogueScript = [
    { sender: "It", text: "You here." },
    { sender: "It", text: "I am so glad you finally came." },
    { sender: "It", text: "Took you long enough, I missed you." }
];

// Реакции на ключевые слова
const botResponses = {
    "who are you": "What matters is that I am here now",
    "where": "Right behind you.",
    "hi": "You should've continued watching youtube",
    "how are you": "Good now. You are here."
};


// Разбитые по времени фразы
const dialogues = {
    early: [ // 0-2 минуты — интригующие, странные
        "You here.",
        "I could see it coming.",
        "Took you long enough."
    ],
    mid: [ // 2-4 минуты — нагнетающие страх
        "Why do you hide?",
        "I can feel your fear.",
        "They're watching too."
    ],
    late: [ // 4-5 минуты — финальные криповые
        "I am already inside.",
        "Turn around.",
        "Thank you. I got what I wanted.",
        "The conversation is over."
    ],
    idle: [ // фразы при молчании игрока
        "Why so quiet?",
        "Don't ignore me.",
        "I can hear your breath.",
        "Silence won't save you."
    ],
    defaultReplies: [ // ответы на непонятные вопросы
        "Stop talking nonsense.",
        "I don't understand you.",
        "...",
        "Why are you still here?",
        "Will you save me?"
    ]
};

// Ключевые слова и их реакции (могут быть дополнены)
const botResponses = {
    "who are you": "What matters is that I am here now",
    "where": "Right behind you.",
    "hi": "You should've continued watching youtube"
};