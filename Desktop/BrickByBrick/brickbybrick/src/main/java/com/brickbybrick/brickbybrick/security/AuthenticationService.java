package com.brickbybrick.brickbybrick.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationService(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResult login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email.toLowerCase(), password));
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        JwtService.TokenPair tokens = jwtService.generateTokens(principal);
        return new AuthResult(principal, tokens);
    }

    public record AuthResult(UserPrincipal principal, JwtService.TokenPair tokens) {
    }
}

