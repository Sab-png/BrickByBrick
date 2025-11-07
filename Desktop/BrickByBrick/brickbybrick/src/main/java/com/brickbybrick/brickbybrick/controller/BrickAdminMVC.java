package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.brickbybrick.brickbybrick.repos.BrickRepoAdmin;
import com.brickbybrick.brickbybrick.services.BrickServiceAdminImpl;

@Controller
public class BrickAdminMVC {

    private final BrickRepoAdmin repoAdmin;

    @Autowired
    private BrickServiceAdminImpl serviceAdmin;
    public BrickAdminMVC(BrickRepoAdmin repoAdmin) {
        this.repoAdmin = repoAdmin;
    }
}
