package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.brickbybrick.brickbybrick.repos.BrickRepoCaratteristicheImmobile;
import com.brickbybrick.brickbybrick.services.BrickServiceCaratteristicheImmobile;

@Controller
public class BrickCaratteristicheImmobileMVC {

    @Autowired
    private final BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile;

    @Autowired
    private BrickServiceCaratteristicheImmobile serviceCaratteristicheImmobile;

    public BrickCaratteristicheImmobileMVC(BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile) {
        this.repoCaratteristicheImmobile = repoCaratteristicheImmobile;
    }

    @GetMapping("/caratteristiche")
    public String getCaratteristiche(Model m) {
        m.addAttribute("caratteristiche", serviceCaratteristicheImmobile.getCaratteristiche());
        return "Caratteristiche";
    }


}
