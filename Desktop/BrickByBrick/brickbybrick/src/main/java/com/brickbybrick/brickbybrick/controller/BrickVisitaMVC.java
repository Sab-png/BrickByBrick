// package com.brickbybrick.brickbybrick.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.ModelAttribute;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import com.brickbybrick.brickbybrick.model.Visita;
// import com.brickbybrick.brickbybrick.repos.BrickRepoVisita;
// import com.brickbybrick.brickbybrick.services.BrickServiceVisita;

// @Controller
// public class BrickVisitaMVC {

//     @Autowired
//     private final BrickRepoVisita repoVisita;

//     @Autowired
//     private BrickServiceVisita serviceVisita;

//     public BrickVisitaMVC(BrickRepoVisita repoVisita) {
//         this.repoVisita = repoVisita;
//     }

//     @GetMapping("/visite")
//     public String getVisite(Model m) {
//         m.addAttribute("visite", serviceVisita.getVisite());
//         return "Visite";
//     }

//     @GetMapping("/visite/add")
//     public String showForm(Model model) {
//         model.addAttribute("visita", new Visita());
//         return "AddVisite";
//     }

//     @PostMapping("/visite/add")
//     public String processForm(@ModelAttribute Visita visita) {
//         serviceVisita.saveVisita(visita);
//         return "redirect:/visite";
//     }
//     @GetMapping("/visite/edit/{id}")
//     public String showUpdateForm(@PathVariable("id") int id, Model model) {
//         Visita visita = serviceVisita.getVisitaById(id).orElse(null);
//         model.addAttribute("visita", visita);
//         return "VisiteEdit";
//     }
//     @PostMapping("/visite/update/{id}")
//     public String updateVisita(@PathVariable("id") int id, @ModelAttribute("visita") Visita aggiornata) {
//         Visita esistente = serviceVisita.getVisitaById(id).orElse(null);
//         esistente.setData(aggiornata.getData());
//         esistente.setImmobile(aggiornata.getImmobile());
//         esistente.setAgente(aggiornata.getAgente());
//         serviceVisita.saveVisita(esistente);
//         return "redirect:/visite";
//     }
//     @GetMapping("/visite/delete/{id}")
//     public String deleteVisita(@PathVariable("id") int id) {
//         serviceVisita.deleteVisita(id);
//         return "redirect:/visite";
//     }
    
// }

