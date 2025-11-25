package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;
import com.brickbybrick.brickbybrick.model.CaratteristicheImmobile;


public interface BrickServiceCaratteristicheImmobile {

    List<CaratteristicheImmobile> getCaratteristiche();

    CaratteristicheImmobile addCaratteristica(CaratteristicheImmobile a);

    Optional<CaratteristicheImmobile> getCaratteristicaById(Integer id);

    void deleteCaratteristica(Integer id);
    
    boolean existsById(Integer id);
}
