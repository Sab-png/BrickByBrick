package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;

public class BrickServiceValutazioneImpl implements BrickServiceValutazione {
    @Autowired
    private BrickRepoValutazione repoValutazione;

}
