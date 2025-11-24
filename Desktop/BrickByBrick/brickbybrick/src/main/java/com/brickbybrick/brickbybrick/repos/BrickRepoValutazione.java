package com.brickbybrick.brickbybrick.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.brickbybrick.brickbybrick.model.Valutazione;

public interface BrickRepoValutazione extends JpaRepository<Valutazione, Integer> {

    List<Valutazione> findByIdUtente(@Param("idUtente") Integer idUtente);
}


