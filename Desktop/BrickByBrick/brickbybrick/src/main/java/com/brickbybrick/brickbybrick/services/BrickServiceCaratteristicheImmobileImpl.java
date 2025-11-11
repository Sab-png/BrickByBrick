package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.CaratteristicheImmobile;
import com.brickbybrick.brickbybrick.repos.BrickRepoCaratteristicheImmobile;

@Service
public class BrickServiceCaratteristicheImmobileImpl implements BrickServiceCaratteristicheImmobile{
    
    @Autowired
    private BrickRepoCaratteristicheImmobile repoCaratteristicheImmobile;

    @Override
    public List<CaratteristicheImmobile> getCaratteristiche() {
        return repoCaratteristicheImmobile.findAll();
    }
}
