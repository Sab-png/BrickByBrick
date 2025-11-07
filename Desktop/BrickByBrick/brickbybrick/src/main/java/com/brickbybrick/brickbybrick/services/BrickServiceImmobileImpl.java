package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;

public class BrickServiceImmobileImpl implements BrickServiceImmobile {
    @Autowired
    private BrickRepoImmobile repoImmobile;

}
