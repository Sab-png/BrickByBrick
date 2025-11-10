package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;

public class BrickServiceAgenteImpl implements BrickServiceAgente {

    @Autowired
    private BrickRepoAgente repoAgente;

    @Override
    public List<Agente> getAgenti() {
        return repoAgente.findAll();
    }
}
