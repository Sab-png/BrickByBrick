package com.brickbybrick.brickbybrick.services;

import java.util.List;

import com.brickbybrick.brickbybrick.model.Visita;

public interface BrickServiceVisita {

    List<Visita> getVisite();

    Visita addVisita(Visita v);

    Visita getVisitaById(Integer id);

    List<Visita> getVisiteByImmobile(Integer idImmobile);

    List<Visita> getVisiteByAgente(Integer idAgente);

    Visita updateVisita(Integer id, Visita v);

    void deleteVisita(Integer id);

    void deleteAllVisite();
}
