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
    question: "Q1:What is an operating system? ", answer: "A:An operating system is system software that manages hardware and software resources and provides services for computer programs." 
  },
  { 
    question: "Q2: Name some popular operating systems.", answer: "A:Windows, Linux, macOS, Android, iOS." 
  },
  { 
    question: "Q3: What are the main functions of an operating system? ", answer: "A:Process management, memory management, file system management, device management, and security." 
  },
  { 
    question: "Q4: What is a batch operating system?", answer: "A: A batch OS executes batches of jobs without manual intervention." 
  },
  { 
    question: "Q5: What is a real-time operating system (RTOS)?", answer: "A:An RTOS processes data and events within a guaranteed time frame, often used in embedded systems." 
  },
  { 
    question: "Q6:What is the difference between multitasking and multiprocessing? " , answer:"A:Multitasking handles multiple tasks with a single CPU; multiprocessing uses multiple CPUs for tasks."
  },
  {
    question: "Q7:What is a process?",
    answer: "A:A process is a program in execution."
  },
  {
    question: "Q8: What are the states of a process?",
    answer: "A: New, Ready, Running, Waiting, Terminated."
  },
  {
    question: "Q9:  What is a process control block (PCB)?",
    answer: "A: PCB is a data structure used by the OS to store information about a process."
  },
  {
    question: "Q10: What is virtual memory? ",
    answer: "A:Virtual memory uses disk space as an extension of RAM, allowing more programs to run simultaneously."
  },
  {
    question: "Q11:What is paging? ",
    answer: "A:Paging divides memory into fixed-size pages and helps manage virtual memory."
  },
  {
    question: "Q12: What is fragmentation? ",
    answer: "A: Fragmentation is the inefficient use of memory, either internal (unused space inside allocated memory) or external (scattered free space)."
  },
  {
    question: "Q13:What is CPU scheduling? ",
    answer: "A: CPU scheduling selects processes from the ready queue for execution."
  },
  {
    question: "Q14:Name some CPU scheduling algorithms. ",
    answer: "A:FCFS, SJF, Round Robin, Priority Scheduling."
  },
  {
    question: "Q15:What is the difference between a process and a thread?",
    answer: "A: A process is independent, while threads share resources within the same process."
  },
  {
    question: "Q16: What is a file system? ",
    answer: "A:A file system organizes and stores data on storage devices. "
  },
  {
    question: "Q17: What is a device driver?",
    answer: "A: A device driver is software that allows the OS to communicate with hardware devices."
  },
  {
    question: "Q18:What is a deadlock? ",
    answer: "A: A deadlock occurs when two or more processes wait indefinitely for resources held by each other."
  },
  {
    question: "Q19:How can deadlocks be avoided?",
    answer: "A:Deadlocks can be avoided using resource allocation strategies like the Banker’s Algorithm "
  },
  {
    question: "Q20:What is user authentication? ",
    answer: "A: User authentication verifies the identity of a user before granting access."
  },
  {
    question: "Q21: What is real-time scheduling?",
    answer: "A: Scheduling that guarantees tasks meet deadlines, used in RTOS."
  },
  {
    question: "Q22:What is the difference between paging and swapping? ",
    answer: "A:Paging swaps pages, while swapping moves entire processes between memory and disk. "
  },
  {
    question: "Q23: What is the difference between network OS and distributed OS?",
    answer: "A:A network OS connects computers but manages them separately, while a distributed OS integrates them. "
  },
  {
    question: "Q24:What is SELinux?",
    answer: "A:Security-Enhanced Linux is a Linux security module enforcing access control policies."
  },
  {
    question: "Q25:What is a buffer overflow attack in OS ?",
    answer: "A:An attack where data overflows a buffer and overwrites adjacent memory, causing security issues."
  },
  {
    question: "Q26:What are OS protection mechanisms? ",
    answer: "A: Mechanisms like user authentication, access control, and encryption protect system resources."
  },
  {
    question: "Q27:What is a hypervisor? ",
    answer: "A:A hypervisor is software that creates and manages virtual machines. "
  },
  {
    question: "Q28:What is containerization (e.g., Docker) in OS?",
    answer: "A: Containers isolate applications with shared OS kernel, unlike full virtualization."
  },
  {
    question: "Q29:What is virtualization in OS? ",
    answer: "A: Virtualization allows multiple OS instances to run on a single hardware using hypervisors."
  },
  {
    question: "Q30:What are the four conditions of deadlock?",
    answer: "A:Mutual exclusion, hold & wait, no preemption, circular wait."
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




