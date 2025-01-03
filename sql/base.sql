CREATE TABLE Semestr (
                       id INTEGER PRIMARY KEY,
                       nazwa TEXT NOT NULL,
                       start DATE NOT NULL,
                       koniec DATE NOT NULL
);

CREATE TABLE Przedmiot (
                         id INTEGER PRIMARY KEY,
                         nazwa TEXT NOT NULL
);

CREATE TABLE Pokoj (
                     id INTEGER PRIMARY KEY,
                     nazwa TEXT NOT NULL
);

CREATE TABLE Grupa (
                     id INTEGER PRIMARY KEY,
                     nazwa TEXT NOT NULL
);

CREATE TABLE Prowadzacy (
                          id INTEGER PRIMARY KEY,
                          imie TEXT NOT NULL,
                          nazwisko TEXT NOT NULL,
                          numer_grupy INTEGER,
                          FOREIGN KEY (numer_grupy) REFERENCES Grupa(id)
);

CREATE TABLE Student (
                       numer_albumu INTEGER PRIMARY KEY,
                       imie TEXT NOT NULL,
                       nazwisko TEXT NOT NULL,
                       numer_grupy INTEGER NOT NULL,
                       FOREIGN KEY (numer_grupy) REFERENCES Grupa(id)
);

CREATE TABLE Zajecie (
                       id INTEGER PRIMARY KEY,
                       id_przedmiotu INTEGER NOT NULL,
                       id_grupa INTEGER NOT NULL,
                       id_pokoj INTEGER NOT NULL,
                       id_semestr INTEGER NOT NULL,
                       data DATE NOT NULL,
                       start TIME NOT NULL,
                       koniec TIME NOT NULL,
                       lesson_type TEXT CHECK(lesson_type IN ('L', 'A', 'W')) NOT NULL,
                       id_prowadzacy INTEGER NOT NULL,
                       FOREIGN KEY (id_przedmiotu) REFERENCES Przedmiot(id),
                       FOREIGN KEY (id_grupa) REFERENCES Grupa(id),
                       FOREIGN KEY (id_pokoj) REFERENCES Pokoj(id),
                       FOREIGN KEY (id_semestr) REFERENCES Semestr(id),
                       FOREIGN KEY (id_prowadzacy) REFERENCES Prowadzacy(id)
);
