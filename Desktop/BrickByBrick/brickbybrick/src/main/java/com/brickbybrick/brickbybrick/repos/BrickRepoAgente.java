package com.brickbybrick.brickbybrick.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brickbybrick.brickbybrick.model.Agente;

public interface BrickRepoAgente extends JpaRepository<Agente, Integer> {
    Optional<Agente> findByEmailIgnoreCase(String email);

}
