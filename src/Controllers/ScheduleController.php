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
      // Pobierz dane z API
      $scheduleData = $this->apiService->getSchedule($_POST);

      // Ustaw odpowiedni nagłówek
      header('Content-Type: application/json');

      // Zwróć dane w formacie JSON
      echo $scheduleData;
    } catch (\Exception $e) {
      http_response_code(400);
      echo json_encode(['error' => $e->getMessage()]);
    }
  }


  public function testError()
  {
    header('Content-Type: application/json');
    http_response_code(500); // wywołujemy błąd 500
    echo json_encode(['error' => 'Testowy błąd API']);
  }

  public function statistics()
  {
    include __DIR__ . '/../Views/layouts/header.php';
    echo '<main class="main">';
    include __DIR__ . '/../Views/components/statistics.php';
    echo '</main>';
  }
}
