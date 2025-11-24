package com.brickbybrick.brickbybrick.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.dto.AdminDashboardDTO;
import com.brickbybrick.brickbybrick.dto.AggiornaValutazioneRequest;
import com.brickbybrick.brickbybrick.dto.AgenteDashboardDTO;
import com.brickbybrick.brickbybrick.dto.ClienteDashboardDTO;
import com.brickbybrick.brickbybrick.dto.NotificaDTO;
import com.brickbybrick.brickbybrick.dto.NotificaRequestDTO;
import com.brickbybrick.brickbybrick.dto.ValutazioneDTO;
import com.brickbybrick.brickbybrick.model.Valutazione;
import com.brickbybrick.brickbybrick.security.BrickUserDetails;
import com.brickbybrick.brickbybrick.services.BrickServiceValutazione;
import com.brickbybrick.brickbybrick.services.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private BrickServiceValutazione valutazioneService;

    @GetMapping("/admin/overview")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminDashboardDTO> getAdminDashboard() {
        return ResponseEntity.ok(dashboardService.getAdminDashboard());
    }

    @PostMapping("/admin/notifiche")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificaDTO> inviaNotifica(@Validated @RequestBody NotificaRequestDTO request) {
        return ResponseEntity.ok(dashboardService.inviaNotificaAgente(request.getIdAgente(), request.getMessaggio()));
    }

    @GetMapping("/agente/overview")
    @PreAuthorize("hasAnyRole('AGENTE','ADMIN')")
    public ResponseEntity<AgenteDashboardDTO> getAgenteDashboard(Authentication authentication) {
        Integer accountId = getAccountId(authentication);
        return ResponseEntity.ok(dashboardService.getAgenteDashboard(accountId));
    }

    @PutMapping("/agente/valutazioni/{idValutazione}")
    @PreAuthorize("hasAnyRole('AGENTE','ADMIN')")
    public ResponseEntity<ValutazioneDTO> aggiornaValutazione(
            @PathVariable Integer idValutazione,
            @Validated @RequestBody AggiornaValutazioneRequest request,
            Authentication authentication) {

        Integer resolvedAgenteId = request.getIdAgente() != null
                ? request.getIdAgente()
                : getAccountId(authentication);

        Valutazione valutazioneAggiornata = valutazioneService.aggiornaStatoValutazione(
                idValutazione,
                request.getStato(),
                resolvedAgenteId,
                request.getNote());

        return ResponseEntity.ok(mapValutazione(valutazioneAggiornata));
    }

    @GetMapping("/cliente/overview")
    @PreAuthorize("hasAnyRole('CLIENTE','AGENTE','ADMIN')")
    public ResponseEntity<ClienteDashboardDTO> getClienteDashboard(Authentication authentication) {
        Integer accountId = getAccountId(authentication);
        return ResponseEntity.ok(dashboardService.getClienteDashboard(accountId));
    }

    @PutMapping("/notifiche/{idNotifica}/letto")
    @PreAuthorize("hasAnyRole('AGENTE','ADMIN')")
    public ResponseEntity<NotificaDTO> marcaNotificaLetta(@PathVariable Integer idNotifica) {
        return ResponseEntity.ok(dashboardService.marcaNotificaComeLetta(idNotifica));
    }

    private Integer getAccountId(Authentication authentication) {
        Authentication auth = authentication != null ? authentication : SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof BrickUserDetails details)) {
            throw new IllegalStateException("Utente non autenticato");
        }
        return details.getAccountId();
    }

    private ValutazioneDTO mapValutazione(Valutazione valutazione) {
        ValutazioneDTO dto = new ValutazioneDTO();
        dto.setId(valutazione.getId_valutazione());
        dto.setIdUtente(valutazione.getId_utente());
        dto.setIdAgente(valutazione.getId_agente());
        dto.setCitta(valutazione.getCitta());
        dto.setIndirizzo(valutazione.getIndirizzo());
        dto.setTipologia(valutazione.getTipologia());
        dto.setStato(valutazione.getStato());
        return dto;
    }
}

