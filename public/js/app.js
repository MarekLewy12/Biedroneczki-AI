import { fetchData } from "./api.js";
import ErrorHandler from "./errorHandler.js";
import Statistics from "./statistics.js";

window.statistics = new Statistics(); // globalna instancja statystyk
document.addEventListener('DOMContentLoaded', () => {
  // Inicjalizacja statystyk dopiero po załadowaniu DOM w celu uniknięcia błędów
  window.statistics.init();

  // globalna instancja obsługi błędów
  window.errorHandler = new ErrorHandler();
});

// ------------------------------
// TRYB DLA DALTONISTOW
// ------------------------------
const colorBlindModeToggle = document.getElementById('colorBlindModeToggle');
const yellowBlackStyleLink = document.getElementById('cb1');
const blackYellowStyleLink = document.getElementById('cb2');

// Początkowy stan trybu
let currentMode = 'base'; // Możliwe wartości: 'base', 'yellowBlack', 'blackYellow'

const toggleColorBlindMode = () => {
  if (currentMode === 'base') {
    // Przejdź do trybu Yellow-Black
    yellowBlackStyleLink.disabled = false;
    blackYellowStyleLink.disabled = true;
    currentMode = 'yellowBlack';
  } else if (currentMode === 'yellowBlack') {
    // Przejdź do trybu Black-Yellow
    yellowBlackStyleLink.disabled = true;
    blackYellowStyleLink.disabled = false;
    currentMode = 'blackYellow';
  } else {
    // Wróć do trybu domyślnego
    yellowBlackStyleLink.disabled = true;
    blackYellowStyleLink.disabled = true;
    currentMode = 'base';
  }
};

// Podłączenie funkcji do przycisku
colorBlindModeToggle.addEventListener('click', toggleColorBlindMode);

// ------------------------------
// TRYB CIEMNY
// ------------------------------
const darkModeToggle = document.getElementById('darkModeToggle');
const darkStyleLink = document.getElementById('darkStyle');
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



// ------------------------------
// ZMIANA ROZMIARU CZCIONKI (50%, 75%, 100%, 125%)
// ------------------------------
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

// ------------------------------
// LOCAL STORAGE
// ------------------------------
// Funkcja zapisująca obecny widok do localStorage
const saveButton = document.getElementById('lastViewSave');
saveButton.addEventListener('click', () => {
  // Pobierz bieżący URL
  const currentUrl = window.location.href;

  // Zapisz URL
  localStorage.setItem('lastViewUrl', currentUrl);

  //  komunikat potwierdzenia
  console.log('Obecny URL został zapisany:', currentUrl);

  // dodatkowy komunikat na stronie
  const saveMessage = document.getElementById('saveMessage');
  saveMessage.style.display = 'block';

  // Inkrmentacja licznika zapisów
  window.statistics.incrementSavedPlans();

  // ukrycie komunikatu po 3 sekundach
  setTimeout(() => {
    saveMessage.style.display = 'none';
  }, 3000);
});

// ------------------------------
// RENDEROWANIE PUSTEGO KALENDARZA
// ------------------------------
const calendarEl = document.getElementById('calendar');

// Globalna instancja kalendarza
const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'timeGridWeek',
  locale: 'pl',
  headerToolbar: {
    start: 'prev,next today',
    center: 'title',
    end: 'dayGridDay,timeGridWeek,dayGridMonth',
  },
  buttonText: {
    today: 'Dziś',
    dayGridDay: 'Dzień',
    timeGridWeek: 'Tydzień',
    dayGridMonth: 'Miesiąc',
  },
  slotMinTime: '07:00:00',
  slotMaxTime: '21:00:00',
  allDaySlot: false,
  events: [],  // Na starcie brak wydarzeń aby wyświetlić pusty kalendarz

  eventDidMount: function(info) {
    const { extendedProps } = info.event;
    const tooltipText = `
      Sala: ${extendedProps.room ?? 'brak danych'}\n
      Prowadzący: ${extendedProps.worker ?? 'brak danych'}\n
    `;
    info.el.setAttribute('title', tooltipText);
  },
});

// Renderowanie pustego kalendarza
calendar.render();


// ------------------------------
// OBSŁUGA FORMULARZA WYSZUKIWANIA I AKTUALIZACJA KALENDARZA
// ------------------------------
const form = document.getElementById('searchForm');
const searchButton = form.querySelector('.search-button');

// Prosta walidacja po stronie klienta - przycisk wyszukiwania jest aktywny tylko gdy przynajmniej jedno pole jest wypełnione
function validateForm() {
  const inputs = form.querySelectorAll('input');

  // Sprawdzenie czy którekolwiek z pól jest wypełnione
  const isAnyFieldFilled = Array.from(inputs).some(input => input.value.trim() !== '');

  // Aktywacja przycisku wyszukiwania jeśli którykolwiek z pól jest wypełnione
  searchButton.disabled = !isAnyFieldFilled;

  // Dodanie klas w zależności od wypełnienia pól
  if (isAnyFieldFilled) {
    searchButton.classList.remove('disabled');
  } else {
    searchButton.classList.add('disabled');
  }
}

// Nasłuchuj zmian w polach formularza
form.addEventListener('input', validateForm);

validateForm(); // Sprawdzenie stanu formularza na starcie

// Logika czyszczenia formularza
const resetButton = form.querySelector('.reset-button');
























resetButton.addEventListener('click', (event) => {
  event.preventDefault();

  form.reset(); // Wyczyszczenie formularza

  // Czyszczenie kalendarza z wydarzeń
  calendar.removeAllEvents();

  // Aktualizacja adresu URL
  const newUrl = window.location.pathname;
  window.history.pushState({path: newUrl}, '', newUrl);

  validateForm(); // Sprawdzenie stanu formularza
});




form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);  // pobranie danych z formularza
  const params = new URLSearchParams(); // URLSearchParams pozwala na łatwe zarządzanie parametrami URL

  // Obliczenie dat w formacie YYYY-MM-DD
  const startDate = new Date().toDateString().split('T')[0];
  const endDate   = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  // Dodanie dat do parametrów URL
  params.append('start', startDate);
  params.append('end', endDate);

  // Dodanie pozostałych parametrów z formularza do parametrów URL
  for (const [name, value] of formData) {
    params.append(name, value);
  }

  // URL do endpointa PHP
  const url = `/backend/api/fetch_from_api.php?${params.toString()}`;

  // Aktualizacja adresu URL w przeglądarce
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({path: newUrl}, '', newUrl);

  try {
    const response = await fetchData(formData);
    // response zawiera już dane w formacie JSON zwrócone z backendu dzięki funkcji fetchData
    console.log('dane zwrócone przez API:', response);

    // Inkrementacja licznika wygenerowanych planów
    window.statistics.incrementGeneratedPlans();

    // Przetworzenie danych
    const events = response.slice(1); // pominięcie nagłówka ponieważ jest on pusty

    // Konwersja na format FullCalendar
    const fullCalendarEvents = events.map(item => ({
      title: item.title,
      start: item.start,
      end: item.end,
      extendedProps: {
        room: item.room,
        lesson_form: item.lesson_form,
        worker: item.worker,
      },
    }));

    // Czyszczenie poprzednich wydarzeń
    calendar.removeAllEvents();

    // Dodanie nowych wydarzeń
    calendar.addEventSource(fullCalendarEvents);

  } catch (error) {
    console.error('Błąd:', error);
    window.errorHandler.showError(error.message); // wyświetlenie błędu
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('searchForm');
  const calendarEl = document.getElementById('calendar');

  // Inicjalizacja FullCalendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'interaction'],
    events: [],  // Później wypełnimy danymi
    dateClick: function(info) {
      alert('Data kliknięta: ' + info.dateStr);
    },
  });

  calendar.render(); // Renderowanie kalendarza

  // Funkcja obsługująca wysyłanie formularza
  form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Zapobiegamy domyślnemu działaniu formularza

    const formData = new FormData(form); // Pobieramy dane formularza

    try {
      const response = await fetch('/search', {
        method: 'POST',
        body: formData, // Przesyłamy dane formularza
      });

      if (!response.ok) {
        throw new Error('Błąd podczas pobierania danych');
      }

      const data = await response.json();

      // Sprawdzamy, czy są dane
      if (data && data.length > 0) {
        // Tworzymy wydarzenia dla FullCalendar
        const events = data.map(item => ({
          title: `${item.subject_name} - ${item.worker_name}`,
          start: item.start_time,
          end: item.end_time,
          description: `Sala: ${item.room}, Grupa: ${item.group_name}`,
          color: item.color // Możesz ustawić kolor wydarzenia (jeśli jest dostępny)
        }));

        // Ustawiamy dane w kalendarzu
        calendar.removeAllEvents(); // Usuwamy wszystkie poprzednie wydarzenia
        calendar.addEventSource(events); // Dodajemy nowe wydarzenia
      } else {
        console.log('Brak wyników');
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  });
});




