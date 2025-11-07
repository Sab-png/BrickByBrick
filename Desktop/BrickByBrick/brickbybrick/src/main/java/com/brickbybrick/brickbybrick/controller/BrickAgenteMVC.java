package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;
import com.brickbybrick.brickbybrick.services.BrickServiceAgenteImpl;
@Controller
public class BrickAgenteMVC {
    
    private final BrickRepoAgente repoAgente;
    @Autowired
    private BrickServiceAgenteImpl serviceAgente;

    public BrickAgenteMVC(BrickRepoAgente repoAgente) {
        this.repoAgente = repoAgente;
    }


    
}
