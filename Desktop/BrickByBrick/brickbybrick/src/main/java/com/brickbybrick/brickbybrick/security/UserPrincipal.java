package com.brickbybrick.brickbybrick.security;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.brickbybrick.brickbybrick.model.enums.AccountType;

public class UserPrincipal implements UserDetails {

    private final Integer id;
    private final String email;
    private final String password;
    private final AccountType accountType;
    private final List<GrantedAuthority> authorities;

    private UserPrincipal(Integer id, String email, String password, AccountType accountType) {
        this.id = Objects.requireNonNull(id, "id");
        this.email = Objects.requireNonNull(email, "email").toLowerCase();
        this.password = password;
        this.accountType = Objects.requireNonNull(accountType, "accountType");
        this.authorities = List.of(new SimpleGrantedAuthority(accountType.getRoleName()));
    }

    public static UserPrincipal fromAccount(AccountUserDetails account) {
        return new UserPrincipal(account.getId(), account.getEmail(), account.getPasswordHash(), account.getAccountType());
    }

    public static UserPrincipal fromJwt(Integer id, String email, AccountType accountType) {
        return new UserPrincipal(id, email, null, accountType);
    }

    public Integer getId() {
        return id;
    }

    public AccountType getAccountType() {
        return accountType;
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
        return email;
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
}

