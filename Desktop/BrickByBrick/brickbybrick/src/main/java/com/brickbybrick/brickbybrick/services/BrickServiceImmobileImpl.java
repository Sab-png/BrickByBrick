package com.brickbybrick.brickbybrick.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Immobile;
import com.brickbybrick.brickbybrick.repos.BrickRepoImmobile;

@Service
public class BrickServiceImmobileImpl implements BrickServiceImmobile {

    @Autowired
    private BrickRepoImmobile repoImmobile;

    @Override
    public List<Immobile> getImmobili() {
        return repoImmobile.findAll();
    }

    @Override
    public Immobile addImmobile(Immobile i) {
        return repoImmobile.save(i);
    }

    // @Override
    // public Immobile save(Immobile i) {
    //     return repoImmobile.save(i);
    // }

    @Override
    public Immobile getImmobileById(int id) {
        return repoImmobile.findById(id).orElse(null);
    }
    
    @Override
    public void deleteImmobile(int id) {
        repoImmobile.deleteById(id);
    }


    @Override
    public Specification<Immobile> regioneContains(String regione) {
        return (root, query, cb) ->
                (regione == null || regione.isEmpty())
                        ? cb.conjunction()
                        : cb.like(cb.lower(root.get("regione")), "%" + regione.toLowerCase() + "%");
    }

    @Override
    public Specification<Immobile> capEquals(String cap) {
        return (root, query, cb) ->
                (cap == null || cap.isEmpty())
                        ? cb.conjunction()
                        : cb.equal(root.get("cap"), cap);
    }

    @Override
    public Specification<Immobile> cittaEquals(String citta) {
        return (root, query, cb) ->
                (citta == null || citta.isEmpty())
                        ? cb.conjunction()
                        : cb.equal(root.get("citta"), citta);
    }

    @Override
    public Specification<Immobile> indirizzoContains(String indirizzo) {
        return (root, query, cb) ->
                (indirizzo == null || indirizzo.isEmpty())
                        ? cb.conjunction()
                        : cb.like(cb.lower(root.get("indirizzo")), "%" + indirizzo.toLowerCase() + "%");
    }

    @Override
    public Specification<Immobile> prezzoLessOrEqual(Double prezzo) {
        return (root, query, cb) ->
                (prezzo == null)
                        ? cb.conjunction()
                        : cb.lessThanOrEqualTo(root.get("prezzo"), prezzo);
    }

    @Override
    public Specification<Immobile> localiGreaterOrEqual(Integer locali) {
        return (root, query, cb) ->
                (locali == null)
                        ? cb.conjunction()
                        : cb.greaterThanOrEqualTo(root.get("locali"), locali);
    }

    @Override
    public Specification<Immobile> superficieGreaterOrEqual(Double superficie) {
        return (root, query, cb) ->
                (superficie == null)
                        ? cb.conjunction()
                        : cb.greaterThanOrEqualTo(root.get("superficie"), superficie);
    }

    @Override
public List<Immobile> filtraImmobili(String regione, String cap, String citta,
                                     String indirizzo, Double prezzo,
                                     Integer locali, Double superficie) {

    Specification<Immobile> spec = Specification
            .where(regioneContains(regione))
            .and(capEquals(cap))
            .and(cittaEquals(citta))
            .and(indirizzoContains(indirizzo))
            .and(prezzoLessOrEqual(prezzo))
            .and(localiGreaterOrEqual(locali))
            .and(superficieGreaterOrEqual(superficie));

    return repoImmobile.findAll(spec);
}



}
