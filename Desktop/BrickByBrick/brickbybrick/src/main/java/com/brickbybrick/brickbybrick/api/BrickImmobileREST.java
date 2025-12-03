package com.brickbybrick.brickbybrick.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.services.BrickServiceImmobile;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/immobili")
@CrossOrigin(origins = "http://localhost:5173") 
public class BrickImmobileREST {

    @Autowired
    private BrickServiceImmobile serviceImmobile;



    @GetMapping
    public ResponseEntity<List<Immobile>> getImmobili(
            @RequestParam(required = false) String search) {
        List<Immobile> immobili;
        
        if (search != null && !search.trim().isEmpty()) {
            // Se c'è un parametro search, usa la ricerca
            immobili = serviceImmobile.searchImmobili(search);
        } else {
            // Altrimenti ritorna tutti gli immobili
            immobili = serviceImmobile.getImmobili();
        }
        
        return ResponseEntity.ok(immobili);
    }
    
    

    @GetMapping("/{id}")
    public ResponseEntity<Immobile> getImmobileById(@PathVariable Integer id) {
        return serviceImmobile.getImmobileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Immobile> createImmobile(@RequestBody Immobile immobile) {
        Immobile nuovoImmobile = serviceImmobile.addImmobile(immobile);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovoImmobile);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Immobile> updateImmobile(@PathVariable Integer id, @RequestBody Immobile immobile) {
        // Verifica se l'immobile esiste
        if (!serviceImmobile.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        // Recupera l'immobile esistente dal database
        Immobile immobileEsistente = serviceImmobile.getImmobileById(id)
                .orElse(null);
        
        if (immobileEsistente == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Aggiorna i campi base dell'immobile
        immobileEsistente.setFoto(immobile.getFoto());
        immobileEsistente.setCap(immobile.getCap());
        immobileEsistente.setCitta(immobile.getCitta());
        immobileEsistente.setRegione(immobile.getRegione());
        immobileEsistente.setIndirizzo(immobile.getIndirizzo());
        immobileEsistente.setPrezzo(immobile.getPrezzo());
        immobileEsistente.setLocali(immobile.getLocali());
        immobileEsistente.setSuperficie(immobile.getSuperficie());
        immobileEsistente.setDescrizione(immobile.getDescrizione());
        immobileEsistente.setPlanimetria(immobile.getPlanimetria());
        immobileEsistente.setMappa(immobile.getMappa());
        
        // Aggiorna le caratteristiche se fornite
        if (immobile.getCaratteristiche() != null) {
            if (immobileEsistente.getCaratteristiche() != null) {
                // Aggiorna le caratteristiche esistenti
                immobileEsistente.getCaratteristiche().setTipologia(immobile.getCaratteristiche().getTipologia());
                immobileEsistente.getCaratteristiche().setPiano(immobile.getCaratteristiche().getPiano());
                immobileEsistente.getCaratteristiche().setAscensore(immobile.getCaratteristiche().getAscensore());
                immobileEsistente.getCaratteristiche().setArredato(immobile.getCaratteristiche().getArredato());
                immobileEsistente.getCaratteristiche().setDisponibilita(immobile.getCaratteristiche().getDisponibilita());
                immobileEsistente.getCaratteristiche().setContratto(immobile.getCaratteristiche().getContratto());
                immobileEsistente.getCaratteristiche().setPiani_edificio(immobile.getCaratteristiche().getPiani_edificio());
                immobileEsistente.getCaratteristiche().setAnno_costruzione(immobile.getCaratteristiche().getAnno_costruzione());
                immobileEsistente.getCaratteristiche().setClasse_energetica(immobile.getCaratteristiche().getClasse_energetica());
                immobileEsistente.getCaratteristiche().setAccesso_disabili(immobile.getCaratteristiche().getAccesso_disabili());
                immobileEsistente.getCaratteristiche().setCamere(immobile.getCaratteristiche().getCamere());
                immobileEsistente.getCaratteristiche().setBagni(immobile.getCaratteristiche().getBagni());
                immobileEsistente.getCaratteristiche().setBalcone(immobile.getCaratteristiche().getBalcone());
                immobileEsistente.getCaratteristiche().setTerrazzo(immobile.getCaratteristiche().getTerrazzo());
                immobileEsistente.getCaratteristiche().setGiardino(immobile.getCaratteristiche().getGiardino());
                immobileEsistente.getCaratteristiche().setBox_auto(immobile.getCaratteristiche().getBox_auto());
                immobileEsistente.getCaratteristiche().setCantina(immobile.getCaratteristiche().getCantina());
                immobileEsistente.getCaratteristiche().setRiscaldamento(immobile.getCaratteristiche().getRiscaldamento());
                immobileEsistente.getCaratteristiche().setAltre_caratteristiche(immobile.getCaratteristiche().getAltre_caratteristiche());
            } else {
                // Crea nuove caratteristiche
                immobileEsistente.setCaratteristiche(immobile.getCaratteristiche());
            }
        }
        
        // Salva l'immobile aggiornato
        Immobile immobileAggiornato = serviceImmobile.addImmobile(immobileEsistente);
        return ResponseEntity.ok(immobileAggiornato);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteImmobile(@PathVariable Integer id) {
        if (!serviceImmobile.existsById(id) ) {
            return ResponseEntity.notFound().build();
        }   
        serviceImmobile.deleteImmobile(id);
        return ResponseEntity.noContent().build();
    }
    
    


}
