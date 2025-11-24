package com.brickbybrick.brickbybrick.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.dto.LoginRequest;
import com.brickbybrick.brickbybrick.dto.LoginResponse;
import com.brickbybrick.brickbybrick.security.BrickUserDetails;
import com.brickbybrick.brickbybrick.security.JwtService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        BrickUserDetails userDetails = (BrickUserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(
                userDetails.getUsername(),
                userDetails.getAccountType(),
                userDetails.getAccountId());

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setAccountType(userDetails.getAccountType());
        response.setAccountId(userDetails.getAccountId());
        response.setNome(userDetails.getNome());
        response.setCognome(userDetails.getCognome());
        return response;
    }
}

