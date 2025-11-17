package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import com.brickbybrick.brickbybrick.model.Ruolo;

public interface BrickServiceRuolo {

    List<Ruolo> getRuoli();
    
    Optional<Ruolo> getRuoloById(Integer id);
    
    Ruolo saveRuolo(Ruolo ruolo);
    
    void deleteRuolo(Integer id);
    
    boolean existsById(Integer id);
}