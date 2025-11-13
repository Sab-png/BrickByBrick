package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;

@Service
public class BrickServiceImmobileImpl implements BrickServiceImmobile {

    @Autowired
    private BrickRepoImmobile repoImmobile;

    @Override
    public List<Immobile> getImmobili() {
        return repoImmobile.findAll();
    }

    @Override
    public Immobile addImmobile(Immobile i) {
        return repoImmobile.save(i);
    }

    // @Override
    // public Immobile save(Immobile i) {
    //     return repoImmobile.save(i);
    // }

    @Override
    public Immobile getImmobileById(int id) {
        return repoImmobile.findById(id).orElse(null);
    }
    
    @Override
    public void deleteImmobile(int id) {
        repoImmobile.deleteById(id);
    }
}
