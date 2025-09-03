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
    question: "Q1: What is Artificial Intelligence (AI)?",
     answer: "A: AI is the science of making machines perform tasks that normally need human intelligence. <br> It helps machines reason, learn, and solve problems.\n Simulates human thinking and behavior.\n Used in apps, games, and smart devices.\n Includes decision-making, language understanding.\n Can be rule-based or data-driven. \n " 
  },
  { 
    question: "Q2: What are the types of AI?",
     answer: "A: AI is classified into Narrow AI, General AI, and Super AI .They show how much intelligence a machine can perform. \n Narrow AI: Task-specific (e.g., voice assistants). \n General AI: Human-like thinking (still theoretical). \n Super AI: Smarter than humans (not yet real). \n Most AI today is Narrow AI. \n" 
  },
  { 
    question: "Q3:What is the goal of AI?",
     answer: "A: The main goal of AI is to create smart systems that can think and act like humans. It aims to improve human life by automating intelligent tasks. \n Solve complex problems faster. \n Understand and use language. \n Make accurate decisions. \n Mimic human actions logically."

  },
  { 
    question: "Q4: What is an intelligent agent?",
     answer: "A: An intelligent agent senses its environment and takes action to reach a goal. It can be a program, robot, or device. \n Examples: smart speakers, search bots. \n Can act independently or with help. \n Follows rules or learns over time. \n Makes decisions based on inputs." 
  },
{ 
    question: "Q5: What is Natural Language Processing (NLP)?",
     answer: "A:NLP allows computers to understand and respond in human language.It helps in communication between people and machines. \n Used in chatbots and translation apps. \n Includes text analysis and speech recognition. \n Helps extract meaning from language. \n Bridges humans and machines." 
  },
  { 
    question: "Q6:What is a chatbot?",
     answer: "A: A chatbot is an AI program that simulates conversation with users.It can answer questions and perform tasks. \n Works via text or voice. \n Used in customer support, websites. \n Can be simple or AI-powered. \n Uses predefined rules or NLP." 
  },
  {
    question: "Q7: What is a knowledge base?",
    answer: "A: A knowledge base stores facts and rules for AI systems to use.It helps the AI solve problems and make decisions. \n Core part of expert systems. \n Includes structured data and logic. \n Helps machines understand a topic. \n Works with inference engines."

  },
  {
    question: "Q8: What is an expert system?",
    answer: "A: An expert system mimics a human expert’s decisions in a specific field.It uses a knowledge base and rules. \n Used in medicine, law, and engineering. \n Doesn’t learn—rules must be updated. \n Solves problems using logic. \n Provides human-like advice."
  },
  {
    question: "Q9: What is fuzzy logic?",
    answer: "A: Fuzzy logic deals with imprecise or uncertain data using degrees of truth.It helps AI systems handle maybe answers. \n Truth values range from 0 to 1. \n Used in appliances like ACs and washing machines. \n Mimics human reasoning. \n Good for control systems."
  },
{
    question: "Q10: What is computer vision?",
    answer: "A: Computer vision allows machines to “see” and understand images or videos.It enables tasks like object detection and facial recognition. \n Used in security, robotics, and healthcare. \n Helps in image analysis and tracking. \n Involves pattern and shape recognition. \n Often uses neural networks."
  },
  {
    question: "Q11: What is knowledge representation in AI?",
    answer: "A: Knowledge representation is how AI stores and organizes facts about the world.It helps machines understand and reason about information. \n Types: semantic networks, frames, ontologies. \n Enables inference and decision-making. \n Represents objects, events, and rules. \n Crucial for natural language understanding."
  },
  {
    question: "Q12: What is an inference engine?",
    answer: "A: An inference engine applies logic to known facts to draw new conclusions.It works with a knowledge base to solve problems. \n Used in expert systems. \n Can use forward or backward chaining. \n Makes decisions automatically. \n Core of rule-based reasoning."
  },
  {
    question: "Q13: What is forward chaining in AI?",
    answer: "A: Forward chaining starts from known facts and applies rules to find conclusions. \n It moves from cause to effect. \n Data-driven approach.  Continues until goal is reached. \n Used in production systems. \n Efficient for known starting points."
  },
  {
    question: "Q14: What is backward chaining in AI?",
    answer: "A: Backward chaining starts with a goal and works backward to find facts.It tries to prove the goal using existing rules. \n Goal-driven reasoning.\n Common in diagnostic tools.\n Efficient when goals are clear. \n May require multiple steps of logic."
  },
 {
    question: "Q15: What is a semantic network?",
    answer: "A:A semantic network is a graph showing relationships between concepts.It visually connects objects through labeled links.\nNodes = concepts; links = relationships.\nExample: “Cat is-an Animal”.\nHelps in reasoning and language processing.\nEasy to visualize knowledge."
  },
  {
    question: "Q16: What is a frame in AI?",
    answer: "A: 5\nLogic: \"Penta\" means 5"
  },
  {
    question: "Q17: What is ontology in AI?",
    answer: "A: A frame is a structure for representing stereotyped situations or objects.It includes attributes and values.\nLike a data template.\nCan include default values.\nSupports inheritance from other frames.\nUseful in NLP and vision systems."
  },
  {
    question: "Q18: What is problem-solving in AI?",
    answer: "A: AI problem-solving involves finding a sequence of actions to reach a goal.It requires understanding the problem and choosing the right method.\n Involves state-space and goal analysis.\nUses search, logic, and heuristics.\nBreaks complex problems into smaller ones.\nApplied in puzzles, robotics, games."
  },
  {
    question: "Q19: What is a search algorithm in AI?",
    answer: "A: Search algorithms help AI find paths to reach goals.They explore possibilities and select the best solution.\nBlind search: BFS, DFS.\nInformed search: A*, Greedy.\nBased on problem space and heuristics.\nKey for decision-making tasks."
  },
  {
    question: "Q20: What is heuristic search in AI?",
    answer: "A: Heuristic search uses rules of thumb to speed up problem-solving.It estimates which option will lead to a better result.\nFaster than blind search.\nDoesn’t guarantee the best answer.\nCommon in games and puzzles.\nNeeds a good heuristic function."
  },
{
    question: "Q21: What is A * search algorithm?",
    answer: "A: A* search combines path cost and heuristic to find the shortest path.It’s optimal and complete if the heuristic is accurate.\nUses f(n) = g(n) + h(n).\ng(n): cost so far, h(n): estimated cost.\nUsed in maps and games.\nFast and reliable for complex problems."
  },
  {
    question: "Q22: What is Minimax algorithm in AI?",
    answer: "A:Minimax is used in 2-player games to choose the best move.It assumes both players play optimally.\nMaximizes your score, minimizes opponent’s.\nWorks with game trees.\nOften used with alpha-beta pruning.\nHelps AI play strategic games like Chess."
  },
  {
    question: "Q23: What is alpha-beta pruning?",
    answer: "A: Alpha-beta pruning improves Minimax by cutting off unnecessary branches.It avoids checking moves that won’t affect the result.\nSpeeds up game decision-making.\nReduces the number of nodes evaluated.\nAlpha = best for max; Beta = best for min.\nDoesn’t change final result, just faster."
  },
  {
    question: "Q24: What is adversarial search in AI?",
    answer: "A: Adversarial search deals with problems involving competition between agents.\n Each player tries to win or minimize loss.\nUsed in 2-player games.\nModels conflict and strategy.\n Involves opponent modeling.\nRequires planning and prediction."
  },
  {
    question: "Q25: What is planning in AI?",
    answer: "A: Planning is the process of generating a sequence of actions to achieve a goal.\nAI must consider actions, preconditions, and effects.\nInvolves operators and state transitions.\nTools: STRIPS, PDDL.\nUsed in robotics, games, logistics.\nNeeds time, resources, and constraints."
  },
 {
    question: "Q26: What is state space in AI?",
    answer: "A:State space is the set of all possible situations in a problem.AI explores it to find the path to a goal.\nRepresented as a graph or tree.\nEach node = a state, edges = actions.\n Used in search algorithms.\nHelps in planning and reasoning."
  },
  {
    question: "Q27: What is the difference between strong AI and weak AI?",
    answer: "A: Weak AI is designed for specific tasks; strong AI would fully mimic human minds.\nStrong AI is still theoretical and not yet achieved.\nWeak AI: Chatbots, assistants.\n Strong AI: General, conscious thinking. \n Weak AI is narrow and practical. \n Strong AI aims for full intelligence."
  },
  {
    question: "Q28: What is the role of perception in AI?",
    answer: "A: Perception allows AI to collect and interpret data from the environment.It uses sensors like cameras, microphones, and touch. \n Used in robotics and smart cars. \n Involves image, speech, or signal processing. \n Helps AI sense surroundings. \n Supports action and navigation."
  },
  {
    question: "Q29: What is multi-agent system in AI?",
    answer: "A: A multi-agent system includes multiple intelligent agents working together.They may cooperate, compete, or coordinate. \n Used in simulations and traffic systems. \n Can be distributed or centralized.\n Agents may be simple or complex. \n Communicate to solve shared problems."
  },
  {
    question: "Q30: What is uncertainty in AI?",
    answer: "A: Uncertainty means the AI doesn't have complete or perfect knowledge.It must make the best possible decision with limited data. \n Happens due to noisy data or incomplete facts. \n Handled by fuzzy logic, probability, etc. \n Affects real-world AI like weather or medicine. \n Important in risk-aware systems."
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


