-- IMPORTANTE: Le password devono essere hashate con BCrypt prima di essere inserite nel database.
-- Per generare gli hash BCrypt, usa un tool online o esegui questo codice Java:
-- BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
-- String hash = encoder.encode("password");
-- 
-- Hash BCrypt per le password di test (tutte le password sono "password123" per semplicità):
-- $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYq5x5x5x5u (per admin123)
-- $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYq5x5x5x5u (per admin456)
-- 
-- NOTA: Per sviluppo, puoi usare password in chiaro temporaneamente, ma in produzione DEVI usare BCrypt.

-- 1. RUOLO
INSERT INTO ruolo (nome) VALUES 
('Admin'),
('Agente'),
('Utente');

-- 2. ADMIN
INSERT INTO admin (Id_ruolo, nome, cognome, email, passw) VALUES
(1, 'Luca', 'Bianchi', 'luca.bianchi@admin.net', 'admin123'),
(1, 'Maria', 'Rossi', 'maria.rossi@admin.net', 'admin456');

-- 3. AGENTE
INSERT INTO agente (Id_ruolo, nome, cognome, telefono, città, email, passw) VALUES
(2, 'Marco', 'Verdi', '3456789012', 'Milano', 'marco.verdi@agente.net', 'agente123'),
(2, 'Chiara', 'Neri', '3471234567', 'Roma', 'chiara.neri@agente.net', 'agente456'),
(2, 'Giulia', 'Conti', '3499876543', 'Torino', 'giulia.conti@agente.net', 'agente789');

-- 4. CARATTERISTICHE IMMOBILE
INSERT INTO caratteristiche_immobile (
    tipologia, piano, ascensore, arredato, disponibilita, contratto,
    piani_edificio, anno_costruzione, classe_energetica, accesso_disabili,
    camere, bagni, balcone, riscaldamento, terrazzo, giardino, box_auto, cantina, altre_caratteristiche
) VALUES
('Appartamento', '3° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 5, 2010, 'A1', TRUE, 3, 2, 2, 'Autonomo', TRUE, FALSE, TRUE, TRUE, 'Vista panoramica, parquet'),
('Villetta', 'Terra', FALSE, TRUE, 'Disponibile', 'Affitto', 1, 2018, 'B', TRUE, 4, 2, 1, 'Centralizzato', TRUE, TRUE, TRUE, TRUE, 'Giardino privato recintato'),
('Attico', '5° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 5, 2015, 'C', TRUE, 5, 3, 3, 'Autonomo', TRUE, FALSE, TRUE, TRUE, 'Ampio terrazzo con vista montagna');

-- 5. IMMOBILE
INSERT INTO immobile (
    foto, cap, citta, indirizzo, prezzo, locali, superficie,
    descrizione, Id_caratteristiche, planimetria, mappa
) VALUES
('foto1.jpg', 20100, 'Milano', 'Via Dante 12', 350000, 4, 120, 'Appartamento moderno in zona centrale con vista Duomo', 1, 'planimetria1.pdf', 'mappa1.png'),
('foto2.jpg',  00100, 'Roma', 'Via Appia 45', 1800, 5, 150, 'Villetta indipendente con giardino e garage doppio', 2, 'planimetria2.pdf', 'mappa2.png'),
('foto3.jpg',  10100, 'Torino', 'Corso Francia 220', 480000, 6, 180, 'Attico panoramico con ampio terrazzo', 3, 'planimetria3.pdf', 'mappa3.png');

-- 6. UTENTE
INSERT INTO utente (Id_ruolo, nome, cognome, telefono, codice_fiscale, email, passw) VALUES
(3, 'Andrea', 'Riva', '3331234567', 'RVAAND98A01H501J', 'andrea.riva@user.net', 'utente123'),
(3, 'Laura', 'Moretti', '3342345678', 'MRRLRA90C45F205T', 'laura.moretti@user.net', 'utente456'),
(3, 'Giorgio', 'Ferrari', '3353456789', 'FRRGRG85M12L219U', 'giorgio.ferrari@user.net', 'utente789');

-- 8. VISITA
INSERT INTO visita (Id_immobile, Id_agente, data,Id_utente) VALUES
INSERT INTO visita (Id_immobile, Id_agente, data,Id_utente) VALUES
(1, 1, '2025-11-15 10:00:00',1),
(2, 2, '2025-11-16 15:30:00',2),
(3, 3, '2025-11-20 11:00:00',3);


