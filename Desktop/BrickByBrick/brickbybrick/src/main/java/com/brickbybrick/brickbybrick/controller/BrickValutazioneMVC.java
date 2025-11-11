package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;
import com.brickbybrick.brickbybrick.services.BrickServiceValutazione;

@Controller
public class BrickValutazioneMVC {

    @Autowired
    private final BrickRepoValutazione repoValutazione;

    @Autowired
    private BrickServiceValutazione serviceValutazione;

    public BrickValutazioneMVC(BrickRepoValutazione repoValutazione) {
        this.repoValutazione = repoValutazione;
    }

    @GetMapping("/valutazioni")
    public String getValutazioni(Model m) {
        m.addAttribute("valutazioni", serviceValutazione.getValutazioni());
        return "Valutazioni";
    }

}
