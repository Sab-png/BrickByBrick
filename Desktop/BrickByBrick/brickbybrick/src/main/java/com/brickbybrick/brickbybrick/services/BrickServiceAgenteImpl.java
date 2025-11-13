package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;

@Service
public class BrickServiceAgenteImpl implements BrickServiceAgente {

    @Autowired
    private BrickRepoAgente repoAgente;

    @Override
    public List<Agente> getAgenti() {
        return repoAgente.findAll();
    }

    @Override
    public Agente addAgenti(Agente a) {
        return repoAgente.save(a);
    }

    
    @Override
    public Agente getAgenteById(int id) {
        return repoAgente.findById(id).orElse(null);
    }

    @Override
    public void deleteAgente(int id) {
        repoAgente.deleteById(id);
    }
}
