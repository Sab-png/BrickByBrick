# API DOCUMENTATION 

Gli endpoint utilittati sono i seguenti:



| Metodi | Endpoint | Descrizione | Accesso permesso | Json |
|----------|-----------|-----------|-----------|-----------|
| GET | /api/admin | Recupera l'elenco di tutti gli admin |
| POST | /api/admin | Crea un nuovo admin |
| GET | /api/admin{id} | Recupera i dettagli di un admin specifico tramite il suo id |
| DELETE | /api/admin/delete/{id} | Elimina un admin specifico tramite il suo id |
| PUT | /api/admin/edit/{id} | Modifica un admin specifico tramite il suo id |
| GET | /api/agenti | Recupera l'elenco di tutti gli agenti | Utente e Admin |
| POST | /api/agenti | Crea un nuovo agente | Admin |
| GET | /api/agenti{id} | Recupera i dettagli di un agente specifico tramite il suo id | Admin |
| GET | /api/agenti/delete/{id} | Elimina un agente specifico tramite il suo id | Admin |
| PUT | /api/agenti/edit/{id} | Modifica un agente specifico tramite il suo id | Admin |
| GET | /api/caratteristiche | Recupera l'elenco di tutte le caratteristiche degli immobili | Admin |
| POST | /api/caratteristiche | Crea una nuova caratteristica dell'immobile | Admin |
| GET | /api/caratteristiche{id} | Recupera i dettagli di una caratteristica specifica tramite il suo id | Utente |
| DELETE | /api/caratteristiche/delete/{id} | Elimina una caratteristica specifica tramite il suo id | Admin |
| PUT | /api/caratteristiche/edit/{id} | Modifica una caratteristica specifica tramite il suo id |  Admin |
| GET | /api/contratti | Recupera l'elenco di tutti i contratti | Admin |
| POST | /api/contratti | Crea un nuovo contratto | Admin |
| GET | /api/contratti{id} | Recupera i dettagli di un contratto specifico tramite il suo id | Admin |
| DELETE | /api/contratti/delete/{id} | Elimina un contratto specifico tramite il suo id | Admin |
| PUT | /api/contratti/edit/{id} | Modifica un contratto specifico tramite il suo id | Admin |
| GET | /api/immobili | Recupera l'elenco di tutti gli immobili | Utente |
| POST | /api/immobili | Crea un nuovo immobile | Admin |
| GET | /api/immobili{id} | Recupera i dettagli di un immobile specifico tramite il suo id | Admin |
| DELETE | /api/immobili/delete/{id} | Elimina un immobile specifico tramite il suo id | Admin |
| PUT | /api/immobili/edit/{id} | Modifica un immobile specifico tramite il suo id | Admin |
| GET | /api/ruoli | Recupera l'elenco di tutti i ruoli |
| GET | /api/ruoli{id} | Recupera i dettagli di un ruolo specifico tramite il suo id |
| GET | /api/utenti |  Recupera l'elenco di tutti gli utenti | Admin |
| POST | /api/utenti | Crea un nuovo utente |
| GET | /api/utenti{id} | Recupera i dettagli di un utente specifico tramite il suo id | Admin |
| DELETE | /api/utenti/delete/{id} | Elimina un utente specifico tramite il suo id | Admin |
| PUT | /api/utenti/edit/{id} | Modifica un utente specifico tramite il suo id |
| POST | /api/valutazione/calcola | Calcola la valutazione dell'immobile stimata | Utente |
| GET | /api/visite | Recupera l'elenco di tutte le visite | Admin e Agente|
| POST | /api/visite | Crea una nuova visita|  Admin e Utente |
| GET | /api/visite{id} | Recupera i dettagli di una visita specifico tramite il suo id | Admin e Agente |
| DELETE | /api/visite/delete/{id} | Elimina una visita specifico tramite il suo id | Admin |
| PUT | /api/visite/edit/{id} | Modifica una visita specifico tramite il suo id | Admin |
