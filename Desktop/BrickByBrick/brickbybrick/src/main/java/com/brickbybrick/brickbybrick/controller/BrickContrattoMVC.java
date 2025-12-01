package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.brickbybrick.brickbybrick.model.ContrattoEsclusivo;
import com.brickbybrick.brickbybrick.repos.BrickRepoContratto;
import com.brickbybrick.brickbybrick.services.BrickServiceContratto;

import jakarta.validation.Valid;

@Controller
public class BrickContrattoMVC {

    @Autowired
    private final BrickRepoContratto repoContratto;

    @Autowired
    private BrickServiceContratto serviceContratto;

    public BrickContrattoMVC(BrickRepoContratto repoContratto) {
        this.repoContratto = repoContratto;
    }

    @GetMapping("/contratti")
    public String getContratto(Model m) {
        m.addAttribute("contatto", serviceContratto.getContratti());
        return "Contratti";
    }

    @GetMapping("/contratti/add")
    public String showForm(Model model) {
        model.addAttribute("contratto", new ContrattoEsclusivo());
        return "ContrattiAdd";
    }

    @PostMapping("/contratti/add")
    public String processForm(@Valid @ModelAttribute("contratti") ContrattoEsclusivo contratto, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("contratto", contratto);
            return "ContrattiAdd";
        }
        serviceContratto.addContratti(contratto);
        return "redirect:/contratti";
    }

    @PostMapping(value = "/contratti/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ContrattoEsclusivo> processJson(@Valid @RequestBody ContrattoEsclusivo contratto) {
        ContrattoEsclusivo saved = serviceContratto.addContratti(contratto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    @GetMapping("/contratti/edit/{id}")
    public String showUpdateForm(@PathVariable("id") Integer id, Model model) {
        ContrattoEsclusivo contratto = serviceContratto.getContrattoById(id).orElse(null);
        if (contratto == null) {
            return "redirect:/contratti";
        }
        model.addAttribute("contratto", contratto);
        return "ContrattiEdit";
    }

    @PostMapping("/contratti/update/{id}")
    public String updateContratto(@PathVariable("id") Integer id, @ModelAttribute("contratto") ContrattoEsclusivo aggiornato) {
        ContrattoEsclusivo esistente = serviceContratto.getContrattoById(id).orElse(null);
        if (esistente == null) {
            return "redirect:/contratti";
        }
        esistente.setId_immobile(aggiornato.getId_immobile());
        esistente.setId_utente(aggiornato.getId_utente());
        esistente.setData_di_scadenza(aggiornato.getData_di_scadenza());
        esistente.setPrezzo(aggiornato.getPrezzo());
        serviceContratto.addContratti(esistente);
        return "redirect:/contratti";
    }

    @GetMapping("/contratti/delete/{id}")
    public String deleteContratto(@PathVariable("id") Integer id) {
        serviceContratto.deleteContratto(id);
        return "redirect:/contratti";
    }
}