package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Ruolo;
import com.brickbybrick.brickbybrick.repos.BrickRepoRuolo;

@Service
public class BrickServiceRuoloImpl implements BrickServiceRuolo {
    
    @Autowired
    private BrickRepoRuolo repoRuolo;

    @Override
    public List<Ruolo> getRuoli() {
        return repoRuolo.findAll();
    }

    @Override
    public Optional<Ruolo> getRuoloById(Integer id) {
        return repoRuolo.findById(id);
    }

    @Override
    public Ruolo saveRuolo(Ruolo ruolo) {
        return repoRuolo.save(ruolo);
    }

    @Override
    public void deleteRuolo(Integer id) {
        repoRuolo.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return repoRuolo.existsById(id);
    }
}