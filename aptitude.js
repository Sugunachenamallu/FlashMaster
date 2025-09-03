// Existing constants
const quizToggle = document.getElementById("quizModeToggle");
const flashcardContainer = document.getElementById("flashcardContainer");
const answerInput = document.getElementById("typedAnswer");
const checkAnswerBtn = document.getElementById("checkAnswerButton");
const modeToggleContainer = document.getElementById("modeToggleContainer");

// New Timer Variables
const timerDisplay = document.getElementById("timerDisplay");
let timerInterval;
let secondsElapsed = 0; // Renamed from 'seconds' to avoid conflict if you use 'seconds' elsewhere

let currentCardIndex = 0;

const flashcardsData = [
    // ... (Your existing flashcardsData array) ...
    {
        question: "Q1: What is 15% of 300?", answer: "A: 45\nLogic: (15/100) × 300"
    },
    {
        question: "Q2: A car covers 120 km in 2 hrs. What is its speed?", answer: "A: 60 km/h\nLogic: Distance ÷ Time = 120 ÷ 2"
    },
    {
        question: "Q3: A student got 70 out of 100. What is the percentage?", answer: "A: 70%\nLogic: (70/100) × 100"
    },
    {
        question: "Q4: √144 = ?", answer: "A: 12\nLogic: 12 × 12 = 144"
    },
    {
        question: "Q5: Find SI on ₹1000 for 2 years at 5%.", answer: "A: ₹100\nLogic: (1000×5×2)/100"
    },
    {
        question: "Q6:What comes next: 1, 4, 9, 16, 25, ___", answer: "A: 36Logic: Squares of natural numbers"
    },
    {
        question: "Q7: If a:b = 2:5, b:c = 3:4, then a:c = ?",
        answer: "A: 6:20 (or simplified 3:10)\nLogic: Make b = common term"
    },
    {
        question: "Q8: What comes next: 2, 4, 8, 16, ___",
        answer: "A: 32\nLogic: Multiply by 2 each time"
    },
    {
        question: "Q9: CP = ₹50, SP = ₹60. Find the profit %.",
        answer: "A: 20%\nLogic: (10/50) × 100"
    },
    {
        question: "Q10: What is 25% of 200?",
        answer: "A: 50\nLogic: 25/100 × 200"
    },
    {
        question: "Q11: A = 20 days, B = 30. How many days together?",
        answer: "A: 12 days\nLogic: 1/20 + 1/30 = 1/12"
    },
    {
        question: "Q12: John is taller than Tom. Tom is taller than David. Who is shortest?",
        answer: "A: David\nLogic: Compare hierarchy"
    },
    {
        question: "Q13: SP = ₹100, Profit 25%. Find CP.",
        answer: "A: ₹80\nLogic: CP = SP ÷ 1.25"
    },
    {
        question: "Q14: 40% of 250?",
        answer: "A: 100\nLogic: 40/100 × 250"
    },
    {
        question: "Q15: Divide ₹200 in the ratio 2:3",
        answer: "A: ₹80 and ₹120\nLogic: 2/5 of 200 = 80, 3/5 = 120"
    },
    {
        question: "Q16: How many sides does a pentagon have?",
        answer: "A: 5\nLogic: \"Penta\" means 5"
    },
    {
        question: "Q17: A pen costs ₹50 and is sold for ₹60. Profit %?",
        answer: "A: 20%\nLogic: (10/50) × 100"
    },
    {
        question: "Q18: A = 10 days, B = 15 days. Together?",
        answer: "A: 6 days\nLogic: 1/10 + 1/15 = 1/6"
    },
    {
        question: "Q19: A number increases from 80 to 100. What is % increase?",
        answer: "A: 25%\nLogic: (20/80) × 100"
    },
    {
        question: "Q20: If DOG = 4157, CAT = 3120, then BAT = ?",
        answer: "A: 2120\nLogic: Letter-to-number code"
    },
    {
        question: "Q21: 3:4 :: 6:__",
        answer: "A: 8\nLogic: Multiply both by 2"
    },
    {
        question: "Q22: What comes next: 81, 27, 9, 3, ___",
        answer: "A: 1\nLogic: ÷3 sequence"
    },
    {
        question: "Q23: What comes next: 100, 96, 91, 85, ___",
        answer: "A: 78\nLogic: Subtract 4, 5, 6..."
    },
    {
        question: "Q24: A shopkeeper buys for ₹400 and sells at ₹500. Profit %?",
        answer: "A: 25%\nLogic: (100/400) × 100"
    },
    {
        question: "Q25: Average of 5, 10, 15?",
        answer: "A: 10\nLogic: (5+10+15)/3"
    },
    {
        question: "Q26: Simplify ratio 50:100.",
        answer: "A: 1:2\nLogic: Divide both terms by 50"
    },
    {
        question: "Q27: A = 16 days. Work completed in 4 days?",
        answer: "A: 1/4\nLogic: 4/16"
    },
    {
        question: "Q28: What is 120 increased by 20%?",
        answer: "A: 144\nLogic: 120 + (120 × 0.2)"
    },
    {
        question: "Q29: Speed = 80 km/h, Time = 2.5 hrs. Distance?",
        answer: "A: 200 km\nLogic: Speed × Time"
    },
    {
        question: "Q30: A = 12 hrs, 4 men work. Time?",
        answer: "A: 3 hours\nLogic: 12 ÷ 4"
    },
    {
        question: "Q31: Boys to girls = 3:2, Total = 50. Boys?",
        answer: "A: 30\nLogic: 3/5 of 50"
    },
    {
        question: "Q32: If 5x = 20, x = ?",
        answer: "A: 4\nLogic: Divide both sides by 5"
    },
    {
        question: "Q33: Find average of 4, 6, 8, 10",
        answer: "A: 7\nLogic: (4+6+8+10)/4"
    },
    {
        question: "Q34: Which number doesn’t belong: 2, 4, 6, 9, 8",
        answer: "A: 9\nLogic: Odd one out (others are even)"
    },
    {
        question: "Q35: A batsman scores: 40, 50, 60. What’s the average?",
        answer: "A: 50\nLogic: (40+50+60)/3"
    },
    {
        question: "Q36: A trader loses ₹20 on ₹200. Loss %?",
        answer: "A: 10%\nLogic: 20/200 × 100"
    },
    {
        question: "Q37: A person walks 5 km in 1 hour. How far in 3 hours?",
        answer: "A: 15 km\nLogic: 5 × 3"
    },
    {
        question: "Q38: If today is Wednesday, what day after 10 days?",
        answer: "A: Saturday\nLogic: (10 mod 7) = 3 → Wednesday + 3"
    },
    {
        question: "Q39: Find the smallest prime number.",
        answer: "A: 2\nLogic: First prime number"
    },
    {
        question: "Q40: Total = 4 numbers, Avg = 20. What is sum?",
        answer: "A: 80\nLogic: 4 × 20"
    }
];

// Generate dummy flashcards until 40
while (flashcardsData.length < 40) {
    const i = flashcardsData.length + 1;
    flashcardsData.push({
        question: `Q${i}: Placeholder Question ${i}?`,
        answer: `A${i}: Placeholder Answer ${i}`
    });
}

const container = document.getElementById("flashcardContainer");

function createFlashcards() {
    flashcardsData.forEach((card, index) => {
        const div = document.createElement("div");
        div.className = "flashcard";
        if (index === 0) div.classList.add("active");

        div.innerHTML = `
            <div class="front">${card.question}</div>
            <div class="back">${card.answer.replace(/\n/g, "<br>")}</div>
        `;
        container.appendChild(div);
    });
}

function showCard(index) {
    const cards = document.querySelectorAll(".flashcard");
    cards.forEach((card, i) => {
        card.classList.remove("active");
        card.style.display = i === index ? "block" : "none";
        if (quizToggle.checked) {
            card.classList.remove("flip");
        }
    });
    document.getElementById("cardCounter").textContent = `${index + 1} / ${cards.length}`;
    answerInput.value = "";

    if (quizToggle.checked) {
        checkAnswerBtn.style.display = "inline-block";
    } else {
        checkAnswerBtn.style.display = "none";
    }
}

function showNext() {
    const currentFlashcardElement = document.querySelectorAll(".flashcard")[currentCardIndex];
    if (quizToggle.checked && !currentFlashcardElement.classList.contains("flip")) {
        alert("Please answer the current card or use 'Check Answer' before moving to the next card.");
        return;
    }

    if (currentCardIndex < flashcardsData.length - 1) {
        currentCardIndex++;
        showCard(currentCardIndex);
    }
}

function showPrev() {
    const currentFlashcardElement = document.querySelectorAll(".flashcard")[currentCardIndex];
    if (quizToggle.checked && !currentFlashcardElement.classList.contains("flip")) {
        alert("Please answer the current card or use 'Check Answer' before moving to the previous card.");
        return;
    }

    if (currentCardIndex > 0) {
        currentCardIndex--;
        showCard(currentCardIndex);
    }
}

function checkTypedAnswer() {
    const typed = answerInput.value.trim().toLowerCase();
    const actual = flashcardsData[currentCardIndex].answer.toLowerCase();
    const currentFlashcardElement = document.querySelectorAll(".flashcard")[currentCardIndex];

    const actualAnswerText = actual.split('\n')[0].replace('a: ', '').trim();

    if (typed === actualAnswerText && typed.length > 0) {
        alert("✅ Correct!");
        if (quizToggle.checked) {
            currentFlashcardElement.classList.add("flip");
            checkAnswerBtn.style.display = "none";
        }
    } else {
        alert("❌ Try again!");
        if (quizToggle.checked) {
            checkAnswerBtn.style.display = "inline-block";
        }
    }
}

function revealAnswer() {
    const currentFlashcardElement = document.querySelectorAll(".flashcard")[currentCardIndex];
    currentFlashcardElement.classList.add("flip");
    checkAnswerBtn.style.display = "none";
}

// Timer Functions
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    secondsElapsed = 0; // Reset seconds
    timerDisplay.textContent = "00:00"; // Reset display

    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const remainingSeconds = secondsElapsed % 60;
        timerDisplay.textContent =
            `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000); // Update every second
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Enable/Disable Quiz Mode - Modified to include timer logic
quizToggle.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("quiz-mode");
        modeToggleContainer.style.display = "none"; // Hide the mode toggle container
        currentCardIndex = 0; // Reset to first card
        showCard(currentCardIndex); // Update the display
        document.getElementById("typedAnswer").value = ""; // Clear answer input
        checkAnswerBtn.style.display = "inline-block"; // Show "Check Answer" button
        startTimer(); // Start the timer when quiz mode is enabled
    } else {
        document.body.classList.remove("quiz-mode");
        modeToggleContainer.style.display = "block"; // Show the mode toggle container
        checkAnswerBtn.style.display = "none"; // Hide "Check Answer" button
        const cards = document.querySelectorAll(".flashcard");
        cards.forEach(card => card.classList.remove("flip")); // Ensure all cards are unflipped
        stopTimer(); // Stop the timer when quiz mode is disabled
        timerDisplay.textContent = "00:00"; // Optionally reset timer display
    }
});

function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
}

// Initialize
createFlashcards();
showCard(0);


// Note: The previous navigation button event listeners at the bottom of your original JS file
// were interfering with the showNext/showPrev functions' new logic.
// I've moved the prevention logic directly into showNext() and showPrev() and removed
// the redundant event listeners at the end of the file.
// If you want custom behavior for these buttons beyond what showNext/showPrev does,
// you'd re-add them and ensure they call showNext/showPrev.


