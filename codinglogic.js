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
    question: "Q1: How do you check if a number is a prime number?", 
    answer: "A: Logic \n * Take input n. \n* If n is less than 2, it’s not prime. \n* Start a loop from i = 2 to i <= n / 2. \n * In each iteration, check if n % i == 0. \n * If yes, then n is divisible by a number other than 1 and itself, so it's not prime. \n * If no divisor is found in the loop, then n is prime." 
  },
  { 
    question: "Q2:  How do you find the factorial of a number?", 
    answer: "A: Logic: \n * Take input n. \n * Initialize fact = 1. \n * Use a loop from i = 1 to i <= n. \n * Multiply fact with i in each step. \n * After the loop, fact contains the factorial of n." 
  },
  { 
    question: "Q3: : How do you reverse a number without using strings?",
    answer: "A: Logic: \n * Take input n. \n * Initialize rev = 0. \n * Use a loop: while n >  \n  * Extract last digit using digit = n % 10. \n  * Add it to rev using rev = rev * 10 + digit. \n  * Remove last digit from n using n = n // 10. \n  * Final rev will be the reversed number." 
  },
  { 
    question: "Q4: How do you check if a number is a palindrome?",
    answer: "A: * Take input n, store a copy in original.\n* Initialize rev = 0.\n* Use the reverse logic (same as Q3) to reverse the number.\n* After reversal, compare rev with original.\n* If equal → it’s a palindrome.\n* Else → not a palindrome." 
  },
  { 
    question: "Q5: How do you find the GCD of two numbers?",
    answer: "A: Logic: \n* Take inputs a and b.\n* Use a loop:\n* While b != 0:\n* temp = b\n* b = a % b\n* a = temp\n* When b becomes 0, a will be the GCD." 
  },
  { 
    question: "Q6: How do you find the LCM of two numbers?",
     answer: "A: Logic:\n* Take inputs a and b.\n* Compute gcd using logic from Q5.\n* Then use: lcm = (a * b) // gcd\n* This ensures LCM is the smallest multiple common to both." 
  },
  {
    question: "Q7: How do you generate Fibonacci series up to N terms?",
    answer: "A: Logic:\n* Take input n (number of terms).\n* Initialize first two terms: a = 0, b = 1.\n* Print or store a and b.\n* Loop from 3rd term to nth term:\n* next = a + b\n* Print/store next\n* Update a = b, b = next for the next iteration."
  },
  {
    question: "Q8: How do you check if a number is an Armstrong number?",
    answer: "A: Logic:\n* Take input n, store in original.\n* Count digits in n (let’s say d).\n* Initialize sum = 0.\n* Use loop: while n > 0\n* Extract digit: digit = n % 10\n* Add digit^d to sum\n* Remove last digit: n = n // 10\n* After loop, compare sum with original.\n* If equal → Armstrong number.\n* Else → not."
  },
  {
    question: "Q9: What is the logic for a Happy Number?",
    answer: "A: Logic:\n* Take input n.\n* Use a loop that runs until you get either 1 or enter a loop.\n* In each iteration:\n* Replace number with sum of squares of its digits.\n* Use a set to keep track of numbers you've already seen.\n* If you see a repeat → not a happy number (infinite loop).\n* If you reach 1 → it's a happy number."
  },
  {
    question: "Q10: How do you check if a number is a perfect number?",
    answer: "A: Logic:\n* Take input n.\n* Initialize sum = 0.\n* Loop i from 1 to n - 1.\n* If n % i == 0, add i to sum.\n* After the loop, compare sum with n.\n* If equal → it’s a perfect number.\n* Else → it’s not."
  },
  {
    question: "Q11: How do you find the sum of digits of a number?",
    answer: "A: Logic:\n* Take input n.\n* Initialize sum = 0.\n* Use a loop: while n > 0\n* Extract the last digit: digit = n % 10.\n* Add it to sum: sum += digit.\n* Remove the last digit: n = n // 10.\n* After loop, sum is the total of all digits."
  },
  {
    question: "Q12: How do you count the number of digits in a number?",
    answer: "A: Logic:\n* Take input n.\n* Initialize count = 0.\n* Use a loop: while n > 0\n* Remove one digit: n = n // 10\n* Increment count: count += 1\n* Final value of count is the total number of digits."
  },
  {
    question: "Q13: How do you find the largest digit in a number?",
    answer: "A: Logic:\n* Take input n.\n* Initialize max_digit = 0.\n* Loop while n > 0:\n* Extract digit: digit = n % 10\n* If digit > max_digit, update max_digit = digit\n* Remove last digit: n = n // 10\n* Final max_digit holds the largest digit."
  },
  {
    question: "Q14: How do you check if two numbers are co-prime?",
    answer: "A: ogic:\n* Take inputs a and b.\n* Find GCD of a and b using the Euclidean method.\n* If GCD is 1, then they are co-prime.\n* Else, they are not."
  },
  {
    question: "Q15: How do you find square root without using sqrt()?",
    answer: "A: Logic:\n* Take input n.\n* Use binary search from low = 1 to high = n.\n* In each iteration:\n* Compute mid = (low + high) // 2\n* If mid * mid == n, you found the root.\n* If mid * mid < n, move low = mid + 1\n* Else, move high = mid - 1\n* Final answer is floor of square root."
  },
  {
    question: "Q16: How do you convert a decimal number to binary?",
    answer: "A: Logic:\n* Take input n.\n* While n > 0:\n* Divide by 2 → store remainder (0 or 1)\n* Update n = n // 2\n* Collect remainders in reverse order → this gives binary."
  },
  {
    question: "Q17: How do you convert binary to decimal?",
    answer: "A: Logic:\n* Take binary number as string or digit array.\n* Initialize decimal = 0 and power = 0.\n* Traverse from right to left:\n* Multiply each digit with 2^power and add to decimal.\n* Increase power after each digit.\n* Final value is the decimal equivalent."
  },
  {
    question: "Q18: How do you check if a number is a power of two?",
    answer: "A: Logic:\n* Take input n.\n* Continuously divide n by 2:\n* If at any point n % 2 != 0, it’s not a power of 2.\n* If n becomes 1 exactly, then it is a power of 2."
  },
  {
    question: "Q19: How do you swap two numbers without using a third variable?",
    answer: "A: Logic:\n* Use math:\n* a = a + b\n* b = a - b\n* a = a - b\n* After these steps, a and b are swapped."
  },
  {
    question: "Q20: How do you find the sum of first N natural numbers?",
    answer: "A: Logic:\n* Take input n.\n* Initialize sum = 0.\n* Loop from i = 1 to n, and add each i to sum.\n* After loop, sum contains total of all numbers from 1 to n."
  },
  {
    question: "Q21: How do you find nth Fibonacci number using recursion?",
    answer: "A: Logic:\n* Base Cases:\n* If n == 0, return 0\n* If n == 1, return 1\n* For other values:\n* Return fib(n-1) + fib(n-2)"
  },
  {
    question: "Q22: How do you check if a year is a leap year?",
    answer: "A: Logic:\n* If year is divisible by 4:\n* If it’s not divisible by 100, it's a leap year.\n* If it is divisible by 100, check if it's divisible by 400.\n* If yes → leap year\n* Else → not a leap year"
  },
  {
    question: "Q23: How do you calculate power a^b without using pow()?",
    answer: "A: Logic:\n* Initialize result = 1\n* Loop i = 1 to b:\n* Multiply result = result * a\n* After loop, result contains a^b"
  },
  {
    question: "Q24: What is the logic of binary search?",
    answer: "A: Logic:\n* List must be sorted.\n* Set low = 0, high = n - 1.\n* Loop:\n* mid = (low + high) // 2\n* If arr[mid] == key → found\n* If key < arr[mid] → search in left half\n* If key > arr[mid] → search in right half\n* If low > high, element not found."
  },
  {
    question: "Q25: What is the logic of linear search?",
    answer: "A: Logic:\n* Traverse each element of the array:\n* If element == key, return found\n* If no match found till end, return not found"
  },
  {
    question: "Q26: How do you find duplicates in an array?",
    answer: "A: Logic:\n* Use a loop inside a loop:\n* Outer loop runs from i = 0 to n-1\n* Inner loop checks if arr[i] == arr[j] for j > i\n* If found, it's a duplicate"
  },
  {
    question: "Q27: How do you find max and min in an array?",
    answer: "A: Logic:\n* Initialize max = arr[0], min = arr[0]\n* Loop through array:\n* If arr[i] > max, update max\n* If arr[i] < min, update min"
  },
  {
    question: "Q28: How do you reverse an array?",
    answer: "A: Logic:\n* Use two pointers: left = 0, right = n - 1\n* While left < right:\n* Swap arr[left] and arr[right]\n* Move left++, right--"
  },
  {
    question: "Q29: How do you check if an array is sorted?",
    answer: "A: Logic:\n* Traverse from index 0 to n-2:\n* If arr[i] > arr[i+1], array is not sorted\n* If no such pair is found, it's sorted"
  },
  {
    question: "Q30: How do you remove duplicates from a sorted array?",
    answer: "A: Logic:\n* Use two pointers:\n* i to track unique position\n* j to scan array\n* If arr[i] != arr[j], increment i and copy arr[j] to arr[i]"
  },
  {
    question: "Q31: How do you find the second largest in an array?",
    answer: "A: Logic:\n* Initialize first = -∞, second = -∞\n* Traverse array:\n* If current > first, update second = first, first = current\n* Else if current > second and not equal to first, update second"
  },
  {
    question: "Q32: How do you count even and odd numbers in an array?",
    answer: "A: Logic:\n* Initialize even = 0, odd = 0\n* Loop through array:\n* If arr[i] % 2 == 0, increment even\n* Else, increment odd"
  },
  {
    question: "Q33: What is the logic of bubble sort?",
    answer: "A: Logic:\n* Run two loops:\n* Outer for number of passes\n* Inner for comparing adjacent elements\n* If arr[j] > arr[j+1], swap them\n* Largest elements 'bubble up' to the end"
  },
  {
    question: "Q34: What is the logic of selection sort?",
    answer: "A: Logic:\n* For each position i:\n* Find index of smallest element from i to end\n* Swap with arr[i]"
  },
  {
    question: "Q35: What is the logic of insertion sort?",
    answer: "A: Logic:\n* Start from second element.\n* Compare with previous elements and shift them to right until correct position is found.\n* Insert current element in that position."
  },
  {
    question: "Q36: How do you count vowels and consonants in a string?",
    answer: "A: Logic:\n* Traverse each character.\n* If it's a letter:\n* If in 'aeiouAEIOU' → vowel\n* Else → consonant"
  },
  {
    question: "Q37: How do you check if a string is a palindrome?",
    answer: "A: Logic:\n* Use two pointers:\n* One from start, one from end.\n* Compare each character:\n* If mismatch found → not palindrome\n* If all matched → palindrome"
  },
  {
    question: "Q38: How do you count frequency of characters in a string?",
    answer: "A: Logic:\n* Initialize a dictionary or array.\n* Traverse string:\n* For each character, increment its count in map"
  },
  {
    question: "Q39: How do you remove white spaces from a string?",
    answer: "A: Logic:\n* Create empty result string.\n* Traverse input string:\n* If character is not space, append to result."
  },
  {
    question: "Q40: How do you find the first non-repeating character in a string?",
    answer: "A: Logic:\n* Traverse string once to count character frequency.\n* Traverse again to check which character has frequency 1.\n* Return the first one that matches."
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





