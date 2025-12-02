package com.brickbybrick.brickbybrick.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.brickbybrick.brickbybrick.model.Utente;

public interface BrickRepoUtente extends JpaRepository<Utente, Integer> {
        Optional<Utente> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
    
    @Query("SELECT u FROM Utente u WHERE " +
           "LOWER(u.nome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.cognome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.telefono) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.codice_fiscale) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Utente> searchUtenti(@Param("searchTerm") String searchTerm);
}
