package com.brickbybrick.brickbybrick.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brickbybrick.brickbybrick.api.dto.LoginRequest;
import com.brickbybrick.brickbybrick.api.dto.LoginResponse;
import com.brickbybrick.brickbybrick.api.dto.UserInfoResponse;
import com.brickbybrick.brickbybrick.model.enums.AccountType;
import com.brickbybrick.brickbybrick.security.AuthenticationService;
import com.brickbybrick.brickbybrick.security.UserPrincipal;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthenticationService.AuthResult authResult = authenticationService.login(request.email(), request.password());
        UserPrincipal principal = authResult.principal();
        return ResponseEntity.ok(new LoginResponse(
                authResult.tokens().accessToken(),
                authResult.tokens().accessTokenExpiry(),
                authResult.tokens().refreshToken(),
                authResult.tokens().refreshTokenExpiry(),
                principal.getAccountType().name(),
                principal.getId(),
                principal.getUsername()));
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfoResponse> me(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            return ResponseEntity.status(401).build();
        }
        AccountType accountType = principal.getAccountType();
        return ResponseEntity.ok(new UserInfoResponse(principal.getId(), principal.getUsername(), accountType.name()));
    }
}

