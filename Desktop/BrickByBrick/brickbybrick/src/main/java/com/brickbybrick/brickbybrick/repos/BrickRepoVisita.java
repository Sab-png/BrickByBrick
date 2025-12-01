package com.brickbybrick.brickbybrick.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.brickbybrick.brickbybrick.model.Visita;

@Repository
public interface BrickRepoVisita extends JpaRepository<Visita, Integer> {
    
}