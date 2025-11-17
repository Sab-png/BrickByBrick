package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Admin;
import com.brickbybrick.brickbybrick.repos.BrickRepoAdmin;

@Service
public class BrickServiceAdminImpl implements BrickServiceAdmin {

    @Autowired
    private BrickRepoAdmin repoAdmin;

    @Override
    public List<Admin> getAdmins() {
        return repoAdmin.findAll();
    }
    
}
