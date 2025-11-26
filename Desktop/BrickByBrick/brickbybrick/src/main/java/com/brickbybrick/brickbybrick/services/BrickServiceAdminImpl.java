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

    @Override
    public Optional<Admin> getAdminById(Integer id) {
        return repoAdmin.findById(id);
    }

    @Override
    public void deleteAdmin(Integer id) {
        repoAdmin.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return repoAdmin.existsById(id);
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        return repoAdmin.save(admin);
    }
    
}
