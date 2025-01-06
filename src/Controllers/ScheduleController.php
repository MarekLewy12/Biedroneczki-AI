<?php
namespace App\Controllers;

use App\Services\ApiService;

class ScheduleController
{
  private ApiService $apiService;

  public function __construct()
  {
    $this->apiService = new ApiService();
  }

  /**
   * Metoda odpowiedzialna za wyświetlanie głównej strony z planem
   */
  public function index()
  {
    include __DIR__ . '/../Views/layouts/header.php';
    echo '<main class="main">';
    include __DIR__ . '/../Views/schedule/index.php';
    echo '</main>';
  }

  /**
   * Metoda obsługująca wyszukiwanie planu
   */
  public function search()
  {
    try {
      // Sprawdź czy mamy żądanie POST
      if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new \Exception('Nieprawidłowa metoda żądania');
      }

      // Pobierz dane z API
      $scheduleData = $this->apiService->fetchScheduleData($_POST);

      // Zwróć odpowiedź w formacie JSON
      header('Content-Type: application/json');
      echo json_encode($scheduleData);

    } catch (\Exception $e) {
      http_response_code(400);
      echo json_encode(['error' => $e->getMessage()]);
    }
  }
}
