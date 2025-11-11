package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.repos.BrickRepoAdmin;

public class BrickServiceAdminImpl implements BrickServiceAdmin {

    @Autowired

    private BrickRepoAdmin repoAdmin;

}
