package com.brickbybrick.brickbybrick.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_admin")
    private int Id_admin;

    @Column(name = "Id_ruolo", nullable = false)
    private Integer Id_ruolo;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "cognome", nullable = false)
    private String cognome;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "passw", nullable = false)
    private String password;

    public int getId_admin() {
        return Id_admin;
    }

    public void setId_admin(int id_admin) {
        Id_admin = id_admin;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
}
