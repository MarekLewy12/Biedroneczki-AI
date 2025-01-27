<?php
require_once __DIR__ . '/src/Services/ApiService.php';

$lockFile = __DIR__ . '/cron.lock';

// Sprawdzenie czy skrypt jest już uruchomiony
if (file_exists($lockFile)) {
  $lockTime = filemtime($lockFile);
  if (time() - $lockTime < 3600) { // jeśli minęło mniej niż godzina
    die("Skrypt jest już uruchomiony\n");
  }
}

// Utwórz plik blokady
file_put_contents($lockFile, '');

try {
  $apiService = new ApiService();

  // Pobierz dane dla zakresu numerów albumów
  $startId = 51000;
  $endId = 51100;

  for ($id = $startId; $id <= $endId; $id++) {
    echo "Pobieranie danych dla studenta $id...\n";
    $apiService->getSchedule(['student_id' => $id]);
  }

  echo "Zakończono pobieranie danych\n";
} catch (Exception $e) {
  echo "Błąd: " . $e->getMessage() . "\n";
} finally {
  // Usuń plik blokady
  unlink($lockFile);
}
