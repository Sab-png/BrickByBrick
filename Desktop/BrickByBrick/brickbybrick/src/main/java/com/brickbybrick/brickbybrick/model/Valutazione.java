package com.brickbybrick.brickbybrick.model;

import com.brickbybrick.brickbybrick.model.enums.ClasseEnergetica;
import com.brickbybrick.brickbybrick.model.enums.Condizione;
import com.brickbybrick.brickbybrick.model.enums.Tipologia;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
    private Integer idUtente;

    public Integer getIdUtente() {
        return idUtente;
    }

    public void setIdUtente(Integer idUtente) {
        this.idUtente = idUtente;
    }

    @Column(name = "cap", nullable = false)
    private String cap;

    @Column(name = "citta", nullable = false)
    private String citta;

    @Column(name = "indirizzo", nullable = false)
    private String indirizzo;

    @Column(name = "tipologia", nullable = false)
    private Tipologia tipologia;

    @Column(name = "piano", nullable = false)
    private Integer piano;

    @Column(name = "locali", nullable = false)
    private Integer locali;

    @Column(name = "superficie", nullable = false)
    private Integer superficie;

    @Column(name = "condizioni", nullable = false)
    private Condizione condizioni;

    @Column(name = "bagni", nullable = false)
    private Integer bagni;

    @Column(name = "anno_costruzione", nullable = false)
    private Integer anno_costruzione;

    // @Column(name = "ascensore", nullable = false)
    // private Boolean ascensore;

    @Column(name = "classe_energetica", nullable = false)
    private ClasseEnergetica classe_energetica;

    @Embedded
    private DotazioniEsterne Id_dotazione;


    public Integer getId_valutazione() {
        return Id_valutazione;
    }

    public void setId_valutazione(Integer id_valutazione) {
        Id_valutazione = id_valutazione;
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

    public Tipologia getTipologia() {
        return tipologia;
    }

    public void setTipologia(Tipologia tipologia) {
        this.tipologia = tipologia;
    }

    public Integer getPiano() {
        return piano;
    }

    public void setPiano(Integer piano) {
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

    public Condizione getCondizioni() {
        return condizioni;
    }

    public void setCondizioni(Condizione condizioni) {
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

    // public Boolean getAscensore() {
    //     return ascensore;
    // }

    // public void setAscensore(Boolean ascensore) {
    //     this.ascensore = ascensore;
    // }

    public ClasseEnergetica getClasse_energetica() {
        return classe_energetica;
    }

    public void setClasse_energetica(ClasseEnergetica classe_energetica) {
        this.classe_energetica = classe_energetica;
    }

    public DotazioniEsterne getId_dotazione() {
        return Id_dotazione;
    }

    public void setId_dotazione(DotazioniEsterne id_dotazione) {
        Id_dotazione = id_dotazione;
    }

}
