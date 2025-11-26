create database Immobiliaris;

use Immobiliaris;


CREATE TABLE ruolo (
    Id_ruolo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(10) NOT NULL
);
CREATE TABLE admin (
    Id_admin INT PRIMARY KEY AUTO_INCREMENT,
    Id_ruolo INT,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    passw VARCHAR(255) NOT NULL,
    FOREIGN KEY (Id_ruolo) REFERENCES ruolo(Id_ruolo)
);



CREATE TABLE agente (
    Id_agente INT PRIMARY KEY AUTO_INCREMENT,
    Id_ruolo INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    città VARCHAR(16),
    email VARCHAR(100) NOT NULL UNIQUE,
    passw VARCHAR(255) NOT NULL,
    FOREIGN KEY (Id_ruolo) REFERENCES ruolo(Id_ruolo)
);

CREATE TABLE caratteristiche_immobile (
    Id_caratteristiche INT PRIMARY KEY AUTO_INCREMENT,
    tipologia VARCHAR(255) NOT NULL,
    piano VARCHAR(255) NOT NULL,
    ascensore BOOLEAN NOT NULL,
    arredato BOOLEAN NOT NULL,
    disponibilita VARCHAR(255) NOT NULL,
    contratto VARCHAR(255) NOT NULL,
    piani_edificio INT NOT NULL,
    anno_costruzione INT NOT NULL,
    classe_energetica VARCHAR(255) NOT NULL,
    accesso_disabili BOOLEAN NOT NULL,
    camere INT NOT NULL,
    bagni INT NOT NULL,
    balcone INT NOT NULL,
    riscaldamento VARCHAR(255) NOT NULL,
    terrazzo BOOLEAN NOT NULL,
    giardino BOOLEAN NOT NULL,
    box_auto BOOLEAN NOT NULL,
    cantina BOOLEAN NOT NULL,
    altre_caratteristiche TEXT NOT NULL
);

CREATE TABLE immobile (
    Id_immobile INT PRIMARY KEY AUTO_INCREMENT,
    foto VARCHAR(1000) NOT NULL,
    cap INT NOT NULL,
    citta VARCHAR(100) NOT NULL,
    indirizzo VARCHAR(255) NOT NULL,
    prezzo DOUBLE NOT NULL,
    locali INT NOT NULL,
    superficie INT NOT NULL,
    descrizione TEXT NOT NULL,
    Id_caratteristiche INT NOT NULL,
    planimetria VARCHAR(255) NOT NULL,
    mappa VARCHAR(255) NOT NULL,
    CONSTRAINT fk_caratteristiche FOREIGN KEY (Id_caratteristiche) REFERENCES caratteristiche_immobile(Id_caratteristiche)
);

CREATE TABLE utente (
    Id_utente INT PRIMARY KEY AUTO_INCREMENT,
    Id_ruolo INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    codice_fiscale VARCHAR(16),
    email VARCHAR(100) NOT NULL UNIQUE,
    passw VARCHAR(255) NOT NULL,
    CONSTRAINT fk_utente_ruolo FOREIGN KEY (Id_ruolo) REFERENCES ruolo(Id_ruolo)
);

CREATE TABLE valutazione (
    Id_valutazione INT PRIMARY KEY AUTO_INCREMENT,
    Id_utente INT NOT NULL,
    cap VARCHAR(5) NOT NULL,
    citta VARCHAR(100) NOT NULL,
    indirizzo VARCHAR(255) NOT NULL,
    tipologia ENUM ('APPARTAMENTO', 'CASA_INDIPENDENTE') NOT NULL,
    piano VARCHAR(50) NOT NULL,
    locali INT NOT NULL,
    superficie INT NOT NULL,
    condizioni ENUM ('NUOVO', 'RISTRUTTURATO', 'DA_RISTRUTTURARE') NOT NULL,
    bagni INT NOT NULL,
    anno_costruzione INT NOT NULL,
    classe_energetica ENUM('A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G') NOT NULL,
    dotazioni_cantina BOOLEAN,
    dotazioni_terrazzo BOOLEAN,
    dotazioni_balcone BOOLEAN,
    dotazioni_garage BOOLEAN,
    dotazioni_piscina BOOLEAN,
    dotazioni_giardino BOOLEAN,
    dotazioni_ascensore BOOLEAN,
    CONSTRAINT fk_valutazione_utente FOREIGN KEY (Id_utente) REFERENCES utente(Id_utente)
);



CREATE TABLE visita (
    Id_visita INT PRIMARY KEY AUTO_INCREMENT,
    Id_immobile INT NOT NULL,
    Id_agente INT NOT NULL,
    Id_utente INT NOT NULL,
    data DATETIME NOT NULL,
    CONSTRAINT fk_visita_immobile FOREIGN KEY (Id_immobile) REFERENCES immobile(Id_immobile),
    CONSTRAINT fk_visita_agente FOREIGN KEY (Id_agente) REFERENCES agente(Id_agente),
    CONSTRAINT fk_visita_utente FOREIGN KEY (Id_utente) REFERENCES utente(Id_utente)
);

CREATE TABLE prezzo_mercato(
	cap VARCHAR(10) PRIMARY KEY,
    prezzo_min_mq DOUBLE,
    prezzo_max_mq DOUBLE,
    prezzo_medio_mq DOUBLE
);

CREATE TABLE contratto_esclusivo (
    Id_contratto INT PRIMARY KEY AUTO_INCREMENT,
    Id_immobile INT NOT NULL,
    Id_utente INT NOT NULL,
    data_di_scadenza Date NOT NULL,
    prezzo DOUBLE NOT NULL,
    CONSTRAINT fk_contratto_esclusivo_Id_immobile FOREIGN KEY (Id_immobile) REFERENCES immobile(Id_immobile),
	CONSTRAINT fk_contratto_esclusivo_Id_utente FOREIGN KEY (Id_utente) REFERENCES utente(Id_utente)
);


