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




//rozmiar czcionki (50,75,100,125%)
const fontIncreaseButton = document.getElementById('fontIncreaseButton');


let scaleIndex = 4; 
const scaleSteps = [0.5, 0.75, 1, 1.25]; 

const changePageScale = () => {
  
  scaleIndex = (scaleIndex + 1) % scaleSteps.length; 
  const newScale = scaleSteps[scaleIndex]; 

  
  document.body.style.transform = `scale(${newScale})`; 
  document.body.style.transformOrigin = 'top left'; 
  document.body.style.transition = 'transform 0.3s ease'; 
};

fontIncreaseButton.addEventListener('click', changePageScale);
