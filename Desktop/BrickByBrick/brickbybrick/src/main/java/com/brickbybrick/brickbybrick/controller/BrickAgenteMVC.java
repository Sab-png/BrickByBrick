package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;
import com.brickbybrick.brickbybrick.services.BrickServiceAgente;

@Controller
public class BrickAgenteMVC {

    @Autowired
    private final BrickRepoAgente repoAgente;

    @Autowired
    private BrickServiceAgente serviceAgente;

    public BrickAgenteMVC(BrickRepoAgente repoAgente) {
        this.repoAgente = repoAgente;
    }

    @GetMapping("/agenti")
    public String getAgenti(Model m) {
        m.addAttribute("agenti", serviceAgente.getAgenti());
        return "Agenti";
    }
    
}
