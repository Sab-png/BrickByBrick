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

## Requisiti tecnici

### Backend

- **Linguaggio**: Java
- **Framework**: Spring Boot

### Frontend

- **Tecnologie**: React, SCSS
- **Framework**: ????

### Database

- **Database**: MySQL

### Versionamento

- **Versionamento**: GitHub
- **Gestione del progetto**: GitHub Projects

### Documentazione

- **Documentazione**: README.md


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

## Budget

- **Lead generation paid**: 1.500 € al mese per 12 mesi. Il rinnovo e il budget per gli anni successivi saranno valutati dal cliente.
- **Sviluppo portale**: Il budget per lo sviluppo del portale sarà definito in base all'architettura, al design, SEO e CRM.

## Area Geografica Target

- **Città medio-grandi del Piemonte**: Torino, Cuneo, Alessandria, Asti

## Strumenti e Media Coinvolti

- **Social Media**: Facebook, Instagram, WhatsApp (estensione possibile a TikTok, YouTube)
- **Strumenti**: Facebook Ads, Google Ads, CRM, DEM/newsletter, Marketing Automation

## Struttura del Progetto

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

## Installazione e Avvio

### Requisiti


