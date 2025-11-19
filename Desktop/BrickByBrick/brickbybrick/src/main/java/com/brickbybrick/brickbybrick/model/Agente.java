package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonAlias;

@Entity
@Table(name = "agente")
public class Agente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_agente")
    private Integer Id_agente;

    @Column(name = "Id_ruolo", nullable = false)
    private Integer Id_ruolo = 2;

    @Column(name = "nome", nullable = false)
    @NotBlank(message = "Nome obbligatorio")
    private String nome;

    @Column(name = "cognome", nullable = false)
    @NotBlank(message = "Cognome obbligatorio")
    private String cognome;

    @Column(name = "telefono", length = 15)
    private String telefono;

    @Column(name = "città", length = 16)
    @JsonAlias({"citta"})
    private String città;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    @NotBlank(message = "Email obbligatoria")
    @Email(message = "Email non valida")
    private String email;

    @Column(name = "passw", nullable = false)
    @NotBlank(message = "Password obbligatoria")
    private String passw;

    public Integer getId_agente() {
        return Id_agente;
    }

    public void setId_agente(Integer id_agente) {
        Id_agente = id_agente;
    }

    public Integer getId_ruolo() {
        return Id_ruolo;
    }

    public void setId_ruolo(Integer id_ruolo) {
        Id_ruolo = id_ruolo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCittà() {
        return città;
    }

    public void setCittà(String città) {
        this.città = città;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassw() {
        return passw;
    }

    public void setPassw(String passw) {
        this.passw = passw;
    }


    
}
