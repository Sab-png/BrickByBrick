package com.brickbybrick.brickbybrick.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class per generare hash BCrypt delle password.
 * Usa questa classe per generare gli hash da inserire nel database.
 * 
 * Esempio di utilizzo:
 *   BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
 *   String hash = encoder.encode("admin123");
 *   System.out.println(hash);
 */
public class PasswordHashGenerator {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        
        // Genera hash per le password di test
        System.out.println("=== Hash BCrypt per password di test ===");
        System.out.println("admin123: " + encoder.encode("admin123"));
        System.out.println("admin456: " + encoder.encode("admin456"));
        System.out.println("agente123: " + encoder.encode("agente123"));
        System.out.println("agente456: " + encoder.encode("agente456"));
        System.out.println("agente789: " + encoder.encode("agente789"));
        System.out.println("utente123: " + encoder.encode("utente123"));
        System.out.println("utente456: " + encoder.encode("utente456"));
        System.out.println("utente789: " + encoder.encode("utente789"));
    }
}

