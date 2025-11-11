package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.brickbybrick.brickbybrick.repos.BrickRepoRuolo;
import com.brickbybrick.brickbybrick.services.BrickServiceRuolo;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class BrickRuoloMVC {

    @Autowired
    private final BrickRepoRuolo repoRuolo;

    @Autowired
    private BrickServiceRuolo serviceRuolo;

    public BrickRuoloMVC(BrickRepoRuolo repoRuolo) {
        this.repoRuolo = repoRuolo;
    }

    @GetMapping("/ruoli")
    public String getRuoli(Model m) {
        m.addAttribute("ruoli", serviceRuolo.getRuoli());
        return "Ruoli";
    }
    
}
