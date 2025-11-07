package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.brickbybrick.brickbybrick.repos.BrickRepoCaratteristicheImmobile;

public class BrickServiceCaratteristicheImmobileImpl implements BrickServiceCaratteristicheImmobile{
    @Autowired
    private BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile;
}
