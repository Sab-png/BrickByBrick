package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.brickbybrick.brickbybrick.repos.BrickRepoCaratteristicheImmobile;

@Controller
public class BrickCaratteristicheImmobileMVC {
    private final BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile;

    @Autowired
    private BrickRepoCaratteristicheImmobile serviceCaratteristicheImmobile;
    public BrickCaratteristicheImmobileMVC(BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile) {
        this.repoCaratteristicheImmobile = repoCaratteristicheImmobile;
    }


}
