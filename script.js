// کلک اسلامی کوئز گیم - جاوا اسکریپت لاجک

// نمونے کے طور پر اسلامی سوالات کا ڈیٹا بیس (آپ بعد میں اس میں 100 لیولز تک مزید سوالات شامل کر سکتے ہیں)
const quizData = [
    {
        question: "قرآن مجید میں کل کتنی سورتیں ہیں؟",
        options: ["112", "114", "120", "110"],
        correct: 1 // درست جواب کا انڈیکس (0 سے شروع ہوتا ہے، یعنی 114 دوسرا آپشن ہے)
    },
    {
        question: "پہلی وحی کس غار میں نازل ہوئی تھی؟",
        options: ["غار ثور", "غار حرا", "مکہ مکرمہ", "مدینہ منورہ"],
        correct: 1
    },
    {
        question: "اسلام کا پہلا کلمہ کون سا ہے؟",
        options: ["کلمہ طیب", "کلمہ شہادت", "کلمہ توحید", "کلمہ رد کفر"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// ایچ ٹی ایم ایل کے عناصر کو حاصل کرنا
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const currentLevelSpan = document.getElementById("current-level");

// گیم اور سوالات کو لوڈ کرنے کا فنکشن
function loadQuiz() {
    answerSelected = false;
    nextBtn.style.display = "none";
    optionsContainer.innerHTML = "";

    const currentQuizData = quizData[currentQuestionIndex];
    questionText.innerText = currentQuizData.question;
    currentLevelSpan.innerText = currentQuestionIndex + 1;

    // آپشنز کے بٹن متحرک طریقے سے بنانا
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// آپشن پر کلک کرنے کا فنکشن (جواب چیک کرنا)
function selectOption(selectedIndex, selectedButton) {
    if (answerSelected) return; // ایک بار جواب منتخب ہونے کے بعد دوبارہ کلک نہ ہو سکے
    answerSelected = true;

    const currentQuizData = quizData[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    if (selectedIndex === currentQuizData.correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
        // اگر غلط ہو تو درست جواب کو بھی ہائی لائٹ کر دیں
        allButtons[currentQuizData.correct].classList.add("correct");
    }

    // تمام بٹنز کو غیر فعال (Disable) کر دیں تاکہ مزید کلک نہ ہو سکے
    allButtons.forEach(btn => btn.disabled = true);

    // اگلے سوال کا بٹن ظاہر کریں
    nextBtn.style.display = "block";
}

// اگلے سوال یا اگلي سطح پر جانے کا عمل
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        // جب تمام سوالات ختم ہو جائیں تو نتیجہ دکھائیں
        document.getElementById("game-container").innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2 style="color: #27ae60; margin-bottom: 15px;">مبروک! آپ نے کوئز مکمل کر لیا ہے۔</h2>
                <p style="font-size: 1.1rem; margin-bottom: 20px;">آپ کا کل سکور: ${score} / ${quizData.length}</p>
                <button onclick="location.reload()" style="background-color: #3498db; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: bold;">دوبارہ کھیلیں</button>
            </div>
        `;
    }
});

// پہلی بار گیم شروع کرتے وقت کوئز لوڈ کریں
loadQuiz();
