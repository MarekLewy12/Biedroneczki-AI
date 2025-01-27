<?php
try {
  $pdo = new PDO('sqlite:data.db');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Pobierz listę wszystkich tabel w bazie danych
  $tables = $pdo->query("SELECT name FROM sqlite_master WHERE type='table'")->fetchAll(PDO::FETCH_COLUMN);

  // Usuń wszystkie dane z każdej tabeli
  foreach ($tables as $table) {
    $pdo->exec("DELETE FROM $table");
  }

  echo "Wszystkie dane zostały usunięte, struktura tabel została zachowana.";
} catch (PDOException $e) {
  echo "Błąd: " . $e->getMessage();
}
