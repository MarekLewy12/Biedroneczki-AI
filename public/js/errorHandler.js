class errorHandler {
  constructor() {
    // Elementy DOM potrzebne do obsługi błędów
    this.errorContainer = document.getElementById('errorContainer');
    this.errorText = this.errorContainer.querySelector('.error-text');
    this.retryButton = this.errorContainer.querySelector('.error-retry');
    this.closeButton = this.errorContainer.querySelector('.error-close');

    // Animacja
    this.errorContainer.style.transition = 'all 0.3s ease-in-out';

    // Inicjalizacja zdarzeń
    this.bindEvents();

    // Inicjalizacja panelu testowego
    this.initializeTestPanel();
  }

  initializeTestPanel() {
    const testPanel = document.getElementById('testPanel');
    if(!testPanel) return;

    const toggle = testPanel.querySelector('.test-panel-toggle');
    const content = testPanel.querySelector('.test-panel-content');

    // Toggle panelu testowego
    const togglePanel = (show) => {
      testPanel.classList.toggle('visible', show);

      if (show) {
        content.style.display = 'block';
        // reflow
        content.offsetHeight;
        content.style.opacity = '1';
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        content.style.opacity = '0';
        toggle.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
          content.style.display = 'none';
        }, 300);
      }
    };

    togglePanel(false);

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isVisible = testPanel.classList.contains('visible');
      togglePanel(!isVisible);
    });

    // Zamykanie panelu przy kliknięciu poza nim
    document.addEventListener('click', (event) => {
      if (!testPanel.contains(event.target) && testPanel.classList.contains('visible')) {
        togglePanel(false);
      }
    });
  }

  // Przypisanie zdarzeń do przycisków
  bindEvents() {
    this.closeButton.addEventListener('click', () => this.hideError());
    this.retryButton.addEventListener('click', () => this.retryLastOperation());
  }

  showError(message, isRetryable = true) {
    this.errorContainer.style.opacity = '0';
    this.errorText.textContent = message;
    this.errorContainer.style.display = 'block';
    this.retryButton.style.display = isRetryable ? 'block' : 'none';

    // Animacja przy pojawianiu się błędu
    requestAnimationFrame(() => {
      this.errorContainer.style.opacity = '1';
    });

    // Schowanie błędu po 5 sekundach, jeśli nie jest on ponowalny
    if (!isRetryable) {
      setTimeout(() => this.hideError(), 5000);
    }
  }

  hideError() {
    this.errorContainer.style.opacity = '0';
    setTimeout(() => {
      this.errorContainer.style.display = 'none';
    }, 300);
  }

  retryLastOperation() {
    window.location.reload();
  }

  // Metody testowe
  async testApiError() {
    try {
      const response = await fetch('/api/test-error');


      if (!response.ok) {
        throw new Error(`Błąd: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage = error instanceof TypeError
        ? 'Nie można połączyć się z serwerem.'
        : `Wystąpił błąd: ${error.message}`;

      this.showError(errorMessage, true);
      console.error('Szczegóły błędu:', error);
    }
  }

  testValidationError() {
    this.showError('Wypełnij przynajmniej jedno pole formularza',
      false);
  }

  async testTimeoutError() {
    try {
      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Przekroczono limit czasu'), 1000), 5000);
      });
    } catch (error) {
      this.showError(`Wystąpił błąd: ${error.message}`, true);
      console.error('Szczegóły błędu:', error);
    }
  }
}

// Eksport klasy (aby można było jej użyć w innych plikach)
export default errorHandler;
