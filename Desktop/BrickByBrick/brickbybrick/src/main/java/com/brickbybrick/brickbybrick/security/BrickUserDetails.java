package com.brickbybrick.brickbybrick.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.brickbybrick.brickbybrick.model.AccountType;

public class BrickUserDetails implements UserDetails {

    private final String username;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;
    private final AccountType accountType;
    private final Integer accountId;
    private final String nome;
    private final String cognome;

    public BrickUserDetails(
            String username,
            String password,
            Collection<? extends GrantedAuthority> authorities,
            AccountType accountType,
            Integer accountId,
            String nome,
            String cognome) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.accountType = accountType;
        this.accountId = accountId;
        this.nome = nome;
        this.cognome = cognome;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public String getNome() {
        return nome;
    }

    public String getCognome() {
        return cognome;
    }
}

