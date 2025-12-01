# Immobiliaris - Nuovo Portale Immobiliare

## Descrizione del progetto

**Immobiliaris** è un'agenzia immobiliare attiva nel territorio piemontese, parte del gruppo **Indomus**. Il progetto prevede lo sviluppo di un portale digitale per modernizzare l'approccio dell'agenzia e attrarre un target più giovane (35-55 anni) attraverso una strategia di comunicazione integrata. Il portale si concentrerà sulla compravendita di immobili, con funzionalità avanzate per l'acquisizione di immobili in esclusiva, la valutazione automatica degli stessi, e una gestione ottimizzata delle richieste da parte degli amministratori.

## Obiettivi del progetto

- Creazione di un portale web per l'acquisizione di immobili in esclusiva, ispirato al modello **Gromia.com**.
- Implementazione di una campagna **paid** per generare traffico e conversioni sul portale.
- Definizione della **Unique Selling Proposition** (USP) per posizionare il servizio come affidabile, innovativo e vantaggioso.
- Pianificazione della **strategia di comunicazione social** e lead generation.
- Proposta grafica del portale, inclusi i mockup.

## Funzionalità richieste

- **Onboarding proprietari**: un form multi-step per raccogliere i dati sugli immobili.
- **Valutazione immobile automatica**: il portale fornirà una valutazione automatica dell'immobile entro 72 ore.
- **Proposta di contratto di vendita**: il sistema genererà una proposta di contratto di vendita in esclusiva.
- **Gestione delle richieste**: gli amministratori gestiranno le richieste tramite il backoffice.
- **Integrazione con strumenti di marketing automation**.
- **Responsive Design** e **ottimizzazione SEO**.

## Tecnologie utilizzate

### Backend

- **Linguaggio**: Java 
- **Framework**: Spring Boot
- **Build Tool**: Maven
- **Database**: MySQL

### Frontend

- **Libreria**: React
- **Build Tool**: Vite
- **Styling**: CSS
- **Linguaggio**: JavaScript

### Versionamento

- **Versionamento**: GitHub
- **Gestione del progetto**: GitHub Projects


## Requisiti di sistema

Java: v11 o superiore<br>
Node.js: v16 o superiore<br>
npm: v8 o superiore<br>
MySQL: v8.0 o superiore<br>
Maven: v3.6 o superiore<br>

## Ruoli e Attività

### 1. Digital Strategist

- Analisi dei **buyer persona** e dei **competitor**
- Definizione del **TOV** (Tone of Voice), delle **linee editoriali**, e del **PED** (Piano Editoriale Digitale)
- Proposta del **logo** e dell'**identità visiva**
- Scrittura dei testi del sito e ottimizzazione SEO
- Gestione della campagna **paid** (Meta, Google Ads, Performance Max)
- Sviluppo della **strategia di conversione lead**

### 2. Web Developer

- Conversione dei **mockup** in codice
- Realizzazione della **UX/UI** e dell'**accessibilità**
- Validazione dei **dati** del sito
- Integrazione delle **API**
- Ottimizzazione SEO (on-page e technical SEO)
- Ottimizzazione delle **performance di caricamento** tramite Lighthouse e Pagespeed

### 3. Software Developer

- Configurazione e gestione del **database**
- Sviluppo del **backend** e delle **API REST**

## Area Geografica Target

- **Città medio-grandi del Piemonte**: Torino, Cuneo, Alessandria e Asti

## Strumenti e Media Coinvolti

- **Social Media**: Facebook e Instagram
- **Strumenti**: Facebook Ads, Google Ads, CRM, DEM/newsletter, Marketing Automation

## Struttura del Progetto

 ``` 
BRICKBYBRICK
├── Desktop\BrickByBrick\
│   └── .vscode/
│
├── brickbybrick/
│   ├── .mvn/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java\com\brickbybrick\brickbybrick\
│   │   │   │   ├── api/              # API REST endpoints
│   │   │   │   ├── controller/       # Controller MVC
│   │   │   │   ├── model/            # Entità e modelli dati
│   │   │   │   ├── repos/            # Repository per accesso dati
│   │   │   │   ├── services/
│   │   │   │   ├── sign_in/
│   │   │   │   └── BrickbybrickApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── static/
│   │   │       ├── templates/
│   │   │       ├── application.properties
│   │   │       ├── Popolamento_prezzo_mercato.sql
│   │   │       ├── PopolamentoDB.sql
│   │   │       └── ScriptDBImmobiliari.sql
│   │   │
│   │   └── test/
│   │
│   ├── target/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── frontend/
│
│   ├── node_modules/
│   │
│   ├── public/
│   │
│   ├── src/
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── target/
│   ├── DB_immobiliaris.PNG
│   └── HELP.md
│
└── .vscode/

 ```
## Installazione e Avvio


### 1. Clonare il repository

```
git clone https://github.com/Sab-png/BrickByBrick.git
cd BrickByBrick
```
### 2. Creazione dell'utente MySql e creazione del Database
Esegui il seguente script:
```
-- Crea l'utente
CREATE USER 'byta'@'localhost' IDENTIFIED BY '1234';

-- Concedi i permessi sulle tabelle del database ()
GRANT ALL PRIVILEGES ON immobiliaris.* TO 'byta'@'localhost';

-- Applica le modifiche
FLUSH PRIVILEGES;

CREATE DATABASE immobiliaris;
GRANT ALL ON immobiliaris.* TO 'byta'@'localhost';
```
### 3. Configurazione del Database
Copia e incolla su MySQL gli script presenti in ```brickbybrick/src/main/resources/```, poi eseguili con il seguente ordine:

1. ScriptDB.sql
2. PopolamentoDB.sql
3. Popolamento_prezzo_mercato.sql


### 4. Avvio del Backend
Nel terminale:
```
cd brickbybrick
./mvnw spring-boot:run
```
Il server partirà su:
```
http://localhost:8085
```
### 5. Avvio del Frontend
```
cd frontend
npm install
npm run dev
```
Il server partirà su:
```
http://localhost:5173
```

## Autori

#### Digital Strategist
Angelica Felletti: [@Xangelica](https://github.com/Xangelica).

Tommaso Palmieri: [@Doc10040](https://github.com/Doc10040).

Giovanni Acatrinei: [@giovanniacatrinei](https://github.com/giovanniacatrinei).

#### Web Developer
Jacopo dell'Oste: [@jacopodellostee](https://github.com/Jacopodellostee).

Martino Placano: [@Marti-guti](https://github.com/Marti-guti).

Cao Vy Beltrame: [@CaoVy03](https://github.com/CaoVy03).

#### Software Developer
Daniela Punzi: [@Daniela15P](https://github.com/Daniela15P)

Marco Spedaliere: [@MarcoSpedaliere](https://github.com/MarcoSpedaliere)

Andrea Sabini: [@Sab-png](https://github.com/Sab-png)

## Azienda committente
Immobiliaris - Agenzia Immobiliare<br>
Parte del gruppo Indomus<br>
Referente aziendale: Paolo Ghirlinzoni

## Istituto
ITS ICT Piemonte<br>
Istituto Tecnologico Superiore Academy per le Tecnologie dell'Informazione e della Comunicazione<br>
Sede legale: Torino, Piazza Carlo Felice 18<br>

## Licenza
Questo progetto è sviluppato nell'ambito del corso ITS ICT Piemonte.
Tutti i diritti riservati © 2025 Team BrickByBrick

