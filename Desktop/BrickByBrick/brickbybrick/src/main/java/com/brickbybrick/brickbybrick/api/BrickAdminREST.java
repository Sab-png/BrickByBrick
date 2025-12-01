package com.brickbybrick.brickbybrick.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Admin;
import com.brickbybrick.brickbybrick.services.BrickServiceAdmin;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}) 
public class BrickAdminREST {
    
    @Autowired
    private BrickServiceAdmin serviceAdmin;

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = serviceAdmin.getAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Integer id) {
        return serviceAdmin.getAdminById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin nuovoAdmin = serviceAdmin.saveAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoAdmin);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Integer id, @RequestBody Admin admin) {
        if (!serviceAdmin.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        admin.setId_admin(id);
        Admin adminAggiornato = serviceAdmin.saveAdmin(admin);
        return ResponseEntity.ok(adminAggiornato);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        if (!serviceAdmin.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceAdmin.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
