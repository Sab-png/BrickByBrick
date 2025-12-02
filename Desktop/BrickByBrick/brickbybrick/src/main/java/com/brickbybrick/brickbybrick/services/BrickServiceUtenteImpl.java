package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Optional<Utente> getUtenteById(Integer id) {
        return repoUtente.findById(id);
    }

    @Override
    public Utente saveUtente(Utente utente) {
        return repoUtente.save(utente);
    }

    @Override
    public void deleteUtente(Integer id) {
        repoUtente.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return repoUtente.existsById(id);
    }

    @Override
    public List<Utente> searchUtenti(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return repoUtente.findAll();
        }
        return repoUtente.searchUtenti(searchTerm.trim());
    }
}