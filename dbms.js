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
    question: "Q1: What is DBMS?", 
    answer: "A: DBMS (Database Management System) is software that manages data and provides functions like storage, retrieval, manipulation, and security." 
  },
  { 
    question: "Q2:  What is a database?", 
    answer: "A: A database is an organized collection of data that can be easily accessed, managed, and updated." 
  },
  { 
    question: "Q3: : What is SQL?",
    answer: "A: SQL (Structured Query Language) is used to communicate with and manage databases." 
  },
  { 
    question: "Q4: What is a primary key?",
    answer: "A: A primary key uniquely identifies each record in a table and cannot have NULL or duplicate values." 
  },
  { 
    question: "Q5: What is a foreign key?",
    answer: "A: A foreign key is a field in one table that refers to the primary key of another table." 
  },
  { 
    question: "Q6: What is normalization?",
     answer: "A: Normalization is the process of organizing data to reduce redundancy and improve integrity." 
  },
  {
    question: "Q7: What is a table in DBMS?",
    answer: "A: A table is a collection of related data entries organized in rows and columns."
  },
  {
    question: "Q8: What are the types of DBMS?",
    answer: "A: Hierarchical, Network, Relational, and Object-oriented DBMS."
  },
  {
    question: "Q9: What is a query?",
    answer: "A: A query is a request to retrieve or manipulate data from a database."
  },
  {
    question: "Q10: What is a schema?",
    answer: "A: A schema is the logical structure of a database, including tables, fields, and relationships."
  },
  {
    question: "Q11: What is a view?",
    answer: "A: A view is a virtual table created by querying one or more tables."
  },
  {
    question: "Q12: What is a transaction?",
    answer: "A: A transaction is a sequence of operations performed as a single logical unit of work."
  },
  {
    question: "Q13: What is ACID in DBMS?",
    answer: "A: Atomicity, Consistency, Isolation, Durability – properties ensuring reliable transactions."
  },
  {
    question: "Q14: What is DDL?",
    answer: "A: Data Definition Language – commands like CREATE, ALTER, DROP."
  },
  {
    question: "Q15: What is DML?",
    answer: "A: Data Manipulation Language – commands like SELECT, INSERT, UPDATE, DELETE."
  },
  {
    question: "Q16: What are the different normal forms?",
    answer: "A: 1NF, 2NF, 3NF, BCNF, 4NF, 5NF – each reducing redundancy progressively."
  },
  {
    question: "Q17: What is denormalization?",
    answer: "A: The process of combining tables to improve read performance, at the cost of redundancy."
  },
  {
    question: "Q18: What is an index in DBMS?",
    answer: "A: A data structure that improves the speed of data retrieval operations."
  },
  {
    question: "Q19: What is the difference between clustered and non-clustered indexes?",
    answer: "A: Clustered index sorts and stores data rows in order, while non-clustered does not affect data order."
  },
  {
    question: "Q20: What is the difference between DELETE and TRUNCATE?",
    answer: "A: DELETE removes specific rows with a WHERE clause; TRUNCATE removes all rows and resets identity."
  },
  {
    question: "Q21: What is a stored procedure?",
    answer: "A: A stored SQL code that can be reused and executed with parameters."
  },
  {
    question: "Q22: What is a trigger?",
    answer: "A: A set of instructions that automatically executes in response to certain events (INSERT, UPDATE, DELETE)."
  },
  {
    question: "Q23: What is a cursor?",
    answer: "A: A database object used to retrieve, manipulate, and navigate through result sets row by row."
  },
  {
    question: "Q24: Explain ER Model?",
    answer: "A: Entity-Relationship Model describes the structure of a database using entities, attributes, and relationships."
  },
  {
    question: "Q25: Difference between DBMS and RDBMS?",
    answer: "A: RDBMS supports relationships and enforces data integrity, DBMS may not."
  },
  {
    question: "Q26: What is a candidate key?",
    answer: "A: A field or combination of fields that can uniquely identify a record; one is chosen as primary."
  },
  {
    question: "Q27: What is a composite key?",
    answer: "A: A key made up of two or more fields to uniquely identify a record"
  },
  {
    question: "Q28: What is referential integrity?",
    answer: "A: Ensures that foreign keys correctly reference primary keys."
  },
  {
    question: "Q29: What is a subquery?",
    answer: "A:  A query nested inside another SQL query."
  },
  {
    question: "Q30: What is a join? Name its types.",
    answer: "A: A JOIN combines rows from two or more tables. Types: INNER, LEFT, RIGHT, FULL, CROSS."
  },
  {
    question: "Q31: What is a Cartesian Join?",
    answer: "A: A join that returns the Cartesian product of two tables."
  },
  {
    question: "Q32: What is the difference between UNION and UNION ALL?",
    answer: "A: UNION removes duplicates; UNION ALL includes them."
  },
  {
    question: "Q33: What is the use of GROUP BY clause?",
    answer: "A: It groups rows that have the same values in specified columns and aggregates results."
  },
  {
    question: "Q34: What is a transaction log?",
    answer: "A: A log that records all transactions and changes to the database."
  },
  {
    question: "Q35: What is concurrency control?",
    answer: "A: Techniques to manage simultaneous operations without conflicting."
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
