package com.brickbybrick.brickbybrick.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.brickbybrick.brickbybrick.model.Admin;

public interface BrickRepoAdmin extends JpaRepository<Admin, Integer> {

}
