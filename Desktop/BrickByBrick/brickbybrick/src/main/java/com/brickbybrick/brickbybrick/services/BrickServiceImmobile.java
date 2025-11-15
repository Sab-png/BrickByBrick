package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestParam;

import com.brickbybrick.brickbybrick.model.Immobile;

public interface BrickServiceImmobile {

    List<Immobile> getImmobili();

    Immobile addImmobile(Immobile i);

    Immobile getImmobileById(int id);

    void deleteImmobile(int id);

    Specification<Immobile> regioneContains(String regione);
    Specification<Immobile> capEquals(String cap);
    Specification<Immobile> cittaEquals(String citta);
    Specification<Immobile> indirizzoContains(String indirizzo);
    Specification<Immobile> prezzoLessOrEqual(Double prezzo);
    Specification<Immobile> localiGreaterOrEqual(Integer locali);
    Specification<Immobile> superficieGreaterOrEqual(Double superficie);

    List<Immobile> filtraImmobili(String regione, String cap, String citta, String indirizzo, Double prezzo, Integer locali, Double superficie);


}
