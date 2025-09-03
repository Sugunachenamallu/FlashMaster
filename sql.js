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
    question: "Q1: What is SQL?", 
    answer: "A: SQL (Structured Query Language) is a standard language used to communicate with and manage data in relational databases. It allows users to query, insert, update, and delete data." 
  },
  { 
    question: "Q2: What are the different types of SQL statements?", 
    answer: "A: DDL (Data Definition Language): CREATE, ALTER, DROP\nDML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE\nDCL (Data Control Language): GRANT, REVOKE\nTCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT" 
  },
  { 
    question: "Q3: What is a Primary Key?", 
    answer: "A: A primary key uniquely identifies each row in a table. It cannot contain NULL values and must be unique across the table." 
  },
  { 
    question: "Q4: What is the difference between WHERE and HAVING?", 
    answer: "A: WHERE filters rows before grouping (used with raw data).\nHAVING filters rows after grouping (used with GROUP BY)." 
  },
  { 
    question: "Q5: What is a foreign key?",
     answer: "A: A foreign key is a field in one table that refers to the primary key in another table, creating a relationship between the two tables." 
  },
  { 
    question: "Q6: What is normalization?", 
    answer: "A: Normalization is the process of organizing database columns and tables to reduce redundancy and improve data integrity. It usually involves splitting large tables into smaller related ones." 
  },
  {
    question: "Q7: What is a JOIN in SQL? Name its types.",
    answer: "A: A JOIN combines rows from two or more tables based on a related column.\nTypes:\nINNER JOIN\nLEFT JOIN\nRIGHT JOIN\nFULL OUTER JOIN\nCROSS JOIN"
  },
  {
    question: "Q8: What are indexes in SQL?",
    answer: "A: Indexes are data structures that improve the speed of data retrieval. They work like a book index, allowing quick lookups by column value."
  },
  {
    question: "Q9: What is the difference between DELETE and TRUNCATE?",
    answer: "A: DELETE: Removes rows with a WHERE clause, can be rolled back.\nTRUNCATE: Removes all rows from a table quickly, cannot be rolled back in some systems."
  },
  {
    question: "Q10: What is a view in SQL?",
    answer: "A: A view is a virtual table based on a SQL query. It does not store data itself but shows data from one or more tables dynamically."
  },
  {
    question: "Q11: What are window functions in SQL?",
    answer: "A: Window functions perform calculations across a set of rows related to the current row. Examples include ROW_NUMBER(), RANK(), LEAD(), LAG(), and SUM() OVER(...)."
  },
  {
    question: "Q12: What is the difference between UNION and UNION ALL?",
    answer: "A: UNION: Combines results and removes duplicates.\nUNION ALL: Combines results and keeps duplicates."
  },
  {
    question: "Q13: Explain ACID properties in databases.",
    answer: "A: Atomicity: All operations in a transaction succeed or none do.\nConsistency: Maintains valid state before and after a transaction.\nIsolation: Concurrent transactions don't interfere.\nDurability: Committed data is saved permanently."
  },
  {
    question: "Q14: What is a correlated subquery?",
    answer: "A: A correlated subquery uses values from the outer query. It runs once per row of the outer query."
  },
  {
    question: "Q15: What is the difference between clustered and non-clustered indexes?",
    answer: "A: Clustered index: Determines the physical order of data in the table (only one per table).\nNon-clustered index: Stores a pointer to the data location (can have many per table)."
  },
  {
    question: "Q16: What is a table in SQL?",
    answer: "A: A table is a collection of related data organized in rows and columns in a relational database."
  },
  {
    question: "Q17: What is the difference between CHAR and VARCHAR?",
    answer: "A: * CHAR(n) stores fixed-length strings of n characters.\n* VARCHAR(n) stores variable-length strings up to n characters, using less space."
  },
  {
    question: "Q18: What does the SELECT statement do?",
    answer: "A: It retrieves data from one or more tables."
  },
  {
    question: "Q19: What is the default sorting order of ORDER BY?",
    answer: "A: Ascending (ASC) is the default sorting order."
  },
  {
    question: "Q20: What is the use of the LIMIT clause?",
    answer: "A: LIMIT restricts the number of rows returned by a query."
  },
  {
    question: "Q21: Can a table have multiple primary keys?",
    answer: "A: No. A table can only have one primary key, though it can consist of multiple columns (composite key)."
  },
  {
    question: "Q22: What is NULL in SQL?",
    answer: "A: NULL represents a missing, unknown, or undefined value. It's not zero or an empty string."
  },
  {
    question: "Q23: What does DISTINCT do in a SELECT statement?",
    answer: "A: It removes duplicate rows from the result set."
  },
  {
    question: "Q24: What is a constraint in SQL?",
    answer: "A: A constraint enforces rules on the data in a table (e.g., NOT NULL, UNIQUE, CHECK, PRIMARY KEY, FOREIGN KEY)."
  },
  {
    question: "Q25: What is the purpose of the DEFAULT keyword?",
    answer: "A: It sets a default value for a column if no value is provided during insertion."
  },
  {
    question: "Q26: What is the difference between INNER JOIN and OUTER JOIN?",
    answer: "A: * INNER JOIN returns matching rows between tables.\n* OUTER JOIN includes matching and non-matching rows (LEFT, RIGHT, or FULL)."
  },
  {
    question: "Q27: What is a composite key?",
    answer: "A: A primary key that consists of two or more columns."
  },
  {
    question: "Q28: What is the difference between a view and a table?",
    answer: "A: A table physically stores data. A view is a virtual table created from a query and does not store data."
  },
  {
    question: "Q29: What is a trigger in SQL?",
    answer: "A: A trigger is a set of instructions that automatically executes in response to certain events (e.g., INSERT, UPDATE, DELETE)."
  },
  {
    question: "Q30: What is a stored procedure?",
    answer: "A: A stored procedure is a precompiled group of SQL statements stored in the database that can be executed repeatedly."
  },
  {
    question: "Q31: Can a table have more than one foreign key?",
    answer: "A: Yes. A table can have multiple foreign keys referencing different tables."
  },
  {
    question: "Q32: What is the difference between RANK() and DENSE\_RANK()?",
    answer: "A: * RANK() skips ranks for ties (e.g., 1, 2, 2, 4).\n* DENSE_RANK() doesn’t skip ranks (e.g., 1, 2, 2, 3)."
  },
  {
    question: "Q33: What is an alias in SQL?",
    answer: "A: An alias is a temporary name given to a table or column, using the AS keyword."
  },
  {
    question: "Q34: What is the difference between DROP, DELETE, and TRUNCATE?",
    answer: "A: * DELETE: Removes rows, can use WHERE.\n* TRUNCATE: Removes all rows, cannot be rolled back in some DBs.\n* DROP: Deletes the entire table structure and data."
  },
  {
    question: "Q35: What is a schema in SQL?",
    answer: "A: A schema is a collection of database objects (tables, views, procedures) grouped logically under a single name."
  },
  {
    question: "Q36: What is denormalization?",
    answer: "A: Denormalization is the process of combining tables to reduce joins and improve read performance at the cost of redundancy."
  },
  {
    question: "Q37: What are CTEs (Common Table Expressions)",
    answer: "A: CTEs are temporary result sets defined using WITH, which can be referenced in a SELECT, INSERT, UPDATE, or DELETE query."
  },
  {
    question: "Q38: What is a materialized view?",
    answer: "A: Unlike a normal view, a materialized view stores the result set physically and must be refreshed to reflect updated data."
  },
  {
    question: "Q39: How does indexing improve performance?",
    answer: "A: Indexes allow the database to find data faster without scanning every row, especially helpful in WHERE, JOIN, and ORDER BY clauses."
  },
  {
    question: "Q40: What is referential integrity?",
    answer: "A: Referential integrity ensures that a foreign key value always points to an existing, valid row in another table, preventing orphan records."
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
