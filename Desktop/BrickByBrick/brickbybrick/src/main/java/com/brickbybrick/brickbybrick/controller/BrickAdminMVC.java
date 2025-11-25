package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.brickbybrick.brickbybrick.repos.BrickRepoAdmin;
import com.brickbybrick.brickbybrick.services.BrickServiceAdmin;


@Controller
public class BrickAdminMVC {
    @Autowired
    private BrickRepoAdmin repoAdmin;

    @Autowired
    private BrickServiceAdmin serviceAdmin;

    public BrickAdminMVC(BrickRepoAdmin repoAdmin) {
        this.repoAdmin = repoAdmin;
    }

    @GetMapping("/admin")
    public String getAdmin(Model m) {
        m.addAttribute("admins", serviceAdmin.getAdmins());
        return "Admin";
    }
    
    
}
