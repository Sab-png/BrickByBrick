package com.brickbybrick.brickbybrick.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountUserDetailsService implements UserDetailsService {

    private final AccountLookupService accountLookupService;

    public AccountUserDetailsService(AccountLookupService accountLookupService) {
        this.accountLookupService = accountLookupService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            AccountUserDetails account = accountLookupService.loadByEmail(email);
            return UserPrincipal.fromAccount(account);
        } catch (IllegalArgumentException ex) {
            throw new UsernameNotFoundException("Account non trovato", ex);
        }
    }
}

