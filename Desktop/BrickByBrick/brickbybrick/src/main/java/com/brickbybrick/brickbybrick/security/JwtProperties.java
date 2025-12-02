package com.brickbybrick.brickbybrick.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security.jwt")
public record JwtProperties(
        String secret,
        long expirationMinutes,
        long refreshExpirationMinutes,
        String header,
        String prefix) {

    public JwtProperties {
        if (secret == null || secret.length() < 32) {
            throw new IllegalArgumentException("security.jwt.secret deve essere lungo almeno 32 caratteri");
        }
    }
}

