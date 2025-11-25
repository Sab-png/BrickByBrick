// package com.brickbybrick.brickbybrick.model;

// import java.time.LocalDateTime;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "visita")
// public class Visita {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "Id_visita")
//     private Integer idVisita;

//     @ManyToOne
//     @JoinColumn(name = "Id_immobile", nullable = false)
//     private Immobile immobile;

//     @Column(name = "Id_agente", nullable = false)
//     private Integer idAgente;

//     @Column(name = "data", nullable = false)
//     private LocalDateTime data;

//     @ManyToOne
//     @JoinColumn(name = "Id_agente", insertable = false, updatable = false)
//     private Utente agente;

//     // Costruttori
//     public Visita() {}

//     public Visita(Immobile immobile, Integer idAgente, LocalDateTime data) {
//         this.immobile = immobile;
//         this.idAgente = idAgente;
//         this.data = data;
//     }

//     // Getter e Setter
//     public Integer getIdVisita() {
//         return idVisita;
//     }

//     public void setIdVisita(Integer idVisita) {
//         this.idVisita = idVisita;
//     }

//     public Immobile getImmobile() {
//         return immobile;
//     }

//     public void setImmobile(Immobile immobile) {
//         this.immobile = immobile;
//     }

//     public Integer getIdAgente() {
//         return idAgente;
//     }

//     public void setIdAgente(Integer idAgente) {
//         this.idAgente = idAgente;
//     }

//     public LocalDateTime getData() {
//         return data;
//     }

//     public void setData(LocalDateTime data) {
//         this.data = data;
//     }

//     public Utente getAgente() {
//         return agente;
//     }

//     public void setAgente(Utente agente) {
//         this.agente = agente;
//     }
// }
