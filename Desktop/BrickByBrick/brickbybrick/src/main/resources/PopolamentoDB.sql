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
(2, 'Luca', 'Bianchi', '3451122334', 'Torino', 'luca.bianchi@agente.net', 'agente101'),
(2, 'Sara', 'Rossi', '3475566778', 'Asti', 'sara.rossi@agente.net', 'agente102'),
(2, 'Paolo', 'Gallo', '3492233445', 'Cuneo', 'paolo.gallo@agente.net', 'agente103'),
(2, 'Elena', 'Ferrero', '3469988776', 'Alessandria', 'elena.ferrero@agente.net', 'agente104'),
(2, 'Davide', 'Costa', '3486655443', 'Torino', 'davide.costa@agente.net', 'agente105');


-- 4. CARATTERISTICHE IMMOBILE
INSERT INTO caratteristiche_immobile (
    tipologia, piano, ascensore, arredato, disponibilita, contratto,
    piani_edificio, anno_costruzione, classe_energetica, accesso_disabili,
    camere, bagni, balcone, riscaldamento, terrazzo, giardino, box_auto, cantina, altre_caratteristiche
) VALUES
-- 1
('Appartamento', '3° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 5, 2012, 'A2', TRUE, 3, 2, 2, 'Autonomo', FALSE, FALSE, TRUE, TRUE, 'Centro città, luminoso'),
-- 2
('Appartamento', '2° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 4, 2005, 'B', TRUE, 2, 1, 1, 'Centralizzato', FALSE, TRUE, FALSE, TRUE, 'Balcone panoramico'),
-- 3
('Appartamento', '4° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 6, 2010, 'B', TRUE, 3, 2, 2, 'Autonomo', FALSE, FALSE, TRUE, TRUE, 'Zona tranquilla'),
-- 4
('Bilocale', '1° piano', FALSE, TRUE, 'Disponibile', 'Vendita', 3, 2018, 'A1', TRUE, 1, 1, 1, 'Autonomo', FALSE, FALSE, FALSE, TRUE, 'Perfetto per single'),
-- 5
('Attico', '6° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 6, 2015, 'B', TRUE, 4, 2, 2, 'Autonomo', TRUE, FALSE, TRUE, TRUE, 'Terrazzo con vista'),

-- 6
('Appartamento', '2° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 4, 2008, 'C', TRUE, 3, 1, 1, 'Centralizzato', FALSE, FALSE, TRUE, TRUE, 'Stabile signorile'),
-- 7
('Appartamento', '3° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 5, 2011, 'B', TRUE, 3, 2, 2, 'Autonomo', FALSE, FALSE, TRUE, TRUE, 'Incluso box auto'),
-- 8
('Bilocale', 'Terra', FALSE, TRUE, 'Disponibile', 'Vendita', 2, 2019, 'A3', TRUE, 1, 1, 1, 'Autonomo', FALSE, TRUE, FALSE, TRUE, 'Ottimo come investimento'),
-- 9
('Appartamento', '4° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 6, 2006, 'B', TRUE, 3, 1, 2, 'Centralizzato', FALSE, FALSE, TRUE, TRUE, 'Doppi balconi'),
-- 10
('Trilocale', '2° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 4, 2014, 'A2', TRUE, 2, 1, 1, 'Autonomo', FALSE, FALSE, TRUE, TRUE, 'Ottima esposizione'),

-- 11
('Appartamento', '3° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 5, 2010, 'B', TRUE, 2, 1, 1, 'Centralizzato', FALSE, FALSE, FALSE, TRUE, 'Cucina abitabile'),
-- 12
('Appartamento', '1° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 4, 2009, 'C', TRUE, 3, 2, 2, 'Autonomo', FALSE, TRUE, TRUE, TRUE, 'Garage incluso'),
-- 13
('Appartamento', '2° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 4, 1920, 'D', FALSE, 4, 2, 3, 'Centralizzato', FALSE, FALSE, FALSE, TRUE, 'Finiture d’epoca'),
-- 14
('Bilocale', '3° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 5, 2016, 'A2', TRUE, 1, 1, 1, 'Autonomo', FALSE, FALSE, FALSE, TRUE, 'Ristrutturato'),
-- 15
('Appartamento', 'Terra', FALSE, TRUE, 'Disponibile', 'Vendita', 2, 2013, 'B', TRUE, 3, 2, 1, 'Autonomo', FALSE, TRUE, TRUE, TRUE, 'Giardino privato'),

-- 16
('Appartamento', '2° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 3, 2011, 'A3', TRUE, 2, 1, 1, 'Autonomo', FALSE, FALSE, TRUE, TRUE, 'Vicino ai servizi'),
-- 17
('Appartamento', '5° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 6, 2007, 'B', TRUE, 3, 2, 1, 'Autonomo', TRUE, FALSE, TRUE, TRUE, 'Finiture moderne'),
-- 18
('Bilocale', '1° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 3, 2020, 'A1', TRUE, 1, 1, 1, 'Centralizzato', FALSE, TRUE, FALSE, TRUE, 'Edificio recente'),
-- 19
('Appartamento', '4° piano', TRUE, FALSE, 'Disponibile', 'Vendita', 6, 2014, 'B', TRUE, 4, 2, 2, 'Autonomo', FALSE, FALSE, TRUE, TRUE, 'Vista aperta'),
-- 20
('Trilocale', '3° piano', TRUE, TRUE, 'Disponibile', 'Vendita', 5, 2012, 'A2', TRUE, 2, 1, 1, 'Autonomo', FALSE, FALSE, TRUE, TRUE, 'Balcone e cantina');

-- 5. IMMOBILE
INSERT INTO immobile (
    foto, cap, citta, indirizzo, prezzo, locali, superficie,
    descrizione, Id_caratteristiche, planimetria, mappa
) VALUES
('foto1.jpg', 10100, 'Torino', 'Via Roma 15', 310000, 4, 110, 'Appartamento luminoso in pieno centro', 1, 'planimetria1.pdf', 'mappa1.png'),
('foto2.jpg', 15121, 'Alessandria', 'Corso Acqui 88', 185000, 3, 95, 'Alloggio ristrutturato con balcone panoramico', 2, 'planimetria2.pdf', 'mappa2.png'),
('foto3.jpg', 12100, 'Cuneo', 'Via Boves 7', 220000, 5, 140, 'Ampio appartamento con doppi servizi', 3, 'planimetria3.pdf', 'mappa3.png'),
('foto4.jpg', 14100, 'Asti', 'Via Garibaldi 30', 145000, 3, 85, 'Bilocale moderno in zona tranquilla', 4, 'planimetria4.pdf', 'mappa4.png'),
('foto5.jpg', 10138, 'Torino', 'Via Nizza 250', 420000, 6, 175, 'Attico con terrazzo e vista collina', 5, 'planimetria5.pdf', 'mappa5.png'),

('foto6.jpg', 15122, 'Alessandria', 'Via Marengo 140', 160000, 4, 105, 'Appartamento in stabile signorile', 6, 'planimetria6.pdf', 'mappa6.png'),
('foto7.jpg', 12100, 'Cuneo', 'Corso Gramsci 5', 295000, 5, 155, 'Quadrilocale con box auto incluso', 7, 'planimetria7.pdf', 'mappa7.png'),
('foto8.jpg', 14100, 'Asti', 'Via Cavour 12', 130000, 2, 70, 'Bilocale ideale per investimento', 8, 'planimetria8.pdf', 'mappa8.png'),
('foto9.jpg', 10151, 'Torino', 'Via Chiesa della Salute 90', 250000, 4, 120, 'Alloggio ristrutturato con doppi balconi', 9, 'planimetria9.pdf', 'mappa9.png'),
('foto10.jpg', 15100, 'Alessandria', 'Piazza Matteotti 22', 200000, 4, 118, 'Trilocale in zona servita, ottima esposizione', 10, 'planimetria10.pdf', 'mappa10.png'),

('foto11.jpg', 12100, 'Cuneo', 'Via Savona 33', 175000, 3, 90, 'Appartamento con cucina abitabile', 11, 'planimetria11.pdf', 'mappa11.png'),
('foto12.jpg', 14100, 'Asti', 'Corso Dante 2', 235000, 5, 145, 'Appartamento con ampio salone e garage', 12, 'planimetria12.pdf', 'mappa12.png'),
('foto13.jpg', 10144, 'Torino', 'Via Po 50', 500000, 7, 200, 'Prestigioso appartamento d’epoca', 13, 'planimetria13.pdf', 'mappa13.png'),
('foto14.jpg', 15121, 'Alessandria', 'Via Trotti 18', 155000, 3, 82, 'Luminoso bilocale vicino al centro', 14, 'planimetria14.pdf', 'mappa14.png'),
('foto15.jpg', 12100, 'Cuneo', 'Via Mondovì 60', 260000, 5, 160, 'Appartamento con giardino privato', 15, 'planimetria15.pdf', 'mappa15.png'),

('foto16.jpg', 14100, 'Asti', 'Via San Martino 77', 190000, 4, 115, 'Quadrilocale ristrutturato vicino ai servizi', 16, 'planimetria16.pdf', 'mappa16.png'),
('foto17.jpg', 10121, 'Torino', 'Corso Vittorio Emanuele 10', 370000, 5, 155, 'Elegante appartamento con finiture di pregio', 17, 'planimetria17.pdf', 'mappa17.png'),
('foto18.jpg', 15122, 'Alessandria', 'Via Parma 9', 140000, 3, 78, 'Bilocale moderno in condominio recente', 18, 'planimetria18.pdf', 'mappa18.png'),
('foto19.jpg', 12100, 'Cuneo', 'Via Roma 112', 310000, 6, 185, 'Ampio appartamento con vista aperta', 19, 'planimetria19.pdf', 'mappa19.png'),
('foto20.jpg', 14100, 'Asti', 'Via Quintino Sella 4', 165000, 3, 88, 'Trilocale con balcone e cantina', 20, 'planimetria20.pdf', 'mappa20.png');


-- 6. UTENTE
INSERT INTO utente (Id_ruolo, nome, cognome, telefono, codice_fiscale, email, passw) VALUES
(3, 'Andrea', 'Riva', '3330000001', 'RVANDR90A01H501', 'andrea.riva@user.net', 'utente001'),
(3, 'Laura', 'Moretti', '3330000002', 'MRTLRA91B12F205', 'laura.moretti@user.net', 'utente002'),
(3, 'Giorgio', 'Ferrari', '3330000003', 'FRRGRG85C23L219', 'giorgio.ferrari@user.net', 'utente003'),
(3, 'Marta', 'Colombo', '3330000004', 'CLMMRT92D14H501', 'marta.colombo@user.net', 'utente004'),
(3, 'Luca', 'Gatti', '3330000005', 'GTTLCA88E05L219', 'luca.gatti@user.net', 'utente005'),
(3, 'Chiara', 'Serra', '3330000006', 'SRRCHR95F26F205', 'chiara.serra@user.net', 'utente006'),
(3, 'Paolo', 'Villa', '3330000007', 'VLLPLA83G17H501', 'paolo.villa@user.net', 'utente007'),
(3, 'Elisa', 'Ricci', '3330000008', 'RCCELS89H28L219', 'elisa.ricci@user.net', 'utente008'),
(3, 'Davide', 'Fontana', '3330000009', 'FNTDVD87L09F205', 'davide.fontana@user.net', 'utente009'),
(3, 'Silvia', 'Marini', '3330000010', 'MRNSLV93M30H501', 'silvia.marini@user.net', 'utente010'),

(3, 'Marco', 'Russo', '3330000011', 'RSSMRC82A11L219', 'marco.russo@user.net', 'utente011'),
(3, 'Sara', 'Lombardi', '3330000012', 'LMBsRA94B22F205', 'sara.lombardi@user.net', 'utente012'),
(3, 'Stefano', 'Greco', '3330000013', 'GRCSTF90C03H501', 'stefano.greco@user.net', 'utente013'),
(3, 'Alessia', 'Rizzi', '3330000014', 'RZZLSS96D14L219', 'alessia.rizzi@user.net', 'utente014'),
(3, 'Giulia', 'Costa', '3330000015', 'CSTGLI91E25F205', 'giulia.costa@user.net', 'utente015'),
(3, 'Federico', 'Testa', '3330000016', 'TSTFRC86F16H501', 'federico.testa@user.net', 'utente016'),
(3, 'Ilaria', 'Barbieri', '3330000017', 'BRBILR95G27L219', 'ilaria.barbieri@user.net', 'utente017'),
(3, 'Matteo', 'Gentile', '3330000018', 'GNTMTT84H18F205', 'matteo.gentile@user.net', 'utente018'),
(3, 'Elena', 'Giordano', '3330000019', 'GRDLNE89L09H501', 'elena.giordano@user.net', 'utente019'),
(3, 'Simone', 'Martini', '3330000020', 'MRTSMN92M20F205', 'simone.martini@user.net', 'utente020'),

(3, 'Alice', 'Pellegrini', '3330000021', 'PLLALC93A01H501', 'alice.pellegrini@user.net', 'utente021'),
(3, 'Roberto', 'Rinaldi', '3330000022', 'RNLRRT81B12L219', 'roberto.rinaldi@user.net', 'utente022'),
(3, 'Francesca', 'De Luca', '3330000023', 'DLUFRN95C23F205', 'francesca.deluca@user.net', 'utente023'),
(3, 'Nicola', 'Ferri', '3330000024', 'FRRNNL82D14H501', 'nicola.ferri@user.net', 'utente024'),
(3, 'Valentina', 'Leone', '3330000025', 'LNVVLN94E25L219', 'valentina.leone@user.net', 'utente025'),
(3, 'Tommaso', 'Sartori', '3330000026', 'SRTTMS83F16F205', 'tommaso.sartori@user.net', 'utente026'),
(3, 'Claudia', 'Morello', '3330000027', 'MRLCLD96G27H501', 'claudia.morello@user.net', 'utente027'),
(3, 'Giovanni', 'Piras', '3330000028', 'PRSGNN85H18L219', 'giovanni.piras@user.net', 'utente028'),
(3, 'Serena', 'Villa', '3330000029', 'VLLSRN93L09F205', 'serena.villa@user.net', 'utente029'),
(3, 'Riccardo', 'Longo', '3330000030', 'LNGRCC90M20H501', 'riccardo.longo@user.net', 'utente030'),

(3, 'Martina', 'Bianco', '3330000031', 'BNCMRT92A01L219', 'martina.bianco@user.net', 'utente031'),
(3, 'Edoardo', 'Sanna', '3330000032', 'SNNDRD88B12F205', 'edoardo.sanna@user.net', 'utente032'),
(3, 'Rebecca', 'Gori', '3330000033', 'GRORBCC95C23H501', 'rebecca.gori@user.net', 'utente033'),
(3, 'Alberto', 'Negri', '3330000034', 'NGRLBT84D14L219', 'alberto.negri@user.net', 'utente034'),
(3, 'Sofia', 'Bruno', '3330000035', 'BRNSFA97E25F205', 'sofia.bruno@user.net', 'utente035'),
(3, 'Filippo', 'Riva', '3330000036', 'RVAFPP85F16H501', 'filippo.riva@user.net', 'utente036'),
(3, 'Veronica', 'Sala', '3330000037', 'SLAVRN94G27L219', 'veronica.sala@user.net', 'utente037'),
(3, 'Massimo', 'Ferrero', '3330000038', 'FRRMSM82H18F205', 'massimo.ferrero@user.net', 'utente038'),
(3, 'Elisabetta', 'Caruso', '3330000039', 'CRSLBT90L09H501', 'elisabetta.caruso@user.net', 'utente039'),
(3, 'Daniele', 'Polo', '3330000040', 'PLODNL91M20L219', 'daniele.polo@user.net', 'utente040'),

(3, 'Camilla', 'Romani', '3330000041', 'RMNCML92A01F205', 'camilla.romani@user.net', 'utente041'),
(3, 'Antonio', 'Fabbri', '3330000042', 'FBBNTN83B12H501', 'antonio.fabbri@user.net', 'utente042'),
(3, 'Giada', 'Locatelli', '3330000043', 'LCTGDA95C23L219', 'giada.locatelli@user.net', 'utente043'),
(3, 'Pietro', 'Cattaneo', '3330000044', 'CTTPTR86D14F205', 'pietro.cattaneo@user.net', 'utente044'),
(3, 'Beatrice', 'Verdi', '3330000045', 'VRDBTR94E25H501', 'beatrice.verdi@user.net', 'utente045'),
(3, 'Samuel', 'Serafini', '3330000046', 'SRFSMl85F16L219', 'samuel.serafini@user.net', 'utente046'),
(3, 'Noemi', 'Gallo', '3330000047', 'GLLNMI98G27F205', 'noemi.gallo@user.net', 'utente047'),
(3, 'Christian', 'Pagani', '3330000048', 'PGNCRS87H18H501', 'christian.pagani@user.net', 'utente048'),
(3, 'Rachele', 'Monti', '3330000049', 'MNTRCL90L09L219', 'rachele.monti@user.net', 'utente049'),
(3, 'Leonardo', 'Corsi', '3330000050', 'CRSLNR92M20F205', 'leonardo.corsi@user.net', 'utente050');

-- 7. VISITA
INSERT INTO visita (Id_immobile, Id_agente, data, Id_utente) VALUES
(1, 1, '2025-11-15 10:00:00', 1),
(2, 2, '2025-11-16 15:30:00', 2),
(3, 3, '2025-11-20 11:00:00', 3),
(4, 4, '2025-11-21 09:00:00', 14),
(5, 5, '2025-11-22 14:00:00', 15),

(7, 2, '2025-11-24 11:00:00', 40),
(9, 4, '2025-11-25 09:30:00', 41),
(12, 2, '2025-11-26 15:30:00', 34),
(15, 5, '2025-11-28 16:00:00', 25),
(18, 3, '2025-11-30 14:00:00', 28);


-- 8. CONTRATTI
INSERT INTO contratto_esclusivo (id_immobile, id_utente, data_di_scadenza, prezzo) VALUES
(1,  1,  '2025-12-01', 10000),
(2,  2,  '2025-11-01', 18000),
(4,  7,  '2026-01-15', 15000),
(5,  10, '2026-02-01', 22000),
(7,  12, '2026-03-10', 25000),

(8,  5, '2026-04-05', 12000),
(11, 28, '2026-05-20', 14000),
(13, 30, '2026-06-30', 30000),
(16, 21, '2026-07-15', 26000),
(19, 25, '2026-08-01', 20000);

