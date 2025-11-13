package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "immobile")
public class Immobile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_immobile")
    private Integer Id_immobile;

    @Column(name = "foto", nullable = false)
    private String foto;

    @Column(name = "regione", nullable = false)
    private String regione;

    @Column(name = "cap", nullable = false)
    private String cap;

    @Column(name = "citta", nullable = false)
    private String citta;

    @Column(name = "indirizzo", nullable = false)
    private String indirizzo;

    @Column(name = "prezzo", nullable = false)
    private Double prezzo;

    @Column(name = "locali", nullable = false)
    private Integer locali;

    @Column(name = "superficie", nullable = false)
    private Integer superficie;

    @Column(name = "descrizione", nullable = false)
    private String descrizione;

    @OneToOne(cascade = CascadeType.ALL)  
    @JoinColumn(name = "Id_caratteristiche", referencedColumnName = "Id_caratteristiche")
    private CaratteristicheImmobile caratteristiche;

    @Column(name = "planimetria", nullable = false)
    private String planimetria;

    @Column(name = "mappa", nullable = false)
    private String mappa;

    public Integer getId_immobile() {
        return Id_immobile;
    }

    public void setId_immobile(Integer id_immobile) {
        Id_immobile = id_immobile;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getRegione() {
        return regione;
    }

    public void setRegione(String regione) {
        this.regione = regione;
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

    public Double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(Double prezzo) {
        this.prezzo = prezzo;
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

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public CaratteristicheImmobile getCaratteristiche() {
        return caratteristiche;
    }

    public void setCaratteristiche(CaratteristicheImmobile caratteristiche) {
        this.caratteristiche = caratteristiche;
    }

    public String getPlanimetria() {
        return planimetria;
    }

    public void setPlanimetria(String planimetria) {
        this.planimetria = planimetria;
    }

    public String getMappa() {
        return mappa;
    }

    public void setMappa(String mappa) {
        this.mappa = mappa;
    }



}
