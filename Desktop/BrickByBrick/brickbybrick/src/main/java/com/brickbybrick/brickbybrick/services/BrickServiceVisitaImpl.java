package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Visita;
import com.brickbybrick.brickbybrick.repos.BrickRepoVisita;

@Service
public class BrickServiceVisitaImpl implements BrickServiceVisita {

    @Autowired
    private BrickRepoVisita repoVisita;

    @Override
    public List<Visita> getVisite() {
        return repoVisita.findAll();
    }

    @Override
    public Optional<Visita> getVisitaById(Integer id) {
        return repoVisita.findById(id);}

    @Override
    public Visita saveVisita(Visita visita) {
      return repoVisita.save(visita);
    }

    @Override
    public void deleteVisita(Integer id) {
        repoVisita.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id){
        return repoVisita.existsById(id);
    }

}