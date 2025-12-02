package com.brickbybrick.brickbybrick.api.dto;

import java.time.Instant;

public record LoginResponse(
        String accessToken,
        Instant accessTokenExpiry,
        String refreshToken,
        Instant refreshTokenExpiry,
        String role,
        Integer accountId,
        String email) {
}

