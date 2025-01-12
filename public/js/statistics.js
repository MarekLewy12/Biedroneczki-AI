class Statistics {
  constructor() {
    // Inicjalizacja liczników
    this.savedPlans = parseInt(localStorage.getItem('savedPlans')) || 0;
    this.generatedPlans = parseInt(localStorage.getItem('generatedPlans')) || 0;
  }

  init() {
    this.savedPlansElement = document.getElementById('savedPlansCount');
    this.generatedPlansElement = document.getElementById('generatedPlansCount');

    // Aktualizacja wartości jeśli jesteśmy na stronie ze statystykami
    if (window.location.pathname === '/statistics') {
      this.updateStatistics();
    }
  }

  incrementSavedPlans() {
    this.savedPlans++;
    localStorage.setItem('savedPlans', this.savedPlans);
    this.updateStatistics();
  }

  incrementGeneratedPlans() {
    this.generatedPlans++;
    localStorage.setItem('generatedPlans', this.generatedPlans);
    this.updateStatistics();
  }

  updateStatistics() {
    if (this.savedPlansElement) {
      this.savedPlansElement.textContent = this.savedPlans;
    }
    if (this.generatedPlansElement) {
      this.generatedPlansElement.textContent = this.generatedPlans;
    }
  }
}

export default Statistics;
