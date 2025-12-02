package com.brickbybrick.brickbybrick.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.enums.AccountType;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final JwtProperties properties;
    private final SecretKey key;

    public JwtService(JwtProperties properties) {
        this.properties = properties;
        this.key = Keys.hmacShaKeyFor(properties.secret().getBytes(StandardCharsets.UTF_8));
    }

    public TokenPair generateTokens(UserPrincipal principal) {
        Instant now = Instant.now();
        Instant accessExp = now.plus(properties.expirationMinutes(), ChronoUnit.MINUTES);
        Instant refreshExp = now.plus(properties.refreshExpirationMinutes(), ChronoUnit.MINUTES);
        String accessToken = buildToken(principal, accessExp, "access");
        String refreshToken = buildToken(principal, refreshExp, "refresh");
        return new TokenPair(accessToken, accessExp, refreshToken, refreshExp);
    }

    private String buildToken(UserPrincipal principal, Instant expiry, String tokenType) {
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .addClaims(Map.of(
                        "id", principal.getId(),
                        "role", principal.getAccountType().name(),
                        "type", tokenType))
                .setExpiration(Date.from(expiry))
                .setIssuedAt(new Date())
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Optional<Authentication> parseAuthentication(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            Claims body = claims.getBody();
            String tokenType = body.get("type", String.class);
            if (!"access".equals(tokenType)) {
                return Optional.empty();
            }
            Integer id = body.get("id", Integer.class);
            String email = body.getSubject();
            AccountType type = AccountType.valueOf(body.get("role", String.class));
            UserPrincipal principal = UserPrincipal.fromJwt(id, email, type);
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(type.getRoleName());
            return Optional.of(new UsernamePasswordAuthenticationToken(principal, token, List.of(authority)));
        } catch (Exception ex) {
            return Optional.empty();
        }
    }

    public record TokenPair(String accessToken, Instant accessTokenExpiry, String refreshToken,
                            Instant refreshTokenExpiry) {
    }
}

