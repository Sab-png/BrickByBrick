package com.brickbybrick.brickbybrick.dto;

import java.util.List;

public class AdminDashboardDTO {

    private DashboardCountsDTO counts;
    private List<ValutazioneDTO> nuoveRichieste;
    private List<ValutazioneDTO> inElaborazione;
    private List<ValutazioneDTO> concluse;

    public DashboardCountsDTO getCounts() {
        return counts;
    }

    public void setCounts(DashboardCountsDTO counts) {
        this.counts = counts;
    }

    public List<ValutazioneDTO> getNuoveRichieste() {
        return nuoveRichieste;
    }

    public void setNuoveRichieste(List<ValutazioneDTO> nuoveRichieste) {
        this.nuoveRichieste = nuoveRichieste;
    }

    public List<ValutazioneDTO> getInElaborazione() {
        return inElaborazione;
    }

    public void setInElaborazione(List<ValutazioneDTO> inElaborazione) {
        this.inElaborazione = inElaborazione;
    }

    public List<ValutazioneDTO> getConcluse() {
        return concluse;
    }

    public void setConcluse(List<ValutazioneDTO> concluse) {
        this.concluse = concluse;
    }
}

