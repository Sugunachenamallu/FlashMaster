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
  { 
    question: "Q1: What comes next: A, C, E, G, ?", answer: "A: I\nLogic:  +2 pattern in alphabet (A→C→E→G→I)" 
  },
  { 
    question: "Q2: What comes next: Z, X, V, T, ?", answer: "A: R\nLogic:-2 pattern in reverse alphabets" 
  },
  { 
    question: "Q3: Find the 10th letter from the left in English alphabet.", answer: "A:  J\nLogic: A=1, J=10" 
  },
  { 
    question: "Q4: If A=1, Z=?", answer: "A:26\nLogic:  Total 26 alphabets" 
  },
  { 
    question: "Q5: What comes next: D, F, I, M, ?.", answer: "A: R\nLogic:+2, +3, +4, +5 steps → M + 6 = R " 
  },
  { 
    question: "Q6:What comes next: 2, 4, 8, 16, ?", answer: "A: 32\nLogic:×2 each time " 
  },
  {
    question: "Q7:1, 3, 6, 10, 15, ? ",
    answer: "A:21 \nLogic: Add 2,3,4,5,6 → next is +6 = 21"
  },
  {
    question: "Q8:  10, 7, 4, 1, ?",
    answer: "A: 2\nLogic:-3 each time "
  },
  {
    question: "Q9: 5, 25, 125, ?.",
    answer: "A:625 \nLogic: ×5 each time"
  },
  {
    question: "Q10: 100, 81, 64, 49, ?",
    answer: "A:36 \nLogic:Squares: 10², 9², 8²… → next = 6²"
  },
  {
    question: "Q11:  If CAT = DBU, then DOG = ?",
    answer: "A: EPH \nLogic:+1 to each letter"
  },
  {
    question: "Q12:  If BALL = YZOO, then CALL = ?",
    answer: "A: BZOO\nLogic: B→Y (reverse), A→Z, L→O"
  },
  {
    question: "Q13:If ACE = 135, then BDF = ?",
    answer: "A:246 \nLogic:A=1, C=3, E=5 → BDF = 2,4,6 "
  },
  {
    question: "Q14:If READ = SFBH, then WRITE = ? ",
    answer: "A:XSJUF \nLogic:+1 to each letter "
  },
  {
    question: "Q15:If P=16, E=5, N=14, what is PEN?",
    answer: "A:16 + 5 + 14 = 35 \nLogic: 16 + 5 + 14 = 35"
  },
  {
    question: "Q16:  Cat : Kitten :: Dog : ?",
    answer: "A:Puppy \nLogic:Young one of dog is puppy"
  },
  {
    question: "Q17:Tree : Forest :: Star : ? ",
    answer: "A: Galaxy\nLogic: Collection relation "
  },
  {
    question: "Q18: Fish : Water :: Bird : ? ",
    answer: "A:Air \nLogic:Natural habitat "
  },
  {
    question: "Q19:Eye : See :: Ear : ? ",
    answer: "A:Hear \nLogic:  Function analogy"
  },
  {
    question: "Q20: Pen : Write :: Knife : ? ",
    answer: "A:Cut \nLogic:Tool to purpose"
  },
  {
    question: "Q21:Apple, Banana, Mango, Carrot ",
    answer: "A: Carrot \nLogic:It’s a vegetable; others are fruits "
  },
  {
    question: "Q22:2, 4, 6, 9, 8 ",
    answer: "A: 9\nLogic: All are even except 9"
  },
  {
    question: "Q23:  Square, Triangle, Rhombus, Rectangle",
    answer: "A: Traingle\nLogic:Only one with 3 sides"
  },
  {
    question: "Q24:Rose, Lily, Lotus, Mango ",
    answer: "A: Mango\nLogic: It's a fruit; others are flowers"
  },
  {
    question: "Q25: January, March, June, July",
    answer: "A:June \nLogic:Only month with 4 letters "
  },
  {
    question: "Q26: If you face north, turn right, then left, which direction now? ",
    answer: "A: East\nLogic: North → Right = East → Left = North "
  },
  {
    question: "Q27:  A is B’s daughter. B is C’s wife. How is C related to A?",
    answer: "A: Father \nLogic: C is B’s husband and A is their daughter"
  },
  {
    question: "Q28:Ram is facing south. He turns right, then right again. What is his final direction?",
    answer: "A:North \nLogic:South → Right = West → Right = North"
  },
  {
    question: "Q29:Rani is the sister of Raja. Raja is the son of Radha. How is Radha related to Rani?",
    answer: "A: Mother \nLogic:Rani and Raja are siblings; Raja is Radha’s son → so Rani is daughter of Radha "
  },
  {
    question: "Q30: You walk 5 km north, then 3 km east. How far are you from starting point?",
    answer: "A:√(5² + 3²) = √34 ≈ 5.83 km \nLogic:Use Pythagoras theorem "
  },
  {
    question:"Q31:Four children are standing in a line: P is behind Q, R is ahead of S, Q is ahead of R. Who is last?",
    answer:"A:P\nLogic:Order is Q → R → S → P."
  },
   {
    question:"Q32:Which letter is 4th to the right of the 8th letter from the left in the alphabet?",
    answer:"A:M\nLogic:8th letter = H. 4th to the right = L? Wait check: H (8th) → I(9), J(10), K(11), L(12). Answer: L."
  },
   {
    question:"Q33:A clock shows 3:15. What is the angle between the hour and minute hand?",
    answer:"A:7.5°\nLogic:Hour hand = (3×30)+15×0.5 = 97.5°, Minute hand = 15×6 = 90°. Difference = 7.5°."
  },
  {
    question:"Q34:If MANGO is coded as NBOHP, how is APPLE coded?",
    answer:"A:BQQMF\nLogic:Each letter is shifted by +1 (A→B, P→Q, L→M, E→F)."
  },
   {
    question:"Q35:Pointing to a man, Riya said, “He is the brother of my grandfather’s only son.” Who is the man?",
    answer:"A: Riya’s uncle\nLogic:Grandfather’s only son is Riya’s father → his brother = uncle."
  },
   {
    question:"Q36:If P’s age is twice Q’s, and Q’s age is 4 less than R’s age, find R’s age if P is 20.",
    answer:"A:12\nLogic: P=2Q → 20=2Q → Q=10 → R=Q+4=14? Wait → 10+4=14 → Correct answer = 14."
  },
   {
    question:"Q37:In a row of 30 students, A is 12th from the left. What is his position from the right?",
    answer:"A:19th\nLogic: Total+1 - left position = 30+1-12=19."
  },
   {
    question:"Q38:A clock shows 5:20. What is the angle between the hands?",
    answer:"A:20°\nLogic: Hour hand = (5×30)+(20×0.5)=160°, minute hand =20×6=120°. Difference = 40°? Wait → 160-120=40°. Answer: 40°."
  },
   {
    question:"Q39:Which letter is 6th to the right of the 12th from the left in the alphabet?",
    answer:"A:R\nLogic:12th = L, 6th right = R."
  },
  {
    question:"Q40:A is older than B, C is younger than A, D is older than C but younger than B. Who is youngest?",
    answer:"A:C\nLogic: Order: A>B>D>C ⇒ C youngest."
  },
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







