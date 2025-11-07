package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.brickbybrick.brickbybrick.repos.BrickRepoRuolo;
import com.brickbybrick.brickbybrick.services.BrickServiceRuoloImpl;
@Controller
public class BrickRuoloMVC {
    private final BrickRepoRuolo repoRuolo;
    @Autowired
    private BrickServiceRuoloImpl serviceRuolo;

    public BrickRuoloMVC(BrickRepoRuolo repoRuolo) {
        this.repoRuolo = repoRuolo;
    }
}
