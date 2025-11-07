package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;

public class BrickServiceAgenteImpl implements BrickServiceAgente {

    @Autowired
    private BrickRepoAgente repoAgente;
}
