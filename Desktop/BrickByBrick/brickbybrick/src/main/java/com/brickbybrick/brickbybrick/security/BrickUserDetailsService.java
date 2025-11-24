package com.brickbybrick.brickbybrick.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.brickbybrick.brickbybrick.model.AccountType;
import com.brickbybrick.brickbybrick.model.Admin;
import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.model.Utente;
import com.brickbybrick.brickbybrick.repos.BrickRepoAdmin;
import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;
import com.brickbybrick.brickbybrick.repos.BrickRepoUtente;

@Service
public class BrickUserDetailsService implements UserDetailsService {

    private static final String ADMIN_DOMAIN = "@admin.net";
    private static final String AGENTE_DOMAIN = "@agente.net";

    @Autowired
    private BrickRepoAdmin repoAdmin;

    @Autowired
    private BrickRepoAgente repoAgente;

    @Autowired
    private BrickRepoUtente repoUtente;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountType accountType = resolveAccountType(username);

        return switch (accountType) {
            case ADMIN -> repoAdmin.findByEmail(username)
                    .map(admin -> toUserDetails(username, admin.getPassw(), accountType, admin.getId_admin(), admin.getNome(), admin.getCognome()))
                    .orElseThrow(() -> new UsernameNotFoundException("Admin non trovato"));
            case AGENTE -> repoAgente.findByEmail(username)
                    .map(agente -> toUserDetails(username, agente.getPassw(), accountType, agente.getId_agente(), agente.getNome(), agente.getCognome()))
                    .orElseThrow(() -> new UsernameNotFoundException("Agente non trovato"));
            case CLIENTE -> repoUtente.findByEmail(username)
                    .map(user -> toUserDetails(username, user.getPassw(), accountType, user.getId_utente(), user.getNome(), user.getCognome()))
                    .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato"));
        };
    }

    private BrickUserDetails toUserDetails(String username, String passw, AccountType type, Integer accountId, String nome, String cognome) {
        String role = switch (type) {
            case ADMIN -> "ROLE_ADMIN";
            case AGENTE -> "ROLE_AGENTE";
            case CLIENTE -> "ROLE_CLIENTE";
        };

        return new BrickUserDetails(username, passw, List.of(new SimpleGrantedAuthority(role)), type, accountId, nome, cognome);
    }

    public AccountType resolveAccountType(String email) {
        if (!StringUtils.hasText(email)) {
            throw new UsernameNotFoundException("Email non valida");
        }
        String lowerEmail = email.toLowerCase();
        if (lowerEmail.endsWith(ADMIN_DOMAIN)) {
            return AccountType.ADMIN;
        }
        if (lowerEmail.endsWith(AGENTE_DOMAIN)) {
            return AccountType.AGENTE;
        }
        return AccountType.CLIENTE;
    }
}

