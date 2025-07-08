package com.weatherapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.weatherapp.service.WeatherService;
// Make sure this import matches the actual package and class name of WeatherData
import com.weatherapp.model.WeatherData;

@Controller
public class WeatherController {
    
    @Autowired
    private WeatherService weatherService;
    
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("locations", weatherService.getAvailableLocations());
        model.addAttribute("times", weatherService.getAvailableTimes());
        return "index";
    }
    
    @PostMapping("/weather")
    public String getWeather(@RequestParam String location, 
                           @RequestParam String time, 
                           Model model) {
        WeatherData weather = weatherService.getWeatherData(location, time);
        
        model.addAttribute("locations", weatherService.getAvailableLocations());
        model.addAttribute("times", weatherService.getAvailableTimes());
        model.addAttribute("weather", weather);
        model.addAttribute("selectedLocation", location);
        model.addAttribute("selectedTime", time);
        
        return "index";
    }
    
    @GetMapping("/api/weather")
    @ResponseBody
    public WeatherData getWeatherAPI(@RequestParam String location, @RequestParam String time) {
        return weatherService.getWeatherData(location, time);
    }
}
