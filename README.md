# SEII_Progetto_21
Progetto del corso di ingegneria del software II del gruppo #21. Unitn 2020/2021
* Giacomo Fantoni
* Ettore Favari
* Filippo Gastaldello
* Nicola Giuseppe Marchioro
* Elisa Pettinà
## Product Backlog

| Name | User story | How to Demo | Importance | Estimate |
|-|-|-|-|-|
| |Io come utente posso entrare nel sito e visualizzare informazioni affidabili.|Una volta selezionato l'oggetto di mio interesse posso visualizzarne i dettagli .|1|4|
| |Io come utente posso entrare nel sito e visualizzare informazioni aggiornate.|Quando accedo alle informazioni posso controllare la data di ultima modifica.|2|1|
| |Io come utente posso comparare due interi genomi per determinare quando e come due specie si sono differenziate. Con un UI intuitiva.|Sulla pagina principale sono presenti due dropdown menu da cui scegliere le specie da comparare e la granularità.|3|3|
| |Io come utente posso accedere alle informazioni su un determinato gene di mio interesse. Per approfondire la sua funzione.|Una volta selezionato il gene posso accedere a tutte le informazioni presenti sul sito riguardanti tale elemento.|4|1|
| |Io come utente posso comparare due singoli geni, per capire come differenze di sequenza portano a differenze funzionali.|Sulla pagina principale sono presenti due dropdown menu da cui scegliere le specie da comparare e la granularità.|12|2|
| |Io come utente posso chiedere informazioni ai moderatori, per avere un confronto con persone competenti.|Sulla pagina delle FAQ è presente una form per inviare domande a persone competenti in materia con la possibilità di ricevere una risposta via email.|5|2|
| |Io come utente posso registrarmi nel sito per avere un'esperienza personalizzata.|In tutte le pagine è presente un top menu dal quale è possibile effettuare l'accesso.|6|5|
| |Io come utente loggato posso vedere la storia delle mie ricerche.|Nella pagina del profilo è presente un box contenente lo storico delle mie ricerche sul sito.|7|2|
| |Io come utente iscritto posso caricare informazioni geniche di mio interesse, per avere sempre sotto mano i dati con cui lavoro più spesso.|Nella pagina del profilo è possibile caricare informazioni, opportunamente formattate, in modo da condividerle con gli altri utenti del sito.|8|1|
| |Io come utente posso comparare due singoli cromosomi.|Sulla pagina principale sono presenti due dropdown menu da cui scegliere le specie da comparare e la granularità.|11|3|
| |Io come amministratore posso validare i lavori caricati dagli altri utenti per valutare e riconoscere genomi incorretti.|Nella pagina relativa la profilo degli amministratori è presente un box dal quale si possono revisionare gli studi caricati dagli utenti e, se ritenuti affidabili, renderli disponibili pubblicamente sul sito.|10|4|
| |Io come moderatore posso rispondere alle FAQ del sito per chiarire dubbi di utenti.|Nella pagina personale dell'utente amministratore sarà presente una casella inbox contenente le domande senza risposta, alle quali l'amministratore potrà rispondere, scegliendo tra una risposta privata o un post pubblico nel FAQ del sito.|9|3|


## Sprint #1 Backlog

| | Sprint Backlog (Sprint Planning) |  |  |  |  | Sprint |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|-|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
 |Name | User story | Task | Volunteer | Estimate | Day1 | Day2 | Day3 | Day4 | Day5 | Day6 | Day7 | Day8 | Day9 | Day10 | Day11 | Day12 | Day13 | Day14 | Day15 | Day16 | Day17 | Day18 | Day19 | Day20 | Day21 | Day22 | Day23 | Day24 | Day25 |
  | Servercore | Io come utente posso entrare nel sito e visualizzare informazioni affidabili. | Modellazione dati dei geni | Giacomo | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
  | | | Modellazione dati gene tree | Giacomo | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
  | | | Testing metodi REST | Elisa | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 0 |
 | | | Design API | Elisa | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Ottenere e leggere id ensembl | Giacomo | 1 | 1 | 1 | 1 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Ottenere informazioni dei geni | Giacomo | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Ottenere informazioni delle omologie | Giacomo | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Ottenere informazioni sugli alberi | Giacomo | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 6 | 4 | 4 | 4 | 4 |
 | | | Scrivere dati nel database | Giacomo | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 1 | 1 | 1 | 1 | 4 | 4 | 2 | 0 | 0 | 0 |
 | | | Deploy | Giacomo | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 5 | 0 |
 | Aggiornamento Geni | Io come utente posso entrare nel sito e visualizzare informazioni aggiornate. | Aggiornare tutte le liste di geni | Ettore | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Aggiornare una lista di geni | Ettore | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Aggiornare un sigolo gene | Ettore | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 0 |
 | | | Comunicazione con database | Ettore | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 0 |
 | Comparazione specie | Io come utente posso comparare due interi genomi per determinare quando e come due specie si sono differenziate. Con un UI intuitiva. | Pagina principale | Ettore | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Comunicazione con database | Ettore | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 0 | 0 |
 | | | Metodo REST rendere lista di geni di una specie da db/file in locale | Elisa | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | definizione delle risorse e degli endpoint relativi alle specie e implementazione metodi REST | Filippo | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Metodo REST per vedere quali specie sono disponibili | Elisa | 1 | 1| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 2 | 1 | 0 | 0 | 2 | 0 | 0 | 0 | 0 |
 | | | Design UI | Elisa | 5 | 5 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | Accedere a singolo gene | Io come utente posso accedere alle informazioni su un determinato gene di mio interesse. Per approfondire la sua funzione. | Metodo REST per prendere geni da db/file in locale | Elisa | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 3 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 2 | 0 | 0 | 0 |
 | | | definizione delle risorse e degli endpoints relativi ai geni e implementazione metodi REST | Filippo | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
 | | | Metodo REST selezionare info del singolo gene | Elisa | 2 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
 | Q&A | Io come utente posso chiedere informazioni ai moderatori, per avere un confronto con persone competenti. | definizione della risorsa Q&A e dei metodi REST | Filippo | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Design form domanda | Elisa | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | Login utente | Io come utente posso registrarmi nel sito per avere un'esperienza personalizzata. | Design Menu | Nicola | 2 | 2 | 2 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Creazione GUI Menu | Nicola | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Creazione Login page layout | Elisa | 4 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Design API | Filippo | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
 | | | Progettazione funzioni backend | Nicola | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 2 | 2 | 1 | 1 | 1 | 0 | 0 |
 | | | Progettazione collezione dati | Nicola | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | | | Implementazione metodi REST | Nicola | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 1 | 0 |
 | | | Testing | Nicola | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
 | Accedere a cronologia | Io come utente loggato posso vedere la storia delle mie ricerche. | Creazione GUI | Filippo | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
 | | | Design API | Filippo | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
 | | | Implementazione metodi REST | Filippo | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
 | Comparazione di due geni | Io come utente posso comparare due singoli geni, per capire come differenze di sequenza portano a differenze funzionali. | Implementazione metodo REST per singolo gene | Elisa | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 0 | 0 |
 | | | definizione delle risorsa gene con le relative omologie | Filippo | 3 | 3 | 3 | 3 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
 | Total | | | | 70 | 57 | 56 | 55 | 56 | 54 | 54 | 49 | 52 | 48 | 48 | 44 | 45 | 40 | 41 | 37 | 30 | 32 | 31 | 31 | 35 | 41 | 31 | 26 | 20 | 8 |
 | Ideal | | | | 70 | 67,2 | 64,4 | 61,6 | 58,8 | 56 | 53,2 | 50,4 | 47,6 | 44,8 | 42 | 39,2 | 36,4 | 33,6 | 30,8 | 28 | 25,2 | 22,4 | 19,6 | 16,8 | 14 | 11,2 | 8,4 | 5,6 | 2,8 | 0 |




## Sprint #2 Backlog

| | Sprint Backlog (Sprint Planning) |  |  |  |  | Sprint 2|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  
|-|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Name| User story| Task| Volunteer| Estimate| Day1| Day2| Day3| Day4| Day5| Day6| Day7| Day8| Day9| Day10| Day11| Day12| Day13| Day14| Day15| Day16| Day17| Day18| Day19| Day20| 
| Aggiornamento Geni| Io come utente posso entrare nel sito e visualizzare informazioni aggiornate.| Deploy| Ettore| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 2| 1| 0| 0|
| Risposta qanda| Io come moderatore posso rispondere alle FAQ del sito per chiarire dubbi di utenti.| Definizione api| Ettore| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 0|
| | | Deploy| Ettore| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 0|
| Sign up| Io come utente posso entrare nel sito e visualizzare informazioni affidabili| Inserimento info e visualizzazione alberi| Nicola| 7| 7| 7| 7| 7| 7| 7| 7| 6| 6| 3| 3| 1| 2| 0| 0| 1| 0| 0| 0| 0|
| Comparazione specie| Io come utente posso comparare due interi genomi per determinare quando e come due specie si sono differenziate. Con UI intuitiva| Definizione Endpoint| Giacomo| 3| 3| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 1| 0| 0| 0| 0| 0| 0| 0| 0|
| | | Implementazione metodo restful genomi| Giacomo| 6| 6| 6| 6| 6| 6| 6| 6| 6| 6| 6| 6| 5| 5| 5| 5| 3| 3| 1| 1| 0|
| | | Deploy metodi| Giacomo| 2| 2| 2| 2| 2| 2| 2| 2| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 0|
| | | Testing species endpoints| Ettore| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 0| 0|
| | | Testing genes endopoints| Elisa| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 0| 0|
| | | Frontend home page| Elisa| 5| 5| 5| 5| 5| 5| 5| 5| 5| 4| 3| 3| 2| 2| 2| 1| 1| 1| 1| 0|| 
| | | Testing genome endpoints| Giacomo| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 0|
| | | Frontend comparazione genomi| Nicola| 6| 6| 6| 6| 6| 6| 6| 6| 6| 6| 6| 6| 5| 5| 5| 3| 4| 1| 0| 0| 0|
| About| Io come utente posso ricevere informazioni riguardo quello che la web application mi permette di fare e le informazioni che contiene.| Raccolta informazioni| Giacomo| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 0| 0| 0|
| | | Creazione pagina| Giacomo| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 1| 0| 0|
| | | Scrittura di how to use| Elisa| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 0|
| | | Template per how to use| Giacomo| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 0| 0|
| | | Video - tutorial per how to use| Elisa| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 0|
| Caricamento geni utente| Io come utente iscritto posso caricare informazioni geniche di mio interesse, per avere sempre sotto mano i dati con cui lavoro più spesso.| Definizione Api| Ettore| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 0| 0|
| | | Deploy| Ettore| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3|
| Login utente| Io come utente posso registrarmi nel sito per avere un'esperienza personalizzata.| Progettazione pagina di registrazione| Nicola| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 2| 1| 0| 0|
| | | Testing| Nicola| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 4| 3| 2| 2| 0|
| | | modifica e integrazione API| Nicola| 5| 5| 5| 5| 4| 4| 3| 1| 1| 0| 0| 1| 0| 0| 0| 0| 0| 0| 0| 0| 0|
| Cronologia| Io come utente loggato posso vedere la storia delle mie ricerche.| realizzazione backend | Nicola| 3| 3| 3| 3| 3| 3| 3| 2| 2| 2| 1| 2| 0| 0| 0| 0| 0| 0| 0| 0| 0|
| | | integrazione frontend| Nicola| 2| 2| 2| 2| 2| 2| 2| 2| 2| 1| 1| 1| 1| 0| 0| 0| 0| 0| 0| 0| 0|
| | | Modifica API| Nicola| 5| 5| 5| 5| 5| 5| 4| 3| 1| 1| 0| 0| 0| 0| 0| 0| 0| 0| 1| 0| 0|
| Q&A| Io come utente posso chiedere informazioni ai moderatori, per avere un confronto con persone competenti.| progettazione e realizzazione frontend| Nicola| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 2| 3| 0| 0|
| | | implementazione backend per le FAQ, HTTP GET, POST, DELETE| Filippo| 13| 13| 13| 13| 13| 11| 12| 10| 10| 8| 8| 6| 6| 6| 5| 5| 4| 4| 3| 0| 0|
| | | Test del backend FAQ| Filippo| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 3| 0| 0|
| | | Documentazione openAPI3 delle API che gestiscono le FAQ| FIlippo| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 2| 0| 0|
| Accedere a singolo gene| Io come utente posso accedere alle informazioni su un determinato gene di mio interesse. Per approfondire la sua funzione.| Test get single gene with empty input| Filippo| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 1| 0| 0| 0| 0| 0| 0| 0| 0| 0|
| | | Ottenere gene trees| Elisa| 3| 3| 3| 3| 2| 2| 1| 1| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0|
| | | Test get gene sequence with correct parameters| Filippo| 1| 1| 1| 1| 1| 1| 1| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0| 0|
| | | Frontend visualizzazione gene| Elisa| 5| 5| 5| 5| 5| 5| 5| 5| 5| 5| 5| 5| 5| 5| 4| 4| 3| 3| 3| 0| 0|
| Total| | | | 111| 67| 67| 67| 65| 63| 61| 54| 51| 47| 45| 45| 41| 40| 38| 38| 36| 33| 29| 8| 3|
| ideal| | | | 111| 105,45| 99,9| 94,35| 88,8| 83,25| 77,7| 72,15| 66,6| 61,05| 55,5| 49,95| 44,4| 38,85| 33,3| 27,75| 22,2| 16,65| 11,1| 5,55| 0| 
