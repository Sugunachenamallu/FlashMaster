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
    question: "Q1:What is a data structure?", answer: "A: A way to organize, store, and manage data for efficient access and modification." 
  },
  { 
    question: "Q2: Differentiate between an array and a linked list.", answer: "A:Arrays provide O(1) index access; linked lists enable easy insertion/deletion but require O(n) traversal." 
  },
  { 
    question: "Q3:What is a stack? ", answer: "A:A Last-In-First-Out (LIFO) structure where elements are added/removed at the top." 
  },
  { 
    question: "Q4:What is a queue? ", answer: "A:A First-In-First-Out (FIFO) structure: elements entering at the rear, exiting at the front. " 
  },
  { 
    question: "Q5:Explain binary search and its worst-case time complexity.", answer: "A:Repeatedly split a sorted array in half; O(log n) worst case." 
  },
  { 
    question: "Q6:What is the difference between linear and non-linear data structures?", answer: "A:Linear structures are sequential (e.g. arrays, lists), non-linear ones have hierarchical connections (e.g. trees, graphs). " 
  },
  {
    question: "Q7:What is a binary tree?",
    answer: "A: A hierarchical structure where each node has up to two children (left and right)."
  },
  {
    question: "Q8:What is a hash table?",
    answer: "A: A key-value map using a hash function to enable near O(1) average access."
  },
  {
    question: "Q9:What is depth-first search (DFS)?",
    answer: "A:Graph traversal that explores as far along a branch before backtracking; uses recursion or stack."
  },
  {
    question: "Q10: What is breadth-first search (BFS)?",
    answer: "A:Traversal that explores all neighbors of a node before moving deeper; uses a queue."
  },
  {
    question: "Q11:Describe a Trie (prefix tree).",
    answer: "A:A tree structure for storing strings where nodes represent common prefixes; efficient for prefix queries."
  },
  {
    question: "Q12:What does “two-sum” problem mean?",
    answer: "A:Given an array and target sum, find two numbers that add up to the target using a hash map or two-pointer method."
  },
  {
    question: "Q13:What is the sliding window technique?",
    answer: "A:Process a subarray/window of fixed or variable size moving through the array to find sums or patterns in O(n). "
  },
  {
    question: "Q14:Explain cycle detection in a linked list.",
    answer: "A:Use two pointers (slow and fast); if they meet inside the list, a cycle exists."
  },
  {
    question: "Q15:How do you detect cycle in a directed graph?",
    answer: "A:Use DFS with recursion stack or Kahn’s algorithm (topological sort); presence of leftover nodes indicates a cycle."
  },
  {
    question: "Q16:What is a priority queue and its typical implementation?",
    answer: "A:A data structure where elements with highest priority are dequeued first—commonly implemented using a binary heap. "
  },
  {
    question: "Q17:Explain merge sort’s time complexity.",
    answer: "A:Always runs in O(n log n) by dividing and merging."
  },
  {
    question: "Q18:Describe quick sort’s average vs worst-case complexities.",
    answer: "A:Average-case is O(n log n); worst-case (e.g., pivot picks poor) is O(n²)."
  },
  {
    question: "Q19:What is Dijkstra’s algorithm?",
    answer: "A: Computes shortest paths from source in a weighted directed graph with non-negative edges using a min-heap.Indeed"
  },
  {
    question: "Q20: Explain a segment tree and its use.",
    answer: "A: A binary tree that allows efficient range queries and updates in O(log n)."
  },
  {
    question: "Q21:What is union-find (disjoint-set)?",
    answer: "A:A DS supporting union and find operations with path compression for near-constant-time connectivity queries."
  },
  {
    question: "Q22: Describe the 0/1 Knapsack problem & DP solution.",
    answer: "A:Choose items maximizing value without exceeding weight capacity; solved via dynamic programming table in O(nW)."
  },
  {
    question: "Q23:How do you compute the longest increasing subsequence (LIS)?",
    answer: "A:DP with O(n²) or O(n log n) using patience sorting (binary search)."
  },
  {
    question: "Q24:What is topological sorting?",
    answer: "A: Ordering of nodes in a DAG where for every directed edge u→v, u comes before v (performed via DFS or Kahn’s algorithm)."
  },
  {
    question: "Q25:Explain the use of Rabin-Karp string search.",
    answer: "A:It uses rolling hash to search substrings efficiently in average O(n + m) time."
  },
  {
    question: "Q26: What is a B‑tree?",
    answer: "A:A self-balancing tree optimized for systems that read and write large blocks of data (e.g. databases). "
  },
  {
    question: "Q27:Explain AVL tree rotations.",
    answer: "A: Single and double rotations maintain balance after insertions/deletions to keep height difference ≤1."
  },
  {
    question: "Q28:What is a red-black tree?",
    answer: "A:A binary search tree with color properties that ensure balanced height (≤ 2 × log(n+1))."
  },
  {
    question: "Q29:Describe a skip list.",
    answer: "A: A probabilistic structure layering linked lists, offering expected O(log n) search/insertion times."
  },
  {
    question: "Q30:What is van Emde Boas tree?",
    answer: "A:A tree structure that supports operations (insert, delete, predecessor, successor) in O(log log M), where M is universe size. "
  },
  {
    question: "Q31: Explain suffix array and suffix tree differences.",
    answer: "A:Suffix trees allow linear-time substring search; suffix arrays are space-efficient and sort suffixes lexicographically."
  },
  {
    question: "Q32: What are link-cut trees?",
    answer: "A: Dynamic trees supporting cut/link operations in logarithmic time via splay tree structures. Unstop"
  },
  {
    question: "Q33:Explain efficient algorithm for maximum flow (Edmonds–Karp).",
    answer: "A:Uses BFS to find shortest augmenting paths in residual graph; runs in O(VE²)."
  },
  {
    question: "Q34: What is KMP string matching and its complexity?",
    answer: "A: Knuth–Morris–Pratt preprocesses pattern to achieve O(n + m) matching by avoiding re-scanning."
  },
  {
    question: "Q35:Describe the concept of persistent data structures.",
    answer: "A:Structures that preserve previous versions after updates (e.g. path-copying in persistent trees)."
  },
  {
    question: "Q36:What’s the difference between LRU and LFU cache?",
    answer: "A: LRU evicts least recently used item; LFU evicts least frequently accessed—typically using doubly linked lists with frequency buckets."
  },
  {
    question: "Q37: Explain Min-Cut / Max-Flow duality.",
    answer: "A:In a flow network, the maximum flow equals the capacity of the minimum cut separating source and sink."
  },
  {
    question: "Q38:What is the Blum-Floyd–Pratt algorithm (median of medians)?",
    answer: "A: A deterministic linear-time selection algorithm to find the k-th smallest element in O(n)."
  },
  {
    question: "Q39: Explain suffix automaton and its application.",
    answer: "A: A compressed automaton representing all substrings of a string; useful for substring counting and pattern queries in linear time."
  },
  {
    question: "Q40:What is dynamic tree data structure for Link-Cut Trees ?",
    answer: "A:Used to represent a forest of trees dynamically with efficient operations for linking, cutting, and path queries (via splay trees). "
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






