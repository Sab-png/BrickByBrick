package com.brickbybrick.brickbybrick.dto;

import java.util.List;

public class ClienteDashboardDTO {

    private List<ValutazioneDTO> richieste;

    public List<ValutazioneDTO> getRichieste() {
        return richieste;
    }

    public void setRichieste(List<ValutazioneDTO> richieste) {
        this.richieste = richieste;
    }
}

