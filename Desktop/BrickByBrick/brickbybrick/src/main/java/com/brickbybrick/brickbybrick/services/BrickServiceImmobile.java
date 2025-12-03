package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;
import com.brickbybrick.brickbybrick.model.Immobile;

public interface BrickServiceImmobile {

    List<Immobile> getImmobili();

    Immobile addImmobile(Immobile i);

    Optional<Immobile>  getImmobileById(int id);

    void deleteImmobile(int id);

    boolean existsById(Integer id);
    
    List<Immobile> searchImmobili(String searchTerm);

    }

