package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;
@Controller
public class BrickImmobileMCV {
    private final BrickRepoImmobile repoImmobile;
    @Autowired
    private BrickRepoImmobile serviceImmobile;
    public BrickImmobileMCV(BrickRepoImmobile repoImmobile) {
        this.repoImmobile = repoImmobile;
    }

}
