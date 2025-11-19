// package com.brickbybrick.brickbybrick.api;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import com.brickbybrick.brickbybrick.model.Visita;
// import com.brickbybrick.brickbybrick.services.BrickServiceVisita;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;


// @RestController
// @RequestMapping("/api/visite")
// @CrossOrigin(origins = "http://localhost:5173") 
// public class BrickVisitaREST {
//     @Autowired
//     public BrickServiceVisita serviceVisita;

//      @GetMapping
//     public ResponseEntity<List<Visita>> getAllUtenti() {
//         List<Visita> visite = serviceVisita.getVisite();
//         return ResponseEntity.ok(visite);
//     }

//         @GetMapping("/{id}")
//     public ResponseEntity<Visita> getVisitaById(@PathVariable Integer id) {
//         return serviceVisita.getVisitaById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }
//       @PostMapping
//     public ResponseEntity<Visita> createVisita(@RequestBody Visita visita) {
//         Visita nuovaVisita = serviceVisita.saveVisita(visita);
//         return ResponseEntity.status(HttpStatus.CREATED).body(nuovaVisita);
//     }
//     @PutMapping("/{id}")
//     public ResponseEntity<Visita> updateVisita(@PathVariable Integer id, @RequestBody Visita visita) {
//         if (!serviceVisita.existsById(id)) {
//             return ResponseEntity.notFound().build();
//         }
//         visita.setIdVisita(id);
//         Visita visitaAggiornata = serviceVisita.saveVisita(visita);
//         return ResponseEntity.ok(visitaAggiornata);
//     }
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteVisita(@PathVariable Integer id) {
//         if (!serviceVisita.existsById(id)) {
//             return ResponseEntity.notFound().build();
//         }
//         serviceVisita.deleteVisita(id);
//         return ResponseEntity.noContent().build();
//     }

    



// }
