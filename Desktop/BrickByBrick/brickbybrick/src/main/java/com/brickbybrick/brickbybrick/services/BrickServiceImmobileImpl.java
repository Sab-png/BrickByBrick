package com.brickbybrick.brickbybrick.services;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;

@Service
public class BrickServiceImmobileImpl implements BrickServiceImmobile {

    @Autowired
    private BrickRepoImmobile repoImmobile;
    @Autowired
    private BrickServiceVisita serviceVisita;

    @Override
    public List<Immobile> getImmobili() {
        return repoImmobile.findAll();
    }

    @Override
    public Immobile addImmobile(Immobile i) {
        return repoImmobile.save(i);
    }

    @Override
    public Optional<Immobile> getImmobileById(int id) {
        return repoImmobile.findById(id);
    }
    
    @Override
    public void deleteImmobile(int id) {
        serviceVisita.deleteVisiteByImmobileId(id);
        repoImmobile.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return repoImmobile.existsById(id);
    }



}
