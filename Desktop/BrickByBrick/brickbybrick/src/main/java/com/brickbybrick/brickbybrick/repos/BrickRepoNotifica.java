package com.brickbybrick.brickbybrick.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brickbybrick.brickbybrick.model.Notifica;

public interface BrickRepoNotifica extends JpaRepository<Notifica, Integer> {

    List<Notifica> findByIdAgenteOrderByCreatedAtDesc(Integer idAgente);

    List<Notifica> findByIdAgenteAndLettoFalseOrderByCreatedAtDesc(Integer idAgente);
}

