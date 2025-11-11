package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Utente;
import com.brickbybrick.brickbybrick.repos.BrickRepoUtente;

@Service
public class BrickServiceUtenteImpl implements BrickServiceUtente {

    @Autowired
    private BrickRepoUtente repoUtente;

    @Override
    public List<Utente> getUtenti() {
        return repoUtente.findAll();
    }
}
