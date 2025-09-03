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
    question: "Q1: What is Machine Learning (ML)? ", answer: "A:  ML is a subset of AI that enables systems to learn patterns from data and improve their performance without being explicitly programmed." 
  },
  { 
    question: "Q2:What are the types of Machine Learning? ",
     answer: "A: 1.Supervised Learning \n2. Unsupervised Learning \n 3.Reinforcement Learning."
  },
  { 
    question: "Q3:What is overfitting?", answer: "A:When a model learns training data too well (including noise), it performs poorly on unseen data." 
  },
  { 
    question: "Q4:What is underfitting?", answer: "A: When a model is too simple to capture the patterns in data, leading to poor performance on training and test data." 
  },
  { 
    question: "Q5:What is a confusion matrix? ", answer: "A:A table used to evaluate classification models by showing true positives, false positives, true negatives, and false negatives. " 
  },
  { 
    question: "Q6:What is bias-variance tradeoff?", answer: "A:Balancing between model complexity (variance) and simplicity (bias) to achieve good generalization. " 
  },
  {
    question: "Q7:What is cross-validation? ",
    answer: "A:A technique to split the dataset into multiple training/testing sets to ensure model generalization."
  },
  {
    question: "Q8:What is the purpose of regularization? ",
    answer: "A:To reduce overfitting by adding a penalty to large coefficients (L1 - Lasso, L2 - Ridge). "
  },
  {
    question: "Q9:What is PCA (Principal Component Analysis)?",
    answer: "A: A dimensionality reduction technique that transforms data into uncorrelated variables (principal components). "
  },
  {
    question: "Q10:What is a ROC curve? ",
    answer: "A: A graph showing the tradeoff between True Positive Rate (TPR) and False Positive Rate (FPR) for different thresholds."
  },
  {
    question: "Q11:What is gradient descent? ",
    answer: "A: An optimization algorithm that minimizes the cost function by iteratively updating parameters in the opposite direction of the gradient. "
  },
  {
    question: "Q12: What is a cost function?",
    answer: "A: A function that measures the error between predicted and actual values (e.g., MSE for regression). "
  },
  {
    question: "Q13:What is the curse of dimensionality?",
    answer: "A:As dimensions increase, data becomes sparse, making learning harder and distance metrics less meaningful."
  },
  {
    question: "Q14:What is a neural network? ",
    answer: "A:A model inspired by the human brain, consisting of layers of interconnected nodes (neurons) that process data "
  },
  {
    question: "Q15: What is dropout in deep learning? ",
    answer: "A: A regularization technique where random neurons are ignored during training to prevent overfitting."
  },
  {
    question: "Q16:What is transfer learning? ",
    answer: "A:Using a pre-trained model on a similar task and fine-tuning it for a new task. "
  },
  {
    question: "Q17:What is reinforcement learning? ",
    answer: "A: Learning by interacting with an environment and receiving rewards or penalties for actions."
  },
  {
    question: "Q18: What is the vanishing gradient problem?",
    answer: "A: Gradients become too small during backpropagation in deep networks, slowing or stopping learning."
  },
  {
    question: "Q19:What is a GAN (Generative Adversarial Network)? ",
    answer: "A:A framework with a generator (creates data) and discriminator (evaluates data) competing to improve data generation. "
  },
  {
    question: "Q20: What is early stopping?",
    answer: "A: A regularization technique where training is stopped once validation error starts increasing."
  },
  {
    question: "Q21:What is hyperparameter tuning?",
    answer: "A:Selecting the best set of parameters (like learning rate, depth) that control the learning process. "
  },
  {
    question: "Q22: What is a support vector machine (SVM)? ",
    answer: "A: A supervised ML algorithm that finds the optimal hyperplane to separate data into classes with the maximum margin."
  },
  {
    question: "Q23:What is a kernel trick in SVM? ",
    answer: "A:A method to transform data into higher dimensions using kernel functions (e.g., RBF, polynomial) to make it linearly separable. "
  },
  {
    question: "Q24:What is a decision tree?",
    answer: "A:A tree-like model that splits data based on feature values to make predictions. "
  },
  {
    question: "Q25:What is information gain in decision trees? ",
    answer: "A:A metric that measures the reduction in entropy after splitting a dataset on a feature. "
  },
  {
    question: "Q26:What is Gini impurity?.",
    answer: "A: A measure of how often a randomly chosen element would be incorrectly labeled in a decision tree. "
  },
  {
    question: "Q27:  What is a similarity measure in ML?",
    answer: "A:A metric (e.g., Euclidean distance, cosine similarity) used to measure closeness between data points. "
  },
  {
    question: "Q28: What is exploding gradients problem?",
    answer: "A: When gradients become excessively large during backpropagation, leading to unstable training. "
  },
  {
    question: "Q29: What is a word embedding?",
    answer: "A:A vector representation of words where similar words have closer vectors (e.g., Word2Vec, GloVe)."
  },
  {
    question: "Q30:What is a Markov Decision Process (MDP)? ",
    answer: "A:A mathematical framework for modeling reinforcement learning problems using states, actions, rewards, and transitions. "
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
