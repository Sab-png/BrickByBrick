package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "valutazione")
public class Valutazione {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_valutazione")
    private Integer Id_valutazione;

    @Column(name = "Id_utente", nullable = false)
    private Integer Id_utente;
    
    // @Column(name = "regione", nullable = false)
    // private String regione;

    @Column(name = "cap", nullable = false)
    private String cap;

    @Column(name = "citta", nullable = false)
    private String citta;

    @Column(name = "indirizzo", nullable = false)
    private String indirizzo;

    @Column(name = "tipologia", nullable = false)
    private String tipologia;

    @Column(name = "piano", nullable = false)
    private String piano;

    @Column(name = "locali", nullable = false)
    private Integer locali;

    @Column(name = "superficie", nullable = false)
    private Integer superficie;

    @Column(name = "condizioni", nullable = false)
    private String condizioni;

    @Column(name = "bagni", nullable = false)
    private Integer bagni;

    @Column(name = "anno_costruzione", nullable = false)
    private Integer anno_costruzione;

    @Column(name = "ascensore", nullable = false)
    private Boolean ascensore;

    @Column(name = "classe_energetica", nullable = false)
    private String classe_energetica;

    @Column(name = "giardino", nullable = false)
    private Boolean giardino;

    @Column(name = "cantina", nullable = false)
    private Boolean cantina;

    @Column(name = "terrazzo", nullable = false)
    private Boolean terrazzo;

    @Column(name = "balcone", nullable = false)
    private Boolean balcone;

    @Column(name = "piscina", nullable = false)
    private Boolean piscina;

    @Column(name = "garage", nullable = false)
    private Boolean garage;

    public Integer getId_valutazione() {
        return Id_valutazione;
    }

    public void setId_valutazione(Integer id_valutazione) {
        Id_valutazione = id_valutazione;
    }

    public Integer getId_utente() {
        return Id_utente;
    }

    public void setId_utente(Integer id_utente) {
        Id_utente = id_utente;
    }

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getPiano() {
        return piano;
    }

    public void setPiano(String piano) {
        this.piano = piano;
    }

    public Integer getLocali() {
        return locali;
    }

    public void setLocali(Integer locali) {
        this.locali = locali;
    }

    public Integer getSuperficie() {
        return superficie;
    }

    public void setSuperficie(Integer superficie) {
        this.superficie = superficie;
    }

    public String getCondizioni() {
        return condizioni;
    }

    public void setCondizioni(String condizioni) {
        this.condizioni = condizioni;
    }

    public Integer getBagni() {
        return bagni;
    }

    public void setBagni(Integer bagni) {
        this.bagni = bagni;
    }

    public Integer getAnno_costruzione() {
        return anno_costruzione;
    }

    public void setAnno_costruzione(Integer anno_costruzione) {
        this.anno_costruzione = anno_costruzione;
    }

    public Boolean getAscensore() {
        return ascensore;
    }

    public void setAscensore(Boolean ascensore) {
        this.ascensore = ascensore;
    }

    public String getClasse_energetica() {
        return classe_energetica;
    }

    public void setClasse_energetica(String classe_energetica) {
        this.classe_energetica = classe_energetica;
    }

    public Boolean getGiardino() {
        return giardino;
    }

    public void setGiardino(Boolean giardino) {
        this.giardino = giardino;
    }

    public Boolean getCantina() {
        return cantina;
    }

    public void setCantina(Boolean cantina) {
        this.cantina = cantina;
    }

    public Boolean getTerrazzo() {
        return terrazzo;
    }

    public void setTerrazzo(Boolean terrazzo) {
        this.terrazzo = terrazzo;
    }

    public Boolean getBalcone() {
        return balcone;
    }

    public void setBalcone(Boolean balcone) {
        this.balcone = balcone;
    }

    public Boolean getPiscina() {
        return piscina;
    }

    public void setPiscina(Boolean piscina) {
        this.piscina = piscina;
    }

    public Boolean getGarage() {
        return garage;
    }

    public void setGarage(Boolean garage) {
        this.garage = garage;
    }

    
}
