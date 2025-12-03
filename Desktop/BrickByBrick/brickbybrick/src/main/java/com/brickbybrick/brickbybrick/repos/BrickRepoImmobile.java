package com.brickbybrick.brickbybrick.repos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.brickbybrick.brickbybrick.model.Immobile;

public interface BrickRepoImmobile extends JpaRepository<Immobile, Integer>, JpaSpecificationExecutor<Immobile> {

    @Query("SELECT i FROM Immobile i LEFT JOIN i.caratteristiche c WHERE " +
           "LOWER(i.citta) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(i.indirizzo) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(i.descrizione) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.tipologia) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.contratto) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.disponibilita) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Immobile> searchImmobili(@Param("searchTerm") String searchTerm);

}
