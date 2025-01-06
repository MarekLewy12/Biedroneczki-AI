<?php
namespace App\Core;

class Router
{
  private $routes = [];

  // Metoda addRoute dodaje nową ścieżkę do routera
  public function addRoute($path, $controller, $action)
  {
    $this->routes[$path] = ['controller' => $controller, 'action' => $action];
  }

  // Metoda dispatch odpowiada za przekierowanie żądania na odpowiednią akcję kontrolera
  public function dispatch($uri)
  {
    $path = parse_url($uri, PHP_URL_PATH);

    if (isset($this->routes[$path])) {
      $controller = new $this->routes[$path]['controller']();
      $action = $this->routes[$path]['action'];
      return $controller->$action();
    }

    throw new \Exception('Strona nie została znaleziona');
  }
}
