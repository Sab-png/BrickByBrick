package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

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
    public Optional<Agente> getAgenteById(Integer id) {
        return repoAgente.findById(id);
    }

    @Override
    public void deleteAgente(Integer id) {
        repoAgente.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return repoAgente.existsById(id);
    }

    @Override
    public List<Agente> searchAgenti(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return repoAgente.findAll();
        }
        return repoAgente.searchAgenti(searchTerm.trim());
    }
}