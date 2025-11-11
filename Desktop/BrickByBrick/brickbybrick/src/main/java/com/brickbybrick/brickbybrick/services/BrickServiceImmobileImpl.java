package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;

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
    
}
