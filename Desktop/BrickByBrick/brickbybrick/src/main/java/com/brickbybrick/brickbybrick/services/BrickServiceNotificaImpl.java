package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brickbybrick.brickbybrick.model.Notifica;
import com.brickbybrick.brickbybrick.repos.BrickRepoNotifica;

@Service
public class BrickServiceNotificaImpl implements BrickServiceNotifica {

    @Autowired
    private BrickRepoNotifica repoNotifica;

    @Override
    public Notifica creaNotifica(Notifica notifica) {
        return repoNotifica.save(notifica);
    }

    @Override
    public List<Notifica> getNotificheAgente(Integer idAgente) {
        return repoNotifica.findByIdAgenteOrderByCreatedAtDesc(idAgente);
    }

    @Override
    public List<Notifica> getNotificheNonLette(Integer idAgente) {
        return repoNotifica.findByIdAgenteAndLettoFalseOrderByCreatedAtDesc(idAgente);
    }

    @Override
    @Transactional
    public Notifica marcaComeLetta(Integer idNotifica) {
        return repoNotifica.findById(idNotifica)
                .map(notifica -> {
                    notifica.setLetto(Boolean.TRUE);
                    return repoNotifica.save(notifica);
                })
                .orElseThrow(() -> new IllegalArgumentException("Notifica non trovata"));
    }
}

