package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.model.ContrattoEsclusivo;
import com.brickbybrick.brickbybrick.model.Utente;
import com.brickbybrick.brickbybrick.repos.BrickRepoContratto;
import com.brickbybrick.brickbybrick.repos.BrickRepoUtente;

@Service
public class BrickServiceContrattoImpl implements BrickServiceContratto {

    @Autowired
    private BrickRepoContratto repoContratto;

    @Override
    public List<ContrattoEsclusivo> getContratti() {
        return repoContratto.findAll();
    }

    @Override
    public ContrattoEsclusivo addContratti(ContrattoEsclusivo c) {
        return repoContratto.save(c);
    }

    @Override
    public Optional<ContrattoEsclusivo> getContrattoById(Integer id) {
        return repoContratto.findById(id);
    }

    @Override
    public void deleteContratto(Integer id) {
        repoContratto.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return repoContratto.existsById(id);
    }
}
