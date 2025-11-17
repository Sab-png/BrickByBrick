package com.brickbybrick.brickbybrick.services;

import java.util.List;
import com.brickbybrick.brickbybrick.model.CaratteristicheImmobile;


public interface BrickServiceCaratteristicheImmobile {

    List<CaratteristicheImmobile> getCaratteristiche();

    CaratteristicheImmobile addCaratteristica(CaratteristicheImmobile a);

    CaratteristicheImmobile getCaratteristicaById(int id);

    void deleteCaratteristica(int id);
}
