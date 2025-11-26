package com.brickbybrick.brickbybrick.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.brickbybrick.brickbybrick.model.PrezzoMercato;

public interface BrickRepoPrezzoMercato extends JpaRepository<PrezzoMercato, String>{

    Optional<PrezzoMercato> findByCap(String cap);

}




