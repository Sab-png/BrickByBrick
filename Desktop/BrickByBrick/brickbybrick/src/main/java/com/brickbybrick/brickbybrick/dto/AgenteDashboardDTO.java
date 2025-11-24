package com.brickbybrick.brickbybrick.dto;

import java.util.List;

public class AgenteDashboardDTO {

    private DashboardCountsDTO counts;
    private List<ValutazioneDTO> valutazioniAssegnate;
    private List<NotificaDTO> notifiche;

    public DashboardCountsDTO getCounts() {
        return counts;
    }

    public void setCounts(DashboardCountsDTO counts) {
        this.counts = counts;
    }

    public List<ValutazioneDTO> getValutazioniAssegnate() {
        return valutazioniAssegnate;
    }

    public void setValutazioniAssegnate(List<ValutazioneDTO> valutazioniAssegnate) {
        this.valutazioniAssegnate = valutazioniAssegnate;
    }

    public List<NotificaDTO> getNotifiche() {
        return notifiche;
    }

    public void setNotifiche(List<NotificaDTO> notifiche) {
        this.notifiche = notifiche;
    }
}

