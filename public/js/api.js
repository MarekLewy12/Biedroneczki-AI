export async function fetchData(formData) {
  try {
    const response = await fetch('/search', {
      method: 'POST',
      body: formData, // Przekazanie danych z formularza
    });

    if (!response.ok) {
      throw new Error(`Błąd: ${response.status} - ${response.statusText}`);
    }

    // Sprawdź, czy odpowiedź jest JSON-em przed próbą parsowania
    const contentType = response.headers.get('Content-Type');

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Odpowiedź nie jest w formacie JSON');
    }

    // Odpowiedź powinna być JSON-em, więc możemy bezpiecznie ją sparsować
    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error('Brak wyników do wyświetlenia.');
    }

    return data;
  } catch (error) {
    console.error('Wystąpił błąd w fetchData:', error.message);
    throw error;
  }
}
