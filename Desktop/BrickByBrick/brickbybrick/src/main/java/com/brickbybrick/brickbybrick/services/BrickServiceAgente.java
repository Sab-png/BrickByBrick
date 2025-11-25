package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import com.brickbybrick.brickbybrick.model.Agente;

public interface BrickServiceAgente {

    List<Agente> getAgenti();

    Agente addAgenti(Agente a);

    Optional<Agente> getAgenteById(Integer id);

    void deleteAgente(Integer id);
    
    boolean existsById(Integer id);
}