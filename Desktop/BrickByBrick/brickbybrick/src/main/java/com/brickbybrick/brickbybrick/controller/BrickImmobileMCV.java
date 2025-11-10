package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;
import com.brickbybrick.brickbybrick.services.BrickServiceImmobile;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class BrickImmobileMCV {
    @Autowired
    private final BrickRepoImmobile repoImmobile;

    @Autowired
    private BrickServiceImmobile serviceImmobile;

    public BrickImmobileMCV(BrickRepoImmobile repoImmobile) {
        this.repoImmobile = repoImmobile;
    }

    @GetMapping("/immobili")
    public String getImmobili(Model m) {
        m.addAttribute("immobili", serviceImmobile.getImmobili());
        return "Immobili";
    }
    

}
