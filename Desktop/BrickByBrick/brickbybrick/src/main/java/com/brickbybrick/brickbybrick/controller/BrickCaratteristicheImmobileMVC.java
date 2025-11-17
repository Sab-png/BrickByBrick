package com.brickbybrick.brickbybrick.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.model.CaratteristicheImmobile;
import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.repos.BrickRepoCaratteristicheImmobile;
import com.brickbybrick.brickbybrick.services.BrickServiceCaratteristicheImmobile;

@Controller
public class BrickCaratteristicheImmobileMVC {

    @Autowired
    private final BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile;

    @Autowired
    private BrickServiceCaratteristicheImmobile serviceCaratteristicheImmobile;

    public BrickCaratteristicheImmobileMVC(BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile) {
        this.repoCaratteristicheImmobile = repoCaratteristicheImmobile;
    }

    @GetMapping("/caratteristiche")
    public String getCaratteristiche(Model m) {
        m.addAttribute("caratteristiche", serviceCaratteristicheImmobile.getCaratteristiche());
        return "Caratteristiche";
    }

    @GetMapping("/caratteristiche/add")
    public String showForm(Model model) {
        model.addAttribute("caratteristica", new CaratteristicheImmobile());
        return "CaratteristicheAdd";
    }

    @PostMapping("/caratteristiche/add")
    public String processForm(@ModelAttribute CaratteristicheImmobile caratteristica) {
        serviceCaratteristicheImmobile.addCaratteristica(caratteristica);
        return "redirect:/caratteristiche";
    }
    
    @GetMapping("/caratteristiche/edit/{id}")
    public String showUpdateForm(@PathVariable("id") int id, Model model) {
        CaratteristicheImmobile caratteristica = serviceCaratteristicheImmobile.getCaratteristicaById(id);
        model.addAttribute("caratteristica", caratteristica);
        return "CaratteristicheEdit";
    }


    @PostMapping("/caratteristiche/update/{id}")
    public String updateCaratteristica(@PathVariable("id") int id, @ModelAttribute("caratteristica") CaratteristicheImmobile aggiornata) {
        CaratteristicheImmobile esistente = serviceCaratteristicheImmobile.getCaratteristicaById(id);
        esistente.setTipologia(aggiornata.getTipologia());
        esistente.setPiano(aggiornata.getPiano());
        esistente.setAscensore(aggiornata.getAscensore());
        esistente.setArredato(aggiornata.getArredato());
        esistente.setDisponibilita(aggiornata.getDisponibilita());
        esistente.setContratto(aggiornata.getContratto());
        esistente.setPiani_edificio(aggiornata.getPiani_edificio());
        esistente.setAnno_costruzione(aggiornata.getAnno_costruzione());
        esistente.setClasse_energetica(aggiornata.getClasse_energetica());
        esistente.setAccesso_disabili(aggiornata.getAccesso_disabili());
        esistente.setCamere(aggiornata.getCamere());
        esistente.setBagni(aggiornata.getBagni());
        esistente.setBalcone(aggiornata.getBalcone());
        esistente.setRiscaldamento(aggiornata.getRiscaldamento());
        esistente.setTerrazzo(aggiornata.getTerrazzo());
        esistente.setGiardino(aggiornata.getGiardino());
        esistente.setBox_auto(aggiornata.getBox_auto());
        esistente.setCantina(aggiornata.getCantina());
        esistente.setAltre_caratteristiche(aggiornata.getAltre_caratteristiche());
        serviceCaratteristicheImmobile.addCaratteristica(esistente);
        return "redirect:/caratteristiche";
    }

    @GetMapping("/caratteristiche/delete/{id}")
    public String deleteCaratteristica(@PathVariable("id") int id) {
        serviceCaratteristicheImmobile.deleteCaratteristica(id);
        return "redirect:/caratteristiche";
    }

}
