package com.brickbybrick.brickbybrick.services;

import java.util.List;
import com.brickbybrick.brickbybrick.model.Agente;


public interface BrickServiceAgente {

    List<Agente> getAgenti();

    Agente addAgenti(Agente a);

    Agente getAgenteById(int id);

    void deleteAgente(int id);
}
