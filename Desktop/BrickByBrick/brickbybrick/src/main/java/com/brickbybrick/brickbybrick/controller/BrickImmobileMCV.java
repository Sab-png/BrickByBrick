package com.brickbybrick.brickbybrick.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.brickbybrick.brickbybrick.model.CaratteristicheImmobile;
import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;
import com.brickbybrick.brickbybrick.services.BrickServiceImmobile;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class BrickImmobileMCV {
    @Autowired
    private final BrickRepoImmobile repoImmobile;

    @Autowired
    private BrickServiceImmobile serviceImmobile;

    public BrickImmobileMCV(BrickRepoImmobile repoImmobile) {
        this.repoImmobile = repoImmobile;
    }

    @GetMapping("/immobili")
    public String getImmobili(Model m) {
        m.addAttribute("immobili", serviceImmobile.getImmobili());
        return "Immobili";
    }


    @GetMapping("/immobili/add")
    public String showForm(Model model) {
        Immobile immobile = new Immobile();
        immobile.setCaratteristiche(new CaratteristicheImmobile()); 
        model.addAttribute("immobile", immobile);
        return "ImmobiliAdd";
    }

    @PostMapping("/immobili/add")
    public String processForm(@ModelAttribute Immobile immobile) {
        serviceImmobile.addImmobile(immobile); 
        return "redirect:/immobili";
    }

    @GetMapping("/immobili/edit/{id}")
    public String showUpdateForm(@PathVariable("id") int id, Model model) {
        Immobile immobile = serviceImmobile.getImmobileById(id);
        model.addAttribute("immobile", immobile);
        return "ImmobiliEdit";
    }

    @PostMapping("/immobili/update/{id}")
    public String updateImmobile(@PathVariable("id") int id, @ModelAttribute("immobile") Immobile aggiornato) {
        Immobile esistente = serviceImmobile.getImmobileById(id);
        esistente.setFoto(aggiornato.getFoto());
        esistente.setRegione(aggiornato.getRegione());
        esistente.setCap(aggiornato.getCap());
        esistente.setCitta(aggiornato.getCitta());
        esistente.setIndirizzo(aggiornato.getIndirizzo());
        esistente.setPrezzo(aggiornato.getPrezzo());
        esistente.setLocali(aggiornato.getLocali());
        esistente.setSuperficie(aggiornato.getSuperficie());
        esistente.setDescrizione(aggiornato.getDescrizione());
        // esistente.setId_caratteristiche(aggiornato.getId_caratteristiche());
        esistente.setPlanimetria(aggiornato.getPlanimetria());
        esistente.setMappa(aggiornato.getMappa());
        serviceImmobile.addImmobile(esistente);
        return "redirect:/immobili";
    }

    @GetMapping("/immobili/delete/{id}")
    public String deleteImmobile(@PathVariable("id") int id) {
        serviceImmobile.deleteImmobile(id);
        return "redirect:/immobili";
    }

    @GetMapping("/immobili/filtra")
    public String filtraImmobili(
            @RequestParam(required = false) String regione,
            @RequestParam(required = false) String cap,
            @RequestParam(required = false) String citta,
            @RequestParam(required = false) String indirizzo,
            @RequestParam(required = false) Double prezzo,
            @RequestParam(required = false) Integer locali,
            @RequestParam(required = false) Double superficie,
            // qui potresti filtrare anche per le caratteristiche dell'immobile
            Model model


    ) {
        List<Immobile> immobiliFiltrati = serviceImmobile.filtraImmobili(regione, cap, citta, indirizzo, prezzo, locali, superficie);
        model.addAttribute("immobili", immobiliFiltrati);
        return "Immobili"; 
    }

}
