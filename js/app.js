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




// Rozmiar czcionki (50%, 75%, 100%, 125%)
const fontIncreaseButton = document.getElementById('fontIncreaseButton');

// Informacja o aktualnej skali czcionki
const fontScaleInfo = document.getElementById('fontScaleInfo');

let scaleIndex = 2;  // Strona po załadowaniu ma 100% skali
const scaleSteps = [0.5, 0.75, 1, 1.25];

const changePageFontScale = () => {

  scaleIndex = (scaleIndex + 1) % scaleSteps.length;
  const newScale = scaleSteps[scaleIndex];

  // Zmiana rozmiaru czcionki na stronie
  document.documentElement.style.fontSize = `${newScale}em`;

  // Aktualizacja informacji o skali czcionki
  fontScaleInfo.textContent = `${newScale * 100}%`;

};

fontIncreaseButton.addEventListener('click', changePageFontScale);
