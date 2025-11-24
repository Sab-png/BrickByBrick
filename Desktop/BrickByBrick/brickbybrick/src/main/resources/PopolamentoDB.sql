-- 1. RUOLO
INSERT INTO ruolo (nome) VALUES 
('Admin'),
('Agente'),
('Utente');

-- 2. ADMIN
INSERT INTO admin (Id_ruolo, nome, cognome, email, passw) VALUES
(1, 'Luca', 'Bianchi', 'luca.bianchi@immobiliaris.it', 'admin123'),
(1, 'Maria', 'Rossi', 'maria.rossi@immobiliaris.it', 'admin456');

-- 3. AGENTE
INSERT INTO agente (Id_ruolo, nome, cognome, telefono, città, email, passw) VALUES
(2, 'Marco', 'Verdi', '3456789012', 'Milano', 'marco.verdi@immobiliaris.it', 'agente123'),
(2, 'Chiara', 'Neri', '3471234567', 'Roma', 'chiara.neri@immobiliaris.it', 'agente456'),
(2, 'Giulia', 'Conti', '3499876543', 'Torino', 'giulia.conti@immobiliaris.it', 'agente789');

-- 4. CARATTERISTICHE IMMOBILE
INSERT INTO caratteristiche_immobile (
    tipologia, piano, ascensore, arredato, disponibilita, contratto,
    piani_edificio, anno_costruzione, classe_energetica, accesso_disabili,
    camere, bagni, balcone, riscaldamento, terrazzo, giardino, box_auto, cantina, altre_caratteristiche
) VALUES
('Appartamento', '3° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 5, 2010, 'A+', TRUE, 3, 2, 2, 'Autonomo', TRUE, FALSE, TRUE, TRUE, 'Vista panoramica, parquet'),
('Villetta', 'Terra', FALSE, TRUE, 'Disponibile', 'Affitto', 1, 2018, 'B', TRUE, 4, 2, 1, 'Centralizzato', TRUE, TRUE, TRUE, TRUE, 'Giardino privato recintato'),
('Attico', '5° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 5, 2015, 'A', TRUE, 5, 3, 3, 'Autonomo', TRUE, FALSE, TRUE, TRUE, 'Ampio terrazzo con vista montagna');

-- 5. IMMOBILE
INSERT INTO immobile (
    foto, regione, cap, citta, indirizzo, prezzo, locali, superficie,
    descrizione, Id_caratteristiche, planimetria, mappa
) VALUES
('foto1.jpg', 'Lombardia', 20100, 'Milano', 'Via Dante 12', 350000, 4, 120, 'Appartamento moderno in zona centrale con vista Duomo', 1, 'planimetria1.pdf', 'mappa1.png'),
('foto2.jpg', 'Lazio', 00100, 'Roma', 'Via Appia 45', 1800, 5, 150, 'Villetta indipendente con giardino e garage doppio', 2, 'planimetria2.pdf', 'mappa2.png'),
('foto3.jpg', 'Piemonte', 10100, 'Torino', 'Corso Francia 220', 480000, 6, 180, 'Attico panoramico con ampio terrazzo', 3, 'planimetria3.pdf', 'mappa3.png');

-- 6. UTENTE
INSERT INTO utente (Id_ruolo, nome, cognome, telefono, codice_fiscale, email, passw) VALUES
(3, 'Andrea', 'Riva', '3331234567', 'RVAAND98A01H501J', 'andrea.riva@email.it', 'utente123'),
(3, 'Laura', 'Moretti', '3342345678', 'MRRLRA90C45F205T', 'laura.moretti@email.it', 'utente456'),
(3, 'Giorgio', 'Ferrari', '3353456789', 'FRRGRG85M12L219U', 'giorgio.ferrari@email.it', 'utente789');

-- 7. VALUTAZIONE
INSERT INTO valutazione (
    Id_utente, regione, cap, citta, indirizzo, tipologia, piano,
    locali, superficie, condizioni, bagni, anno_costruzione, ascensore, classe_energetica
) VALUES
(1, 'Lombardia', 20100, 'Milano', 'Via Torino 20', 'Appartamento', '2°', 3, 90, 'Ottime', 1, 2005, TRUE, 'A'),
(2, 'Lazio', 00100, 'Roma', 'Via del Corso 56', 'Appartamento', '4°', 4, 110, 'Buone', 2, 2012, TRUE, 'B'),
(3, 'Piemonte', 10100, 'Torino', 'Via Roma 10', 'Attico', '5°', 5, 160, 'Nuove', 3, 2018, TRUE, 'A+');

-- 8. VISITA
INSERT INTO visita (Id_immobile, Id_agente, data) VALUES
(1, 1, '2025-11-15 10:00:00'),
(2, 2, '2025-11-16 15:30:00'),
(3, 3, '2025-11-20 11:00:00');


-- Inserimento dei dati per Torino
INSERT INTO prezzi_mercato (cap, prezzo_min_mq, prezzo_max_mq) VALUES
('10100', 3800, 5000),
('10121', 3500, 4500),
('10122', 2800, 3500),
('10123', 2200, 3000),
('10124', 2400, 3200),
('10125', 2100, 2800),
('10126', 2600, 3200),
('10127', 1800, 2500),
('10128', 1500, 2200),
('10129', 2100, 2800),
('10130', 1800, 2400),
('10131', 2200, 3200),
('10132', 1900, 2600),
('10133', 1600, 2400),
('10134', 3600, 4500),
('10135', 2000, 2800),
('10136', 1800, 2400),
('10137', 2000, 2800),
('10138', 1800, 2400),
('10139', 2000, 2900),
('10140', 1500, 2100),
('10141', 1900, 2600),
('10142', 1700, 2400),
('10143', 1800, 2500),
('10144', 1600, 2200),
('10145', 1500, 2300),
('10146', 1800, 2400),
('10147', 2200, 2800);

-- Inserimento dei dati per Alessandria
INSERT INTO prezzi_mercato (cap, prezzo_min_mq, prezzo_max_mq) VALUES
('15100', 1500, 2200),
('15121', 1300, 1800),
('15122', 1200, 1700),
('15123', 1100, 1500),
('15124', 1100, 1500),
('15125', 1200, 1800),
('15126', 1300, 1700),
('15127', 1100, 1500),
('15128', 900, 1200),
('15129', 1400, 1900),
('15130', 1000, 1500);

-- Inserimento dei dati per Cuneo
INSERT INTO prezzi_mercato (cap, prezzo_min_mq, prezzo_max_mq) VALUES
('12100', 1800, 2500),
('12121', 1500, 2000),
('12122', 1200, 1800),
('12123', 1300, 1800),
('12124', 1100, 1600),
('12125', 1200, 1700),
('12126', 1500, 2000),
('12127', 1100, 1600),
('12128', 1300, 1800),
('12129', 900, 1200),
('12130', 1100, 1600);

-- Inserimento dei dati per Asti
INSERT INTO prezzi_mercato (cap, prezzo_min_mq, prezzo_max_mq) VALUES
('14100', 1500, 2200),
('14121', 1200, 1800),
('14122', 1100, 1600),
('14123', 1100, 1600),
('14124', 1000, 1500),
('14125', 1100, 1500),
('14126', 1200, 1700),
('14127', 1100, 1500),
('14128', 1100, 1600),
('14129', 900, 1200);
