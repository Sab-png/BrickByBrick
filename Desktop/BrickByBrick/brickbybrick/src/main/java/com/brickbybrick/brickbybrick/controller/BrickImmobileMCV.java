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
        Immobile immobile = serviceImmobile.getImmobileById(id).orElse(null);
        model.addAttribute("immobile", immobile);
        return "ImmobiliEdit";
    }

    @PostMapping("/immobili/update/{id}")
    public String updateImmobile(@PathVariable("id") int id, @ModelAttribute("immobile") Immobile aggiornato) {
        Immobile esistente = serviceImmobile.getImmobileById(id).orElse(null);
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
        @RequestParam(required = false) String tipologia,
        @RequestParam(required = false) Integer piano,
        @RequestParam(required = false) Boolean ascensore,
        @RequestParam(required = false) Boolean arredato,
        @RequestParam(required = false) String disponibilita,
        @RequestParam(required = false) String contratto,
        @RequestParam(required = false) Integer piani_edificio,
        @RequestParam(required = false) Integer anno_costruzione,
        @RequestParam(required = false) String classe_energetica,
        @RequestParam(required = false) Boolean accesso_disabili,
        @RequestParam(required = false) Integer camere,
        @RequestParam(required = false) Integer bagni,
        @RequestParam(required = false) Integer balcone,
        @RequestParam(required = false) String riscaldamento,
        @RequestParam(required = false) Boolean terrazzo,
        @RequestParam(required = false) Boolean giardino,
        @RequestParam(required = false) Integer box_auto,
        @RequestParam(required = false) Boolean cantina,
        Model model
) {
    List<Immobile> immobiliFiltrati = serviceImmobile.filtraImmobili(
        regione, cap, citta, indirizzo, prezzo, locali, superficie,
        tipologia, piano, ascensore, arredato, disponibilita,
        contratto, piani_edificio, anno_costruzione, classe_energetica, accesso_disabili,
        camere, bagni, balcone, riscaldamento, terrazzo, giardino,
        box_auto, cantina
    );

    model.addAttribute("immobili", immobiliFiltrati);
    return "Immobili";
}

}
