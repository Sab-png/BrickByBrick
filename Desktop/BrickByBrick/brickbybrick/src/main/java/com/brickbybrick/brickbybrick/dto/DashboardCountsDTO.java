package com.brickbybrick.brickbybrick.dto;

public class DashboardCountsDTO {
    private long nuove;
    private long inElaborazione;
    private long concluse;

    public DashboardCountsDTO() {
    }

    public DashboardCountsDTO(long nuove, long inElaborazione, long concluse) {
        this.nuove = nuove;
        this.inElaborazione = inElaborazione;
        this.concluse = concluse;
    }

    public long getNuove() {
        return nuove;
    }

    public void setNuove(long nuove) {
        this.nuove = nuove;
    }

    public long getInElaborazione() {
        return inElaborazione;
    }

    public void setInElaborazione(long inElaborazione) {
        this.inElaborazione = inElaborazione;
    }

    public long getConcluse() {
        return concluse;
    }

    public void setConcluse(long concluse) {
        this.concluse = concluse;
    }
}

