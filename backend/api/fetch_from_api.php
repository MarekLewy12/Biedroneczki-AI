<?php

use JetBrains\PhpStorm\NoReturn;

header('Content-Type: application/json');

// Funkcja pomocnicza do zwracania błędów JSON-a
#[NoReturn] function returnErrorJson($code, $message) {
    http_response_code($code);
    echo json_encode(array('error' => $message));
    exit();
}

// Sprawdzenie czy metoda to POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    returnErrorJson(405, 'Metoda niepoprawna. Użyj metody POST.');
}

// Pobranie danych z formularza
$wykladowca = $_POST['teacher'] ?? '';
$przedmiot  = $_POST['subject'] ?? '';
$sala       = $_POST['room']    ?? '';
$grupa      = $_POST['group']   ?? '';
$album      = $_POST['album']   ?? '';

// Obliczenie daty początkowej i końcowej w formacie YYYY-MM-DD
$startDate = date('Y-m-d');
$endDate = date('Y-m-d', strtotime('+1 week'));  // +1 tydzień

// tablica parametrów do przekazania do API
$queryParams = [];

// Parametry planu
if (!empty($album)) {
  $queryParams['number'] = $album;
}
if (!empty($wykladowca)) {
  $queryParams['teacher'] = $wykladowca;
}
if (!empty($przedmiot)) {
  $queryParams['subject'] = $przedmiot;
}
if (!empty($sala)) {
  $queryParams['room'] = $sala;
}
if (!empty($grupa)) {
  $queryParams['group'] = $grupa;
}

// Sprawdzenie czy podano cokolwiek
if (empty($queryParams)) {
    returnErrorJson(400, 'Nie podano żadnych parametrów.');
}

// Dodanie daty początkowej i końcowej do parametrów
$queryParams['start'] = $startDate;
$queryParams['end'] = $endDate;

// Budowanie URL-a z parametrami
$baseApiUrl = "https://plan.zut.edu.pl/schedule_student.php";
$apiUrl = $baseApiUrl . '?' . http_build_query($queryParams);

// Pobranie danych z API
$apiResponse = @file_get_contents($apiUrl);
if ($apiResponse === false) {
    returnErrorJson(500, 'Błąd podczas pobierania danych z API.');
}

// Dekodowanie JSON-a
$apiData = json_decode($apiResponse, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    returnErrorJson(500, 'Błąd podczas dekodowania danych z API.');
}

// Zwrócenie danych z API
echo json_encode($apiData);
