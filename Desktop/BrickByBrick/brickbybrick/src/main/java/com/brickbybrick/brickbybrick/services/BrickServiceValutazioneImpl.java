package com.brickbybrick.brickbybrick.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.repos.BrickRepoValutazione;

public class BrickServiceValutazioneImpl implements BrickServiceValutazione {

    @Autowired
    private BrickRepoValutazione repoValutazione;

    @Override
    public List<Valutazione> getValutazioni() {
        return repoValutazione.findAll();
    }
}
