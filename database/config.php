<?php
$config = [];
$config['db_dsn'] = 'sqlite:C:\Users\Kapi\Desktop\studia\sem5\ai1\a1\projekt_zespolowy\Biedroneczki-AI\data.db';
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
