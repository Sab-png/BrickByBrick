package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.repos.BrickRepoRuolo;

public class BrickServiceRuoloImpl implements BrickServiceRuolo 
{
    @Autowired
    private BrickRepoRuolo repoRuolo;

}
