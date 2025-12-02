package com.brickbybrick.brickbybrick.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * PasswordEncoder temporaneo per i test che supporta sia password in chiaro che BCrypt.
 * RIMUOVERE IN PRODUZIONE - Usare solo BCryptPasswordEncoder.
 */
public class PlainTextOrBCryptPasswordEncoder implements PasswordEncoder {

    private final BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(12);

    @Override
    public String encode(CharSequence rawPassword) {
        // Sempre codifica con BCrypt
        return bcryptEncoder.encode(rawPassword);
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (encodedPassword == null) {
            System.out.println("[DEBUG] PasswordEncoder: encodedPassword è null");
            return false;
        }
        
        // Se la password codificata inizia con $2a$, $2b$ o $2y$, è BCrypt
        if (encodedPassword.startsWith("$2a$") || 
            encodedPassword.startsWith("$2b$") || 
            encodedPassword.startsWith("$2y$")) {
            boolean matches = bcryptEncoder.matches(rawPassword, encodedPassword);
            System.out.println("[DEBUG] PasswordEncoder: BCrypt match = " + matches);
            return matches;
        }
        
        // Altrimenti, confronta in chiaro (solo per i test)
        boolean matches = rawPassword.toString().equals(encodedPassword);
        System.out.println("[DEBUG] PasswordEncoder: Plain text match = " + matches + 
                         " (raw: '" + rawPassword + "', encoded: '" + encodedPassword + "')");
        return matches;
    }
}

