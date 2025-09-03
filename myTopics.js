document.addEventListener("DOMContentLoaded", () => {
    const topicsContainer = document.getElementById("topicsContainer");
    const noTopicsMessage = document.getElementById("noTopicsMessage");

    // Function to load and display topics (already provided and corrected)
    function loadAndDisplayTopics() {
        let allTopics = JSON.parse(localStorage.getItem('flashmaster_custom_topics')) || [];

        topicsContainer.innerHTML = ''; // Clear existing content

        if (allTopics.length === 0) {
            noTopicsMessage.style.display = 'block';
            return;
        } else {
            noTopicsMessage.style.display = 'none';
        }

        // Sort topics by lastModified date (newest first)
        allTopics.sort((a, b) => new Date(b.lastModified || b.id) - new Date(a.lastModified || a.id));

        allTopics.forEach(topic => {
            const topicCard = document.createElement("div");
            topicCard.classList.add("topic-card");
            
            // Ensure date handling for 'Last Modified' is robust
            const dateValue = topic.lastModified || topic.id; // Use lastModified, fallback to id
            const date = new Date(dateValue); // Attempt to create a Date object
            const formattedDate = date.toLocaleString('en-US', { 
                year: 'numeric', month: 'short', day: 'numeric', 
                hour: '2-digit', minute: '2-digit', hour12: true 
            });

            topicCard.innerHTML = `
                <h3>${topic.topicName}</h3>
                <p>${topic.cards.length} Flashcards</p>
                <p>Last Modified: ${formattedDate === 'Invalid Date' ? 'N/A' : formattedDate}</p>
                <div class="topic-actions">
                    <button class="view-btn" data-topic-id="${topic.id}">View Cards</button>
                    <button class="edit-btn" data-topic-id="${topic.id}">Edit Topic</button>
                    <button class="delete-btn" data-topic-id="${topic.id}">Delete</button>
                </div>
            `;
            topicsContainer.appendChild(topicCard);
        });

        // Event delegation for click events on buttons
        topicsContainer.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'BUTTON' && target.dataset.topicId) {
                // IMPORTANT FIX: Convert topicId to a number here
                const topicId = parseInt(target.dataset.topicId, 10); 
                if (isNaN(topicId)) { // Basic validation
                    console.error("Invalid topic ID from button:", target.dataset.topicId);
                    return;
                }

                if (target.classList.contains('view-btn')) {
                    viewCards(topicId);
                } else if (target.classList.contains('edit-btn')) {
                    editTopic(topicId);
                } else if (target.classList.contains('delete-btn')) {
                    deleteTopic(topicId);
                }
            }
        });
    }

    // --- The functions you asked for: ---

    /**
     * Handles the action to view/study cards for a given topic.
     * In a real application, this would navigate to a dedicated study page
     * and load the flashcards associated with this topic ID.
     * @param {number} topicId - The unique ID of the topic to view cards for.
     */
    function viewCards(topicId) {
        // Placeholder: Implement navigation to your study page here.
        // You would likely pass the topicId in the URL, e.g.:
        // window.location.href = `study.html?topicId=${topicId}`;
        console.log(`Attempting to view cards for topic ID: ${topicId}`);
        alert(`Functionality to view/study cards for topic ID: ${topicId} will go here.\n(e.g., redirect to study.html?topicId=${topicId})`);
    }

    /**
     * Handles the action to edit a given topic.
     * This navigates back to the create.html page, passing the topic ID
     * so that create.html can load and display that specific topic for editing.
     * @param {number} topicId - The unique ID of the topic to edit.
     */
    function editTopic(topicId) {
        console.log(`Attempting to edit topic ID: ${topicId}`);
        window.location.href = `create.html?topicId=${topicId}`;
    }

    /**
     * Handles the action to delete a given topic from local storage.
     * Prompts for confirmation and then filters the topics array,
     * saving the updated list back to local storage and refreshing the display.
     * @param {number} topicId - The unique ID of the topic to delete.
     */
    function deleteTopic(topicId) {
        if (confirm("Are you sure you want to delete this topic and all its flashcards? This action cannot be undone.")) {
            let allTopics = JSON.parse(localStorage.getItem('flashmaster_custom_topics')) || [];
            
            const initialLength = allTopics.length; // For debugging purposes
            
            // Filter out the topic to be deleted.
            // topicId is now guaranteed to be a number due to parseInt in the event listener.
            const updatedTopics = allTopics.filter(topic => topic.id !== topicId); 
            
            // Save the updated list back to localStorage
            localStorage.setItem('flashmaster_custom_topics', JSON.stringify(updatedTopics));
            
            // Log for debugging: Check if actual deletion happened
            if (updatedTopics.length < initialLength) {
                console.log(`Successfully deleted topic with ID: ${topicId}`);
            } else {
                console.warn(`Failed to find or delete topic with ID: ${topicId}. It might not exist. Current IDs in storage:`, allTopics.map(t => t.id));
            }

            // Re-load and display topics to reflect the deletion
            loadAndDisplayTopics(); // This will refresh the UI
            alert("Topic deleted successfully!");
        }
    }

    /**
     * Toggles the visibility of the navigation menu on smaller screens.
     * This function is likely also present in your other HTML files for consistency.
     */
    function toggleMenu() {
        const nav = document.getElementById("navMenu");
        nav.classList.toggle("show");
    }

    // --- Initial setup calls ---
    loadAndDisplayTopics(); // Call this once when the page loads

    // Make toggleMenu accessible globally if it's called from HTML's onclick attributes
    window.toggleMenu = toggleMenu;
});