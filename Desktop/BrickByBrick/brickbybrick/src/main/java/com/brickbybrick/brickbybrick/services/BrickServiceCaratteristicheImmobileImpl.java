package com.brickbybrick.brickbybrick.services;
import java.util.List;
import java.util.Optional;
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

    @Override
    public CaratteristicheImmobile addCaratteristica(CaratteristicheImmobile a) {
        return repoCaratteristicheImmobile.save(a);
    }

    @Override
    public Optional<CaratteristicheImmobile> getCaratteristicaById(Integer id) {
        return repoCaratteristicheImmobile.findById(id);
    }
    @Override
    public void deleteCaratteristica(Integer id) {
        repoCaratteristicheImmobile.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return repoCaratteristicheImmobile.existsById(id);
    }
}
