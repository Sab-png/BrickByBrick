package com.brickbybrick.brickbybrick.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brickbybrick.brickbybrick.model.Agente;

public interface BrickRepoAgente extends JpaRepository<Agente, Integer> {

    Optional<Agente> findByEmail(String email);

    List<Agente> findByIdRuolo(Integer idRuolo);
}
