package com.brickbybrick.brickbybrick.services;

import java.util.List;
import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.model.Immobile;

public interface BrickServiceAgente {

    List<Agente> getAgenti();

    Agente addAgente(Agente a);
}
