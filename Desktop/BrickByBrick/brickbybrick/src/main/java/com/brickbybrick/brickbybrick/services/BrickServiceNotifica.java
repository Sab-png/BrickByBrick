package com.brickbybrick.brickbybrick.services;

import java.util.List;

import com.brickbybrick.brickbybrick.model.Notifica;

public interface BrickServiceNotifica {

    Notifica creaNotifica(Notifica notifica);

    List<Notifica> getNotificheAgente(Integer idAgente);

    List<Notifica> getNotificheNonLette(Integer idAgente);

    Notifica marcaComeLetta(Integer idNotifica);
}

