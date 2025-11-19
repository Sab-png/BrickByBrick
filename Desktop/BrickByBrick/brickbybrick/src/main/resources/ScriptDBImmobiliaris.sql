create database Immobiliaris;

use Immobiliaris;
drop database Immobiliaris;
CREATE TABLE ruolo (
Id_ruolo INT PRIMARY KEY,
nome VARCHAR(10)
);
CREATE TABLE utente (
    Id_utente INT PRIMARY KEY,
    Id_ruolo INT,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    email VARCHAR(100),
    passw varchar (100),
    numero_di_telefono VARCHAR(15),
    codice_fiscale CHAR(16),
    FOREIGN KEY (Id_ruolo) REFERENCES ruolo(Id_ruolo)
);

-- Creazione della tabella 'Admin'
CREATE TABLE admin (
    Id_admin INT PRIMARY KEY AUTO_INCREMENT,
    Id_ruolo INT,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    email VARCHAR(100),
    passw varchar (100),
    FOREIGN KEY (Id_ruolo) REFERENCES ruolo(Id_ruolo)
);

-- Creazione della tabella 'Agente'
CREATE TABLE agente (
    Id_agente INT PRIMARY KEY,
    Id_ruolo int,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    email VARCHAR(100),
    passw varchar (100),
    numero_di_telefono VARCHAR(15),
    citta VARCHAR(50),
    FOREIGN KEY (Id_ruolo) REFERENCES ruolo(Id_ruolo)
   
);
-- Creazione della tabella 'Caratteristiche_Immobile'
CREATE TABLE caratteristiche_immobile (
    Id_caratteristiche INT PRIMARY KEY,
    tipologia VARCHAR(50),
    piano varchar(50),
    ascensore boolean, 
    arredato varchar(50),
    disponibilita VARCHAR(50),
    contratto VARCHAR(50),
    piani_edificio INT,
    anno_di_costruzione INT,
    classe_energetica VARCHAR(10),
    accesso_a_disabili boolean,
    camere_da_letto INT,
    bagni INT,
    balcone int,
    riscaldamento varchar(50),
    terrazzo boolean,
    giardino boolean,
    box_auto int,
    cantina boolean,
    altre_caratteristiche TEXT
);

-- Creazione della tabella 'Immobili'
CREATE TABLE immobile (
    Id_immobile INT PRIMARY KEY,
    foto BLOB, -- Usa BLOB se desideri memorizzare immagini direttamente nel DB
    cap VARCHAR(10),
    citta VARCHAR(100),
    indirizzo VARCHAR(255),
    prezzo DECIMAL(10, 2),
    locali INT,
    superficie INT,
    descrizione TEXT,
    Id_caratteristiche INT,
    FOREIGN KEY (Id_caratteristiche) REFERENCES caratteristiche_immobile(Id_caratteristiche)
);



-- Creazione della tabella 'Valutazione'
CREATE TABLE valutazione (
    Id_valutazione INT PRIMARY KEY,
    Id_utente INT,
    citta VARCHAR(100),
    cap VARCHAR(10),
    indirizzo VARCHAR(255),
    tipologia_immobile VARCHAR(50),
    piano INT,
    locali INT,
    superficie INT,
    condizioni VARCHAR(50),
    bagno INT,
    anno_costruzione INT,
    ascensore boolean,
    classe_energetica VARCHAR(10),
    terrazzo boolean,
    giardino boolean,
    box_auto int,
    cantina boolean,
    balcone boolean,
    piscina boolean,
    FOREIGN KEY (Id_utente) REFERENCES utente(Id_utente)
);

-- Creazione della tabella 'Visita'
-- CREATE TABLE visita (
--     Id_visita INT PRIMARY KEY,
--     Id_immobile INT,
--     Id_agente INT,
--     data DATE,
--     FOREIGN KEY (Id_immobile) REFERENCES immobile(Id_immobile),
--     FOREIGN KEY (Id_agente) REFERENCES agente(Id_agente)
-- );