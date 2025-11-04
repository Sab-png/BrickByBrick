package com.brickbybrick.brickbybrick.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.brickbybrick.brickbybrick.repos.BrickRepoUtente;

@Controller
public class BrickUtentiMVC {
    
    private final BrickRepoUtente repoUtente;

    @Autowired
    private BrickServiceUtenteImpl srvUtente;

    public BrickUtentiMVC(BrickRepoUtente repoUtente){
        this.repoUtente = repoUtente;
    }
}
