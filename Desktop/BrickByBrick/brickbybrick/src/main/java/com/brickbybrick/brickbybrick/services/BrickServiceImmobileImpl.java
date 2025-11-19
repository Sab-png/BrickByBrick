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
    public Optional<Immobile> getImmobileById(int id) {
        return repoImmobile.findById(id);
    }
    
    @Override
    public void deleteImmobile(int id) {
        repoImmobile.deleteById(id);
    }


    // @Override
    // public Specification<Immobile> regioneContains(String regione) {
    //     return (root, query, cb) ->
    //             (regione == null || regione.isEmpty())
    //                     ? cb.conjunction()
    //                     : cb.like(cb.lower(root.get("regione")), "%" + regione.toLowerCase() + "%");
    // }

    // @Override
    // public Specification<Immobile> capEquals(String cap) {
    //     return (root, query, cb) ->
    //             (cap == null || cap.isEmpty())
    //                     ? cb.conjunction()
    //                     : cb.equal(root.get("cap"), cap);
    // }

    // @Override
    // public Specification<Immobile> cittaEquals(String citta) {
    //     return (root, query, cb) ->
    //             (citta == null || citta.isEmpty())
    //                     ? cb.conjunction()
    //                     : cb.equal(root.get("citta"), citta);
    // }

    // @Override
    // public Specification<Immobile> indirizzoContains(String indirizzo) {
    //     return (root, query, cb) ->
    //             (indirizzo == null || indirizzo.isEmpty())
    //                     ? cb.conjunction()
    //                     : cb.like(cb.lower(root.get("indirizzo")), "%" + indirizzo.toLowerCase() + "%");
    // }

    // @Override
    // public Specification<Immobile> prezzoLessOrEqual(Double prezzo) {
    //     return (root, query, cb) ->
    //             (prezzo == null)
    //                     ? cb.conjunction()
    //                     : cb.lessThanOrEqualTo(root.get("prezzo"), prezzo);
    // }

    // @Override
    // public Specification<Immobile> localiGreaterOrEqual(Integer locali) {
    //     return (root, query, cb) ->
    //             (locali == null)
    //                     ? cb.conjunction()
    //                     : cb.greaterThanOrEqualTo(root.get("locali"), locali);
    // }

    // @Override
    // public Specification<Immobile> superficieGreaterOrEqual(Double superficie) {
    //     return (root, query, cb) ->
    //             (superficie == null)
    //                     ? cb.conjunction()
    //                     : cb.greaterThanOrEqualTo(root.get("superficie"), superficie);
    // }

    // @Override
    // public Specification<Immobile> tipologiaEquals(String tipologia) {
    //     return (root, query, cb) ->
    //             (tipologia == null || tipologia.isEmpty())
    //                     ? cb.conjunction()
    //                     : cb.equal(root.join("caratteristiche").get("tipologia"), tipologia);
    // }

    // @Override
    // public Specification<Immobile> pianoEquals(Integer piano) {
    //     return (root, query, cb) ->
    //             (piano == null)
    //                     ? cb.conjunction()
    //                     : cb.equal(root.join("caratteristiche").get("piano"), piano);
    // }

    // @Override
    // public Specification<Immobile> ascensoreIs(Boolean ascensore) { 
    //     return (root, query, cb) ->
    //             (ascensore == null)
    //                     ? cb.conjunction()
    //                     : cb.equal(root.join("caratteristiche").get("ascensore"), ascensore);
    // }

    // @Override
    // public Specification<Immobile> arredatoIs(Boolean arredato) {   
    //     return (root, query, cb) ->
    //             (arredato == null)
    //                     ? cb.conjunction()
    //                     : cb.equal(root.join("caratteristiche").get("arredato"), arredato);
    // }

    // @Override
    // public Specification<Immobile> disponibilitaContains(String disponibilita) {   
    //     return (root, query, cb) ->
    //             (disponibilita == null)
    //                     ? cb.conjunction()
    //                     : cb.equal(root.join("caratteristiche").get("disponibilita"), disponibilita);
    // }


    // @Override
    // public Specification<Immobile> contrattoEquals(String contratto) {
    //     return (root, query, cb) -> 
    //         (contratto == null || contratto.isEmpty()) 
    //             ? cb.conjunction() 
    //             : cb.equal(root.join("caratteristiche").get("contratto"), contratto);
    // }

    // @Override
    // public Specification<Immobile> pianiEdificioEquals(Integer piani_edificio) {
    //     return (root, query, cb) -> 
    //         (piani_edificio == null) 
    //             ? cb.conjunction() 
    //             : cb.equal(root.join("caratteristiche").get("piani_edificio"), piani_edificio);
    // }

    // @Override
    // public Specification<Immobile> annoCostruzioneEquals(Integer anno_costruzione) {
    //     return (root, query, cb) -> 
    //         (anno_costruzione == null) 
    //             ? cb.conjunction() 
    //             : cb.equal(root.join("caratteristiche").get("anno_costruzione"), anno_costruzione);
    // }

    // @Override
    // public Specification<Immobile> classeEnergeticaEquals(String classe_energetica) {
    //     return (root, query, cb) -> 
    //         (classe_energetica == null || classe_energetica.isEmpty()) 
    //             ? cb.conjunction() 
    //             : cb.equal(root.join("caratteristiche").get("classe_energetica"), classe_energetica);
    // }

    // @Override
    // public Specification<Immobile> accessoDisabiliIs(Boolean accesso_disabili) {
    //     return (root, query, cb) -> 
    //         (accesso_disabili == null) 
    //             ? cb.conjunction() 
    //             : cb.equal(root.join("caratteristiche").get("accesso_disabili"), accesso_disabili);
    // }

    // @Override
    // public Specification<Immobile> camereGreaterOrEqual(Integer camere) {
    //     return (root, query, cb) -> 
    //         (camere == null) 
    //             ? cb.conjunction() 
    //             : cb.greaterThanOrEqualTo(root.join("caratteristiche").get("camere"), camere);
    // }

    // @Override
    // public Specification<Immobile> bagniGreaterOrEqual(Integer bagni) {
    //     return (root, query, cb) -> 
    //         (bagni == null) 
    //             ? cb.conjunction() 
    //             : cb.greaterThanOrEqualTo(root.join("caratteristiche").get("bagni"), bagni);
    // }

//     @Override
//     public Specification<Immobile> balconeGreaterOrEqual(Integer balcone) {
//         return (root, query, cb) -> 
//             (balcone == null) 
//                 ? cb.conjunction() 
//                 : cb.greaterThanOrEqualTo(root.join("caratteristiche").get("balcone"), balcone);
//     }

//     @Override
//     public Specification<Immobile> riscaldamentoContains(String riscaldamento) {
//         return (root, query, cb) -> 
//             (riscaldamento == null || riscaldamento.isEmpty()) 
//                 ? cb.conjunction() 
//                 : cb.like(cb.lower(root.join("caratteristiche").get("riscaldamento")), "%" + riscaldamento.toLowerCase() + "%");
//     }

//     @Override
//     public Specification<Immobile> terrazzoIs(Boolean terrazzo) {
//         return (root, query, cb) -> 
//             (terrazzo == null) 
//                 ? cb.conjunction() 
//                 : cb.equal(root.join("caratteristiche").get("terrazzo"), terrazzo);
//     }

//     @Override
//     public Specification<Immobile> giardinoIs(Boolean giardino) {
//         return (root, query, cb) -> 
//             (giardino == null) 
//                 ? cb.conjunction() 
//                 : cb.equal(root.join("caratteristiche").get("giardino"), giardino);
//     }

//     @Override
//     public Specification<Immobile> boxAutoGreaterOrEqual(Integer box_auto) {
//         return (root, query, cb) -> 
//             (box_auto == null) 
//                 ? cb.conjunction() 
//                 : cb.greaterThanOrEqualTo(root.join("caratteristiche").get("box_auto"), box_auto);
//     }

//     @Override
//     public Specification<Immobile> cantinaIs(Boolean cantina) {
//         return (root, query, cb) -> 
//             (cantina == null) 
//                 ? cb.conjunction() 
//                 : cb.equal(root.join("caratteristiche").get("cantina"), cantina);
//     }



// @Override
// public List<Immobile> filtraImmobili(
//         String regione, String cap, String citta, String indirizzo,
//         Double prezzo, Integer locali, Double superficie,
//         String tipologia, Integer piano, Boolean ascensore, Boolean arredato, String disponibilita,
//         String contratto, Integer piani_edificio, Integer anno_costruzione,
//         String classe_energetica, Boolean accesso_disabili,
//         Integer camere, Integer bagni,
//         Integer balcone, String riscaldamento, Boolean terrazzo, Boolean giardino,
//         Integer box_auto, Boolean cantina) {

//     Specification<Immobile> spec = Specification.where(regioneContains(regione))
//             .and(capEquals(cap))
//             .and(cittaEquals(citta))
//             .and(indirizzoContains(indirizzo))
//             .and(prezzoLessOrEqual(prezzo))
//             .and(localiGreaterOrEqual(locali))
//             .and(superficieGreaterOrEqual(superficie))
//             .and(tipologiaEquals(tipologia))
//             .and(pianoEquals(piano))
//             .and(ascensoreIs(ascensore))
//             .and(arredatoIs(arredato))
//             .and(disponibilitaContains(disponibilita))
//             .and(contrattoEquals(contratto))
//             .and(pianiEdificioEquals(piani_edificio))
//             .and(annoCostruzioneEquals(anno_costruzione))
//             .and(classeEnergeticaEquals(classe_energetica))
//             .and(accessoDisabiliIs(accesso_disabili))
//             .and(camereGreaterOrEqual(camere))
//             .and(bagniGreaterOrEqual(bagni))
//             .and(balconeGreaterOrEqual(balcone))
//             .and(riscaldamentoContains(riscaldamento))
//             .and(terrazzoIs(terrazzo))
//             .and(giardinoIs(giardino))
//             .and(boxAutoGreaterOrEqual(box_auto))
//             .and(cantinaIs(cantina));

//     return repoImmobile.findAll(spec);
// }

@Override
public boolean existsById(Integer id) {
    return repoImmobile.existsById(id);
}



}
