package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.domain.Specification;

import com.brickbybrick.brickbybrick.model.Immobile;

public interface BrickServiceImmobile {

    List<Immobile> getImmobili();

    Immobile addImmobile(Immobile i);

    Optional<Immobile>  getImmobileById(int id);

    void deleteImmobile(int id);

    boolean existsById(Integer id);

    Specification<Immobile> regioneContains(String regione);
    Specification<Immobile> capEquals(String cap);
    Specification<Immobile> cittaEquals(String citta);
    Specification<Immobile> indirizzoContains(String indirizzo);
    Specification<Immobile> prezzoLessOrEqual(Double prezzo);
    Specification<Immobile> localiGreaterOrEqual(Integer locali);
    Specification<Immobile> superficieGreaterOrEqual(Double superficie);

    Specification<Immobile> tipologiaEquals(String tipologia);
    Specification<Immobile> pianoEquals(Integer piano);
    Specification<Immobile> ascensoreIs(Boolean ascensore);
    Specification<Immobile> arredatoIs(Boolean arredato);
    Specification<Immobile> disponibilitaContains(String disponibilita);
    Specification<Immobile> contrattoEquals(String contratto);
    Specification<Immobile> pianiEdificioEquals(Integer piani_edificio);
    Specification<Immobile> annoCostruzioneEquals(Integer anno_costruzione);
    Specification<Immobile> classeEnergeticaEquals(String classe_energetica);
    Specification<Immobile> accessoDisabiliIs(Boolean accesso_disabili);
    Specification<Immobile> camereGreaterOrEqual(Integer camere);
    Specification<Immobile> bagniGreaterOrEqual(Integer bagni);
    Specification<Immobile> balconeGreaterOrEqual(Integer balcone);
    Specification<Immobile> riscaldamentoContains(String riscaldamento);
    Specification<Immobile> terrazzoIs(Boolean terrazzo);
    Specification<Immobile> giardinoIs(Boolean giardino);
    Specification<Immobile> boxAutoGreaterOrEqual(Integer box_auto);
    Specification<Immobile> cantinaIs(Boolean cantina);


    List<Immobile> filtraImmobili(String regione, String cap, String citta, String indirizzo, Double prezzo, Integer locali, Double superficie, String tipologia, Integer piano, Boolean ascensore, Boolean arredato, String disponibilita,
        String contratto, Integer piani_edificio, Integer anno_costruzione,
        String classe_energetica, Boolean accesso_disabili,
        Integer camere, Integer bagni,
        Integer balcone, String riscaldamento, Boolean terrazzo, Boolean giardino,
        Integer box_auto, Boolean cantina);
    

    }

