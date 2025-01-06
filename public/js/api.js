export async function fetchData(formData) {
  try {
    // Wysłanie zapytania POST do endpointa /search
    const response = await fetch('/search', {
      method: 'POST',
      body: formData,
    });

    // Obsługa błędów
    if (!response.ok) {
      throw new Error(`Błąd: ${response.status} - ${response.statusText}`);
    }

    // Odpowiedź z serwera
    const data = await response.json();
    if (!data || data.length === 0) {  // sprawdzenie czy zwrócone dane nie są puste
      throw new Error('Brak wyników do wyświetlenia.');
    }

    // Zwrócenie danych
    return data;
  } catch (error) {
    console.error('Wystąpił błąd w fetchData:', error.message);
    throw error;
  }
}
