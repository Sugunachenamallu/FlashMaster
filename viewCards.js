// Starfield background generation
        const stars = document.getElementById("stars");
        if (stars) {
            for (let i = 0; i < 100; i++) {
                const star = document.createElement("div");
                star.classList.add("star");
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.animationDuration = `${Math.random() * 3 + 2}s`;
                stars.appendChild(star);
            }
        }
    
        // Navbar dropdown toggles
        function toggleMenu() {
            document.getElementById("navMenu").classList.toggle("show");
            document.getElementById("createDropdownMenu").classList.remove("show");
            document.getElementById("userDropdownMenu").classList.remove("show");
        }
    
        function toggleCreateDropdown(event) {
            event.stopPropagation();
            const createDropdown = document.getElementById("createDropdownMenu");
            createDropdown.classList.toggle("show");
            document.getElementById("userDropdownMenu").classList.remove("show");
        }
    
        function toggleUserDropdown(event) {
            event.stopPropagation();
            const userDropdown = document.getElementById("userDropdownMenu");
            userDropdown.classList.toggle("show");
            document.getElementById("createDropdownMenu").classList.remove("show");
        }
    
        document.addEventListener("click", function (e) {
            const createDropdown = document.getElementById("createDropdownMenu");
            const createDropdownParent = document.querySelector(".create-dropdown");
            const userDropdown = document.getElementById("userDropdownMenu");
            const userDropdownParent = document.querySelector(".user-dropdown");
            const navMenu = document.getElementById('navMenu');
            const menubar = document.querySelector('.menubar');
    
            if (createDropdown && !createDropdownParent.contains(e.target)) {
                createDropdown.classList.remove("show");
            }
            if (userDropdown && !userDropdownParent.contains(e.target)) {
                userDropdown.classList.remove("show");
            }
            if (navMenu && navMenu.classList.contains('show') && !navMenu.contains(e.target) && !menubar.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });

        // Main logic for viewing flashcards
        document.addEventListener("DOMContentLoaded", () => {
            const topicTitleElement = document.getElementById("topicTitle");
            const topicDescriptionElement = document.getElementById("topicDescription");
            const flashcardContainer = document.getElementById("flashcardContainer");
            const noCardsMessage = document.getElementById("noCardsMessage");

            // 1. Get the topic ID from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const topicId = parseInt(urlParams.get('topicId'));

            // Handle case where topicId is missing or invalid
            if (isNaN(topicId)) {
                topicTitleElement.textContent = "Topic Not Found";
                topicDescriptionElement.textContent = "Please return to My Topics to select a topic.";
                return;
            }

            // 2. Load topics from localStorage and find the right one
            const allTopics = JSON.parse(localStorage.getItem('flashmaster_custom_topics')) || [];
            const currentTopic = allTopics.find(topic => topic.id === topicId);

            // Handle case where topic is not found
            if (!currentTopic) {
                topicTitleElement.textContent = "Topic Not Found";
                topicDescriptionElement.textContent = "The requested topic could not be found.";
                return;
            }

            // 3. Update the page header with the topic's information
            topicTitleElement.textContent = currentTopic.topicName;
            topicDescriptionElement.textContent = `Total Cards: ${currentTopic.cards.length}`;

            // 4. Display the flashcards
            if (currentTopic.cards.length === 0) {
                flashcardContainer.style.display = 'none';
                noCardsMessage.style.display = 'block';
            } else {
                noCardsMessage.style.display = 'none';
                currentTopic.cards.forEach(card => {
                    const cardElement = document.createElement("div");
                    cardElement.classList.add("flashcard");
                    
                    cardElement.innerHTML = `
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <p>${card.question}</p>
                            </div>
                            <div class="flashcard-back">
                                <p>${card.answer}</p>
                            </div>
                        </div>
                    `;
                    
                    // Add a click event listener to flip the card
                    cardElement.addEventListener('click', () => {
                        cardElement.classList.toggle('flipped');
                    });

                    flashcardContainer.appendChild(cardElement);
                });
            }
        });
        
        // Export functions to the global scope for use with HTML onclick attributes
        window.toggleMenu = toggleMenu;
        window.toggleCreateDropdown = toggleCreateDropdown;
        window.toggleUserDropdown = toggleUserDropdown;