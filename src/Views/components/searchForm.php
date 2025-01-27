<?php
?>
<form id="searchForm" class="search-form" method="post">
  <label for="teacher">Wykładowca</label>
  <input type="text" id="teacher" name="teacher" pattern="^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$" title="Wprowadź tylko litery, bez cyfr i znaków specjalnych.">


  <label for="subject">Przedmiot</label>
  <input type="text" id="subject" name="subject">

  <label for="room">Sala</label>
  <input type="text" id="room" name="room">

  <label for="group">Numer grupy</label>
  <input type="text" id="group" name="group">

  <label for="album">Numer Albumu</label>
  <input type="text" id="album" name="student_id" maxlength="5" pattern="^\d{5}$" title="Numer albumu musi składać się z dokładnie 5 cyfr.">


  <div class="form-buttons">
    <button class="search-button">Szukaj</button>
    <button class="reset-button">Wyczyść</button>
  </div>
</form>
