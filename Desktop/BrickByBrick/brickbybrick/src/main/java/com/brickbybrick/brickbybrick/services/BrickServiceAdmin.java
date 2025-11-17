package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import com.brickbybrick.brickbybrick.model.Admin;

public interface BrickServiceAdmin {
    
    List<Admin> getAdmins();
    
    Optional<Admin> getAdminById(Integer id);
    
    Admin saveAdmin(Admin admin);
    
    void deleteAdmin(Integer id);
    
    boolean existsById(Integer id);
}