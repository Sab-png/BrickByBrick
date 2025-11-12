package com.brickbybrick.brickbybrick.services;

import java.util.List;

import com.brickbybrick.brickbybrick.model.Visita;

public interface BrickServiceVisita {
    
    List<Visita> getVisite();
    
    Visita getVisitaById(Integer id);
    
    void addVisita(Visita visita);
    
    void updateVisita(Visita visita);
    
    void deleteVisita(Integer id);
}