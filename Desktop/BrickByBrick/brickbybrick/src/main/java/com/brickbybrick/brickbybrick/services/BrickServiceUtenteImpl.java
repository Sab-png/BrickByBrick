package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.repos.BrickRepoUtente;

public class BrickServiceUtenteImpl implements BrickServiceUtente {

    @Autowired
    private BrickRepoUtente repoUtente;
}
