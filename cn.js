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
    question: "Q1: What is a computer network?",
    answer: "A: A system of interconnected devices that communicate and share resources. \nDifferentiate between LAN and WAN.\nA LAN covers a limited area (office/home); a WAN spans large geographic distances. " 
  },
  { 
    question: "Q2: Define PAN, LAN, MAN, and WAN.", 
    answer: "A: PAN is for personal device range; LAN for a building; MAN for a city; WAN spans broader areas. " 
  },
  { 
    question: "Q3: What is a node?", 
    answer: "A: Any device connected in a network capable of sending or receiving data. " 
  },
  { 
    question: "Q4: Define network topology.", 
    answer: "A: The layout or arrangement of how devices are connected (e.g. star, mesh, bus). " 
  },
  { 
    question: "Q5: What are MAC and IP addresses?",
     answer: "A: MAC is a hardware identifier at data link layer; IP is a logical address at network layer. " 
  },
  { 
    question: "Q6: What is latency versus bandwidth?", 
    answer: "A: Latency is delay in transmission; bandwidth is the maximum data rate." 
  },
{
    question: "Q7: What is OSI model?",
    answer: "A: A 7‑layer framework: Physical, Data Link, Network, Transport, Session, Presentation, Application."
  },
  {
    question: "Q8: What is the TCP/IP model and its difference from OSI?",
    answer: "A: A 4‑layer stack (Interface, Internet, Transport, Application) vs OSI’s 7 layers. "
  },
  {
    question: "Q9: What is a router?",
    answer: "A: A network device forwarding packets between networks using IP routing tables. "
  },
  {
    question: "Q10: What is a switch and how does it differ from a hub?",
    answer: "A: A switch forwards frames to specific ports using MAC; a hub broadcasts to all ports. "
  },
  {
    question: "Q11: What is DHCP?",
    answer: "A: Protocol that dynamically assigns IP configurations to devices on a network. "
  },
  {
    question: "Q12: What is DNS?",
    answer: "A: The system that maps domain names to IP addresses so hosts can be located by name. "
  },
  {
    question: "Q13: Explain ARP.",
    answer: "A: Maps local IPv4 addresses to MAC addresses for packet delivery on LAN. "
  },
 {
    question: "Q14: What is ICMP and its use?",
    answer: "A: Internet Control Message Protocol used for diagnostics like ping and traceroute."
  },
  {
    question: "Q15: What is NAT and why is it used?",
    answer: "A: Network Address Translation allows multiple private devices to share a public IP, conserving addresses. "
  },
  {
    question: "Q16: Describe the TCP three-way handshake.",
    answer: "A: SYN → SYN-ACK → ACK across client and server to establish TCP connection. "
  },
  {
    question: "Q17: Difference between TCP and UDP.",
    answer: "A: TCP is connection‑oriented and reliable; UDP is connectionless and faster, without delivery guarantees. "
  },
  {
    question: "Q18: What is VLAN?",
    answer: "A: Virtual LAN segments a physical network into isolated logical groups for security and traffic control. "
  },
  {
    question: "Q19: What is STP (Spanning Tree Protocol)?",
    answer: "A: Prevents loops in redundant LAN links by creating a loop-free logical topology among switches. "
  },
  {
    question: "Q20: What is CIDR notation and why use it?",
    answer: "A: Classless addressing like 192.168.1.0/24; saves IP space and enables efficient routing. "
  },
{
    question: "Q21: What is BGP?",
    answer: "A: Border Gateway Protocol, used between autonomous systems to route Internet traffic."
  },
  {
    question: "Q22: What is load balancing?",
    answer: "A: Distribution of network or application traffic across multiple servers to enhance performance and availability. "
  },
  {
    question: "Q23: What is QoS?",
    answer: "A: Quality of Service prioritizes certain traffic types to ensure performance for critical applications. "
  },
  {
    question: "Q24: What commands are used for basic network troubleshooting?",
    answer: "A: ping, traceroute, nslookup, ipconfig/ifconfig, netstat. "
  },
  {
    question: "Q25: Define MPLS and its benefits.",
    answer: "A: Multi‑Protocol Label Switching forwards packets based on short path labels, improving speed and traffic engineering. "
  },
  {
    question: "Q26: What is SDN?",
    answer: "A: Software-Defined Networking separates control from data planes to allow programmable and centralized network management. "
  },
  {
    question: "Q27: What is SD‑WAN?",
    answer: "A: Software-Defined WAN applies SDN principles over wide area networks for optimized, secure, and cost-effective connectivity."
  },
 {
    question: "Q28: Define unicast, multicast, and broadcast.",
    answer: "A: Unicast: to one host \n multicast: to selected group \n broadcast: to all on network. "
  },
  {
    question: "Q29: What is a DMZ in networking?",
    answer: "A: A network segment that isolates public-facing servers from internal networks to enhance security. "
  },
  {
    question: "Q30: What is link aggregation?",
    answer: "A: Combining multiple physical links to act as a single logical link for increased bandwidth and redundancy. "
  },
  {
    question: "Q31: What are access control lists (ACLs)?",
    answer: "A: Rules applied to network interfaces/devices to allow or deny traffic based on criteria like IP or port. "
  },
  {
    question: "Q32: How does NAT traversal work?",
    answer: "A: Techniques needed (like STUN, TURN) to enable connections through NATs—important for VoIP/VPN. "
  },
  {
    question: "Q33: What is a broadcast storm?",
    answer: "A: Excessive broadcast traffic causing network congestion, often due to switching loops or faulty devices. "
  },
  {
    question: "Q34: How are RIP, OSPF, and EIGRP different?",
    answer: "A: RIP is distance-vector (hop count), OSPF is link-state (fast convergence), EIGRP is hybrid Cisco protocol. "
  },
{
    question: "Q35: How does BGP prevent routing loops?",
    answer: "A: BGP uses path-vector attributes and AS-path checks to detect and avoid loops. "
  },
  {
    question: "Q36: What is an anycast address?",
    answer: "A: An IP address assigned to multiple endpoints sharing one address; packets delivered to nearest node. "
  },
  {
    question: "Q37: What is a proxy server and reverse proxy?",
    answer: "A: A proxy forwards client requests; reverse proxy routes incoming traffic to appropriate backend servers."
  },
  {
    question: "Q38: Explain QoS marking.",
    answer: "A: Tagging packets (e.g. DSCP or ToS bits) to indicate priority for routers/switches to enforce policies. "
  },
  {
    question: "Q39: What is network redundancy and why is it important?",
    answer: "A: Having backup links/devices improves reliability and uptime in case of failure."
  },
  {
    question: "Q40: What is port mirroring and why is it used?",
    answer: "A: Port mirroring is a method of copying network traffic from one port (or VLAN) to another for monitoring and analysis—commonly used with intrusion detection systems or packet sniffers like Wireshark."
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


