package com.brickbybrick.brickbybrick.services;

import com.brickbybrick.brickbybrick.dto.LoginRequest;
import com.brickbybrick.brickbybrick.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest loginRequest);
}

