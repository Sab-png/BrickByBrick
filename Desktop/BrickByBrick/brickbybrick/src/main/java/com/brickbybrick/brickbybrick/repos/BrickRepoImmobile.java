package com.brickbybrick.brickbybrick.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.brickbybrick.brickbybrick.model.Immobile;

public interface BrickRepoImmobile extends JpaRepository<Immobile, Integer>, JpaSpecificationExecutor<Immobile> {

}
