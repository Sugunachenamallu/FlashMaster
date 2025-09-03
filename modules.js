const stars = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;
  stars.appendChild(star);
}

// function toggleDark() {
//   document.body.classList.toggle("light");
//   if (document.body.classList.contains("light")) {
//     document.body.style.background = "#f7f1e3";
//     document.body.style.color = "#222";
//   } else {
//     document.body.style.background = "#0e0e2c";
//     document.body.style.color = "#e0e0e0";
//   }
// }
document.querySelectorAll('.module').forEach(mod => {
  mod.addEventListener('click', () => {
    const topic = mod.textContent.trim();
    alert(`🚀 Initiating "${topic}" mission...`);
    // Add logic for redirect if needed
});
});

// Function to toggle the user dropdown menu
function toggleDropdown(event) {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.toggle('show');
  event.stopPropagation(); // Prevents the body click listener from immediately closing it
}

// Function to toggle the create dropdown menu
function toggleCreate(event) {
  const createDropdown = document.getElementById('createDropdown');
  createDropdown.classList.toggle('show');
  event.stopPropagation(); // Prevents the body click listener from immediately closing it
}

// Function to close all dropdowns when clicking outside
document.body.addEventListener('click', () => {
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  dropdownMenus.forEach(menu => {
    menu.classList.remove('show');
  });
});


