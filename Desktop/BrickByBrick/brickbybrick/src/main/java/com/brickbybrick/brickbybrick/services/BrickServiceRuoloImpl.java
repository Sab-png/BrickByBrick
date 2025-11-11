package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.model.Ruolo;
import com.brickbybrick.brickbybrick.repos.BrickRepoRuolo;

public class BrickServiceRuoloImpl implements BrickServiceRuolo 
{
    @Autowired
    private BrickRepoRuolo repoRuolo;

    @Override
    public List<Ruolo> getRuoli() {
        return repoRuolo.findAll();
    }
}
