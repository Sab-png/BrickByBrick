package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;
import com.brickbybrick.brickbybrick.model.Utente;

public interface BrickServiceUtente {

    List<Utente> getUtenti();
    
    Optional<Utente> getUtenteById(Integer id);
    
    Utente saveUtente(Utente utente);
    
    void deleteUtente(Integer id);
    
    boolean existsById(Integer id);
}