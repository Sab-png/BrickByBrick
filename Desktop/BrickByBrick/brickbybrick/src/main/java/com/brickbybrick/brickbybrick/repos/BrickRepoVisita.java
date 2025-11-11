package com.brickbybrick.brickbybrick.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brickbybrick.brickbybrick.model.Visita;

@Repository
public interface BrickRepoVisita extends JpaRepository<Visita, Integer> {
    
    // Query method per trovare visite per immobile
    List<Visita> findByIdImmobile(Integer idImmobile);
    
    // Query method per trovare visite per agente
    List<Visita> findByIdAgente(Integer idAgente);
}