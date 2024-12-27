const darkModeToggle = document.getElementById('darkModeToggle');
const darkStyleLink = document.getElementById('darkStyle');

// Funkcja przełączająca tryb nocny
const toggleDarkMode = () => {
  
  if (darkStyleLink.disabled) {
    darkStyleLink.disabled = false; // Włącz tryb ciemny
    darkModeToggle.src = 'img/light-mode.png'; 
    darkModeToggle.alt = 'Przycisk do zmiany trybu dziennego'; 
  } else {
    darkStyleLink.disabled = true; // Wyłącz tryb ciemny
    darkModeToggle.src = 'img/dark-mode.png'; 
    darkModeToggle.alt = 'Przycisk do zmiany trybu nocnego'; 
  }
};

darkModeToggle.addEventListener('click', toggleDarkMode);
