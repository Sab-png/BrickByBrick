package com.weatherapp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.weatherapp.weather.model.WeatherData;

@Service
public class WeatherService {

    private final Map<String, List<WeatherData>> weatherDatabase;
    private final Random random = new Random();
    
    public WeatherService() {
        weatherDatabase = new HashMap<>();
        initializeWeatherData();
    }
    
    private void initializeWeatherData() {
        String[] locations = {"Milano", "Roma", "Torino", "Napoli", "Firenze", "Bologna", "Venezia", "Bari"};
        String[] times = {"06:00", "09:00", "12:00", "15:00", "18:00", "21:00"};
        String[] conditions = {"Soleggiato", "Nuvoloso", "Piovoso", "Nevoso", "Temporale", "Nebbia"};
        String[] descriptions = {
            "Cielo sereno e soleggiato",
            "Parzialmente nuvoloso",
            "Pioggia leggera",
            "Neve abbondante",
            "Temporali sparsi",
            "Nebbia fitta"
        };
        
        for (String location : locations) {
            List<WeatherData> locationWeather = new ArrayList<>();
            for (String time : times) {
                int conditionIndex = random.nextInt(conditions.length);
                WeatherData weather = new WeatherData(
                    location,
                    time,
                    conditions[conditionIndex],
                    random.nextInt(35) + 5, // temperature 5-40°C
                    random.nextInt(80) + 20, // humidity 20-100%
                    random.nextInt(20) + 5 + " km/h", // wind speed 5-25 km/h
                    descriptions[conditionIndex]
                );
                locationWeather.add(weather);
            }
            weatherDatabase.put(location, locationWeather);
        }
    }
    
    public WeatherData getWeatherData(String location, String time) {
        List<WeatherData> locationWeather = weatherDatabase.get(location);
        if (locationWeather != null) {
            return locationWeather.stream()
                .filter(w -> w.getTime().equals(time))
                .findFirst()
                .orElse(null);
        }
        return null;
    }
    
    public Set<String> getAvailableLocations() {
        return weatherDatabase.keySet();
    }
    
    public List<String> getAvailableTimes() {
        return Arrays.asList("06:00", "09:00", "12:00", "15:00", "18:00", "21:00");
    }

}
