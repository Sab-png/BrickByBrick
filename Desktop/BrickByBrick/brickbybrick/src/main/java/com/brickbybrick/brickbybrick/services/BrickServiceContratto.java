package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import com.brickbybrick.brickbybrick.model.ContrattoEsclusivo;

public interface BrickServiceContratto {

    List<ContrattoEsclusivo> getContratti();
    
    Optional<ContrattoEsclusivo> getContrattoById(Integer id);
        
    void deleteContratto(Integer id);
    
    boolean existsById(Integer id);

    ContrattoEsclusivo addContratti(ContrattoEsclusivo c);


}
