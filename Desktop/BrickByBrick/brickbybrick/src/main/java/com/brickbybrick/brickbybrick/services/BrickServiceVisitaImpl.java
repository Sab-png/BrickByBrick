package com.brickbybrick.brickbybrick.services;

import java.util.List;

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
    public Visita getVisitaById(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getVisitaById'");
    }

    @Override
    public void addVisita(Visita visita) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addVisita'");
    }

    @Override
    public void updateVisita(Visita visita) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateVisita'");
    }

    @Override
    public void deleteVisita(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteVisita'");
    }

}