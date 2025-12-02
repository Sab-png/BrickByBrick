package com.brickbybrick.brickbybrick.services;
import java.util.List;
import java.util.Optional;
import com.brickbybrick.brickbybrick.model.Visita;




public interface BrickServiceVisita {
    
    List<Visita> getVisite();
    
    Optional<Visita> getVisitaById(Integer id);
    
    Visita saveVisita(Visita visita);
    
    void deleteVisita(Integer id);

    boolean existsById(Integer id);

    void deleteVisiteByImmobileId(Integer immobileId);

    void deleteVisiteByUtenteId(Integer utenteId);
    
   

}

