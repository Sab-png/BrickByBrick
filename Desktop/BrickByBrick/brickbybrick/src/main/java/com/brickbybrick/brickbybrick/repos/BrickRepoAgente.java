package com.brickbybrick.brickbybrick.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.brickbybrick.brickbybrick.model.Agente;

public interface BrickRepoAgente extends JpaRepository<Agente, Integer> {
    Optional<Agente> findByEmailIgnoreCase(String email);

    @Query("SELECT a FROM Agente a WHERE " +
           "LOWER(a.nome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.cognome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.città) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.telefono) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Agente> searchAgenti(@Param("searchTerm") String searchTerm);

}
