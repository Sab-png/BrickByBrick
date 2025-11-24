package com.brickbybrick.brickbybrick.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.brickbybrick.brickbybrick.dto.AdminDashboardDTO;
import com.brickbybrick.brickbybrick.dto.AgenteDashboardDTO;
import com.brickbybrick.brickbybrick.dto.ClienteDashboardDTO;
import com.brickbybrick.brickbybrick.dto.DashboardCountsDTO;
import com.brickbybrick.brickbybrick.dto.NotificaDTO;
import com.brickbybrick.brickbybrick.dto.ValutazioneDTO;
import com.brickbybrick.brickbybrick.model.Notifica;
import com.brickbybrick.brickbybrick.model.StatoValutazione;
import com.brickbybrick.brickbybrick.model.Valutazione;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private BrickServiceValutazione valutazioneService;

    @Autowired
    private BrickServiceNotifica notificaService;

    @Override
    public AdminDashboardDTO getAdminDashboard() {
        DashboardCountsDTO counts = buildCounts();

        AdminDashboardDTO dto = new AdminDashboardDTO();
        dto.setCounts(counts);
        dto.setNuoveRichieste(mapValutazioni(valutazioneService.getValutazioniPerStato(StatoValutazione.NUOVA)));
        dto.setInElaborazione(mapValutazioni(valutazioneService.getValutazioniPerStato(StatoValutazione.IN_ELABORAZIONE)));
        dto.setConcluse(mapValutazioni(valutazioneService.getValutazioniPerStato(StatoValutazione.CONCLUSA)));
        return dto;
    }

    @Override
    public AgenteDashboardDTO getAgenteDashboard(Integer agenteId) {
        AgenteDashboardDTO dto = new AgenteDashboardDTO();
        dto.setCounts(buildCounts());
        dto.setValutazioniAssegnate(mapValutazioni(valutazioneService.getValutazioniPerAgente(agenteId)));
        dto.setNotifiche(mapNotifiche(notificaService.getNotificheAgente(agenteId)));
        return dto;
    }

    @Override
    public ClienteDashboardDTO getClienteDashboard(Integer utenteId) {
        ClienteDashboardDTO dto = new ClienteDashboardDTO();
        dto.setRichieste(mapValutazioni(valutazioneService.getValutazioniPerUtente(utenteId)));
        return dto;
    }

    @Override
    public NotificaDTO inviaNotificaAgente(Integer idAgente, String messaggio) {
        if (!StringUtils.hasText(messaggio)) {
            throw new IllegalArgumentException("Il messaggio non può essere vuoto");
        }
        Notifica notifica = new Notifica();
        notifica.setId_agente(idAgente);
        notifica.setMessaggio(messaggio);

        return mapNotifica(notificaService.creaNotifica(notifica));
    }

    @Override
    public NotificaDTO marcaNotificaComeLetta(Integer idNotifica) {
        return mapNotifica(notificaService.marcaComeLetta(idNotifica));
    }

    private DashboardCountsDTO buildCounts() {
        long nuove = valutazioneService.countByStato(StatoValutazione.NUOVA);
        long inElaborazione = valutazioneService.countByStato(StatoValutazione.IN_ELABORAZIONE);
        long concluse = valutazioneService.countByStato(StatoValutazione.CONCLUSA);
        return new DashboardCountsDTO(nuove, inElaborazione, concluse);
    }

    private List<ValutazioneDTO> mapValutazioni(List<Valutazione> valutazioni) {
        return valutazioni.stream().map(this::mapValutazione).collect(Collectors.toList());
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

    private List<NotificaDTO> mapNotifiche(List<Notifica> notifiche) {
        return notifiche.stream().map(this::mapNotifica).collect(Collectors.toList());
    }

    private NotificaDTO mapNotifica(Notifica notifica) {
        NotificaDTO dto = new NotificaDTO();
        dto.setId(notifica.getId_notifica());
        dto.setMessaggio(notifica.getMessaggio());
        dto.setLetto(notifica.getLetto());
        dto.setCreatedAt(notifica.getCreatedAt());
        return dto;
    }
}

