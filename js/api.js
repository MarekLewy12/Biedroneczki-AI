// Opis: Moduł zawierający funkcje do komunikacji z backendem
export async function fetchData(formData) {
  try {
    // Wysyłanie zapytania do backendu
    const response = await fetch('/backend/api/fetch_from_api.php', {
      method: 'POST',
      body: formData,
    });

    // Obsługa błędów odpowiedzi
    if (!response.ok) {
      throw new Error(`Błąd: ${response.status} - ${response.statusText}`);
    }

    // Parsowanie odpowiedzi JSON
    const data = await response.json();

    // Jeśli dane są puste, zwróć komunikat
    if (!data || data.length === 0) {
      throw new Error('Brak wyników do wyświetlenia.');
    }

    return data;
  } catch (error) {
    console.error('Wystąpił błąd w fetchData:', error.message);
    throw error; // Przekaż błąd dalej
  }
}
