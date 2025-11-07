package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;
import com.brickbybrick.brickbybrick.services.BrickServiceValutazioneImpl;
@Controller

public class BrickValutazioneMVC {



    private final BrickRepoValutazione repoValutazione;

    @Autowired
    private BrickServiceValutazioneImpl serviceValutazione;
    public BrickValutazioneMVC(BrickRepoValutazione repoValutazione) {
        this.repoValutazione = repoValutazione;
    }


}
