<?php
require_once __DIR__ . '/../src/Core/Router.php';
require_once __DIR__ . '/../src/Controllers/ScheduleController.php';
require_once __DIR__ . '/../src/Services/ApiService.php';

// użycie przestrzeni nazw
use App\Core\Router;
use App\Controllers\ScheduleController;

// FRONT-CONTROLLER (kontroler główny)

// Inicjalizacja routera, pozwala to na przekierowanie żądania na odpowiednią akcję kontrolera
$router = new Router();
$router->addRoute('/', ScheduleController::class, 'index');
$router->addRoute('/search', ScheduleController::class, 'search');

// Obsługa żądań API
if (strpos($_SERVER['REQUEST_URI'], '/search') === 0) {
  // jeśli "/search" czyli żądanie API, to zwróć dane w formacie JSON
  try {
    $router->dispatch($_SERVER['REQUEST_URI']);
  } catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
  }
  exit;
}
?>


<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lepszy Plan - ZUT</title>
  <link rel="stylesheet" href="css/style.css">
  <link id="darkStyle" rel="stylesheet" href="css/darkstyle.css" disabled>
  <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>
</head>
<body>
<?php
  try {
    // Przekierowanie żądania na odpowiednią akcję kontrolera
    $router->dispatch($_SERVER['REQUEST_URI']);
  } catch (Exception $e) {
    die('Wystąpił błąd: ' . $e->getMessage());
  }
?>

<script type="module" src="/js/app.js"></script>
</body>
</html>
