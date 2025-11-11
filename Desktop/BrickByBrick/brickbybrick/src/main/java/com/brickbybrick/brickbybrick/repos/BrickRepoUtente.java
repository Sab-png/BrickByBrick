package com.brickbybrick.brickbybrick.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.brickbybrick.brickbybrick.model.Utente;

public interface BrickRepoUtente extends JpaRepository<Utente, Integer> {
    
}
