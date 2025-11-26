package com.brickbybrick.brickbybrick.services;


import java.net.http.*;
import java.net.URI;
import com.google.gson.*;

class PrezzoMq {
    private static final String API_URL = "https://api.immobiliare.it/prezzi"; 
    private final HttpClient client;
    private final Gson gson;

    public PrezzoMq() {
        this.client = HttpClient.newHttpClient();
        this.gson = new Gson();
    }

    public double getPrezzoMedioMq(String cap) throws Exception {
        // Implementazione con API reale
        String url = API_URL + "?cap=" + cap;
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Accept", "application/json")
            // .header("Authorization", "Bearer YOUR_API_KEY") // se necessaria
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            JsonObject jsonResponse = gson.fromJson(response.body(), JsonObject.class);
            return jsonResponse.get("prezzoMedioMq").getAsDouble();
        }
        
        // Fallback: usa valori medi stimati per zona
        return getPrezzoMedioStimato(cap);
    }

    /**
     * Fallback con valori medi stimati per grandi città italiane
     */
    private double getPrezzoMedioStimato(String cap) {
        // Valori medi approssimativi €/mq (2024)
        if (cap.startsWith("20")) return 4500.0; // Milano
        if (cap.startsWith("00")) return 3800.0; // Roma
        if (cap.startsWith("101")) return 2800.0; // Torino
        if (cap.startsWith("40")) return 3200.0; // Bologna
        if (cap.startsWith("50")) return 3500.0; // Firenze
        if (cap.startsWith("80")) return 3000.0; // Napoli
        if (cap.startsWith("16")) return 2900.0; // Genova
        return 2000.0; // Valore medio nazionale
    }
}
