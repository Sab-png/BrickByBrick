package com.brickbybrick.brickbybrick.services;

import java.util.List;
import com.brickbybrick.brickbybrick.model.Immobile;

public interface BrickServiceImmobile {

    List<Immobile> getImmobili();

    Immobile addImmobile(Immobile i);

    Immobile getImmobileById(int id);

}
