package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "caratteristiche_immobile")
public class CaratteristicheImmobile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_caratteristiche")
    private Integer Id_caratteristiche;

    @Column(name = "tipologia", nullable = false)
    private String tipologia;

    @Column(name = "piano", nullable = false)
    private String piano;

    @Column(name = "ascensore", nullable = false)
    private Boolean ascensore;

    @Column(name = "arredato", nullable = false)
    private Boolean arredato;

    @Column(name = "disponibilita", nullable = false)
    private String disponibilita;

    @Column(name = "contratto", nullable = false)
    private String contratto;

    @Column(name = "piani_edificio", nullable = false)
    private Integer piani_edificio;

    @Column(name = "anno_costruzione", nullable = false)
    private Integer anno_costruzione;

    @Column(name = "classe_energetica", nullable = false)
    private String classe_energetica;

    @Column(name = "accesso_disabili", nullable = false)
    private Boolean accesso_disabili;

    @Column(name = "camere", nullable = false)
    private Integer camere;

    @Column(name = "bagni", nullable = false)
    private Integer bagni;

    @Column(name = "balcone", nullable = false)
    private Integer balcone;

    @Column(name = "riscaldamento", nullable = false)
    private String riscaldamento;

    @Column(name = "terrazzo", nullable = false)
    private Boolean terrazzo;

    @Column(name = "giardino", nullable = false)
    private Boolean giardino;

    @Column(name = "box_auto", nullable = false)
    private Integer box_auto;

    @Column(name = "cantina", nullable = false)
    private Boolean cantina;

    @Column(name = "altre_caratteristiche", nullable = false)
    private String altre_caratteristiche;

    public Integer getId_caratteristiche() {
        return Id_caratteristiche;
    }

    public void setId_caratteristiche(Integer id_caratteristiche) {
        Id_caratteristiche = id_caratteristiche;
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

    public Boolean getAscensore() {
        return ascensore;
    }

    public void setAscensore(Boolean ascensore) {
        this.ascensore = ascensore;
    }

    public Boolean getArredato() {
        return arredato;
    }

    public void setArredato(Boolean arredato) {
        this.arredato = arredato;
    }

    public String getDisponibilita() {
        return disponibilita;
    }

    public void setDisponibilita(String disponibilita) {
        this.disponibilita = disponibilita;
    }

    public String getContratto() {
        return contratto;
    }

    public void setContratto(String contratto) {
        this.contratto = contratto;
    }

    public Integer getPiani_edificio() {
        return piani_edificio;
    }

    public void setPiani_edificio(Integer piani_edificio) {
        this.piani_edificio = piani_edificio;
    }

    public Integer getAnno_costruzione() {
        return anno_costruzione;
    }

    public void setAnno_costruzione(Integer anno_costruzione) {
        this.anno_costruzione = anno_costruzione;
    }

    public String getClasse_energetica() {
        return classe_energetica;
    }

    public void setClasse_energetica(String classe_energetica) {
        this.classe_energetica = classe_energetica;
    }

    public Boolean getAccesso_disabili() {
        return accesso_disabili;
    }

    public void setAccesso_disabili(Boolean accesso_disabili) {
        this.accesso_disabili = accesso_disabili;
    }

    public Integer getCamere() {
        return camere;
    }

    public void setCamere(Integer camere) {
        this.camere = camere;
    }

    public Integer getBagni() {
        return bagni;
    }

    public void setBagni(Integer bagni) {
        this.bagni = bagni;
    }

    public Integer getBalcone() {
        return balcone;
    }

    public void setBalcone(Integer balcone) {
        this.balcone = balcone;
    }

    public String getRiscaldamento() {
        return riscaldamento;
    }

    public void setRiscaldamento(String riscaldamento) {
        this.riscaldamento = riscaldamento;
    }

    public Boolean getTerrazzo() {
        return terrazzo;
    }

    public void setTerrazzo(Boolean terrazzo) {
        this.terrazzo = terrazzo;
    }

    public Boolean getGiardino() {
        return giardino;
    }

    public void setGiardino(Boolean giardino) {
        this.giardino = giardino;
    }

    public Integer getBox_auto() {
        return box_auto;
    }

    public void setBox_auto(Integer box_auto) {
        this.box_auto = box_auto;
    }

    public Boolean getCantina() {
        return cantina;
    }

    public void setCantina(Boolean cantina) {
        this.cantina = cantina;
    }

    public String getAltre_caratteristiche() {
        return altre_caratteristiche;
    }

    public void setAltre_caratteristiche(String altre_caratteristiche) {
        this.altre_caratteristiche = altre_caratteristiche;
    }

    
}
