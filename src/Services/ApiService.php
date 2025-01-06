<?php
namespace App\Services;

class ApiService
{
  private const BASE_URL = 'https://plan.zut.edu.pl/schedule_student.php';

  /**
   * Pobiera dane z API planu ZUT
   */
  public function fetchScheduleData(array $params): array
  {
    try {
      // parametry zapytania
      $queryParams = $this->prepareQueryParams($params);

      //  URL z parametrami
      $apiUrl = self::BASE_URL . '?' . http_build_query($queryParams);

      // Pobranie danych z API
      $response = @file_get_contents($apiUrl);
      if ($response === false) {
        throw new \Exception('Błąd podczas pobierania danych z API.');
      }

      // JSON
      $data = json_decode($response, true);
      if (json_last_error() !== JSON_ERROR_NONE) {
        throw new \Exception('Błąd podczas dekodowania danych JSON.');
      }

      // Zwrócenie danych
      return $data;

    } catch (\Exception $e) {
      // Logowanie błędu
      throw new \Exception('Nie udało się pobrać danych z API: ' . $e->getMessage());
    }
  }

  /**
   * Przygotowuje parametry do zapytania API
   */
  private function prepareQueryParams(array $params): array
  {
    $queryParams = [];

    // Dodaj parametry do zapytania jeśli nie są puste
    if (!empty($params['album'])) {
      $queryParams['number'] = $params['album'];
    }
    if (!empty($params['teacher'])) {
      $queryParams['teacher'] = $params['teacher'];
    }
    if (!empty($params['subject'])) {
      $queryParams['subject'] = $params['subject'];
    }
    if (!empty($params['room'])) {
      $queryParams['room'] = $params['room'];
    }
    if (!empty($params['group'])) {
      $queryParams['group'] = $params['group'];
    }

    // Dodaj daty (początek i koniec tygodnia)
    // TODO: Pobierać daty po kliknięciu strzałek w kalendarzu
    $queryParams['start'] = date('Y-m-d');
    $queryParams['end'] = date('Y-m-d', strtotime('+1 week'));

    return $queryParams;
  }
}
