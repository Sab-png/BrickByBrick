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
    public String showUpdateForm(@PathVariable("id") Integer id, Model model) {
        Agente agente = serviceAgente.getAgenteById(id).orElse(null);
        if (agente == null) {
            return "redirect:/agenti";
        }
        model.addAttribute("agente", agente);
        return "AgentiEdit";
    }

    @PostMapping("/agenti/update/{id}")
    public String updateAgente(@PathVariable("id") Integer id, @ModelAttribute("agente") Agente aggiornato) {
        Agente esistente = serviceAgente.getAgenteById(id).orElse(null);
        if (esistente == null) {
            return "redirect:/agenti";
        }
        esistente.setNome(aggiornato.getNome());
        esistente.setCognome(aggiornato.getCognome());
        esistente.setTelefono(aggiornato.getTelefono());
        esistente.setCittà(aggiornato.getCittà());
        esistente.setEmail(aggiornato.getEmail());
        serviceAgente.addAgenti(esistente);
        return "redirect:/agenti";
    }

    @GetMapping("/agenti/delete/{id}")
    public String deleteAgente(@PathVariable("id") Integer id) {
        serviceAgente.deleteAgente(id);
        return "redirect:/agenti";
    }
}