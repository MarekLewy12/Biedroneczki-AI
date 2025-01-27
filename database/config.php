<?php
$config = [];

$dbPath = dirname(__DIR__) . '/data.db';
$config['db_dsn'] = 'sqlite:' . $dbPath; // zmiana ścieżki
$config['db_user'] = ''; // Pusty, ponieważ SQLite nie wymaga użytkownika
$config['db_pass'] = ''; // Pusty, ponieważ SQLite nie wymaga hasła

try {
  $pdo = new PDO(
    $config['db_dsn'],
    $config['db_user'],
    $config['db_pass'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
//  echo "Połączenie z bazą danych SQLite udane!";
} catch (PDOException $e) {
//  echo "Błąd połączenia z bazą: " . $e->getMessage();
}
