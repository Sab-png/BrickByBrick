package com.brickbybrick.brickbybrick.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brickbybrick.brickbybrick.model.StatoValutazione;
import com.brickbybrick.brickbybrick.model.Valutazione;

public interface BrickRepoValutazione extends JpaRepository<Valutazione, Integer> {

    List<Valutazione> findByIdAgente(Integer idAgente);

    List<Valutazione> findByIdUtente(Integer idUtente);

    long countByStato(StatoValutazione stato);

    List<Valutazione> findByStato(StatoValutazione stato);
}
