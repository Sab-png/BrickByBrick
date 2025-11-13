package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;
import com.brickbybrick.brickbybrick.services.BrickServiceAgente;

@Controller
public class BrickAgenteMVC {

    @Autowired
    private final BrickRepoAgente repoAgente;

    @Autowired
    private BrickServiceAgente serviceAgente;

    public BrickAgenteMVC(BrickRepoAgente repoAgente) {
        this.repoAgente = repoAgente;
    }

    @GetMapping("/agenti")
    public String getAgenti(Model m) {
        m.addAttribute("agenti", serviceAgente.getAgenti());
        return "Agenti";
    }

    @GetMapping("/agenti/add")
    public String showForm(Model model) {
        model.addAttribute("agente", new Agente());
        return "AgentiAdd";
    }

    @PostMapping("/agenti/add")
    public String processForm(@ModelAttribute Agente agente) {
        serviceAgente.addAgenti(agente);
        return "redirect:/agenti";
    }
    

    @GetMapping("/agenti/edit/{id}")
    public String showUpdateForm(@PathVariable("id") int id, Model model) {
        Agente agente = serviceAgente.getAgenteById(id);
        model.addAttribute("agente", agente);
        return "AgentiEdit";
    }

    @PostMapping("/agenti/update/{id}")
    public String updateAgente(@PathVariable("id") int id, @ModelAttribute("agente") Agente aggiornato) {
        System.out.println("=== POST RICEVUTA ===");
        System.out.println("ID: " + id);
        System.out.println("Agente: " + aggiornato.getNome() + " " + aggiornato.getCognome());
        
        Agente esistente = serviceAgente.getAgenteById(id);
        esistente.setNome(aggiornato.getNome());
        esistente.setCognome(aggiornato.getCognome());
        esistente.setTelefono(aggiornato.getTelefono());
        esistente.setCittà(aggiornato.getCittà());
        esistente.setEmail(aggiornato.getEmail());
        serviceAgente.addAgenti(esistente);
        return "redirect:/agenti";
    }

    @GetMapping("/agenti/delete/{id}")
    public String deleteAgente(@PathVariable("id") int id) {
        serviceAgente.deleteAgente(id);
        return "redirect:/agenti";
    }
}
