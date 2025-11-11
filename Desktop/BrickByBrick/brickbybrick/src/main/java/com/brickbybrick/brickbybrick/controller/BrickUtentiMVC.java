package com.brickbybrick.brickbybrick.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.brickbybrick.brickbybrick.repos.BrickRepoUtente;
import com.brickbybrick.brickbybrick.services.BrickServiceUtente;

@Controller
public class BrickUtentiMVC {
    
    private final BrickRepoUtente repoUtente;

    @Autowired
    private BrickServiceUtente serviceUtente;

    public BrickUtentiMVC(BrickRepoUtente repoUtente){
        this.repoUtente = repoUtente;
    }

    
    @GetMapping("/utenti")
    public String getUtenti(Model m) {
        m.addAttribute("utenti", serviceUtente.getUtenti());
        return "Utenti";
    }
}
