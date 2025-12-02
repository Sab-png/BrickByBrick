package com.brickbybrick.brickbybrick.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.brickbybrick.brickbybrick.model.Visita;

import jakarta.transaction.Transactional;

@Repository
public interface BrickRepoVisita extends JpaRepository<Visita, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Visita v WHERE v.utente.id = :id")
    void deleteByUtenteId(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Visita v WHERE v.immobile.id= :id")
    void deleteByImmobileId(@Param("id") Integer id);
}
