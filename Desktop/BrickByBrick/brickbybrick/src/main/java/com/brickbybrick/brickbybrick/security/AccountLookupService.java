package com.brickbybrick.brickbybrick.security;

import org.springframework.stereotype.Service;

import com.brickbybrick.brickbybrick.model.Admin;
import com.brickbybrick.brickbybrick.model.Agente;
import com.brickbybrick.brickbybrick.model.Utente;
import com.brickbybrick.brickbybrick.model.enums.AccountType;
import com.brickbybrick.brickbybrick.repos.BrickRepoAdmin;
import com.brickbybrick.brickbybrick.repos.BrickRepoAgente;
import com.brickbybrick.brickbybrick.repos.BrickRepoUtente;

@Service
public class AccountLookupService {

    private final BrickRepoAdmin adminRepo;
    private final BrickRepoAgente agenteRepo;
    private final BrickRepoUtente utenteRepo;

    public AccountLookupService(
            BrickRepoAdmin adminRepo,
            BrickRepoAgente agenteRepo,
            BrickRepoUtente utenteRepo) {
        this.adminRepo = adminRepo;
        this.agenteRepo = agenteRepo;
        this.utenteRepo = utenteRepo;
    }

    public AccountUserDetails loadByEmail(String email) {
        System.out.println("[DEBUG] AccountLookupService: Cercando email = " + email);
        AccountType accountType = AccountType.fromEmail(email);
        System.out.println("[DEBUG] AccountLookupService: AccountType = " + accountType);
        AccountUserDetails result = switch (accountType) {
            case ADMIN -> adminRepo.findByEmailIgnoreCase(email)
                    .map(admin -> {
                        System.out.println("[DEBUG] AccountLookupService: Admin trovato: " + admin.getEmail() + ", password: " + admin.getPassw());
                        return mapAdmin(admin);
                    })
                    .orElseThrow(() -> new IllegalArgumentException("Admin non trovato"));
            case AGENTE -> agenteRepo.findByEmailIgnoreCase(email)
                    .map(agente -> {
                        System.out.println("[DEBUG] AccountLookupService: Agente trovato: " + agente.getEmail() + ", password: " + agente.getPassw());
                        return mapAgente(agente);
                    })
                    .orElseThrow(() -> new IllegalArgumentException("Agente non trovato"));
            case CLIENTE -> utenteRepo.findByEmailIgnoreCase(email)
                    .map(utente -> {
                        System.out.println("[DEBUG] AccountLookupService: Utente trovato: " + utente.getEmail() + ", password: " + utente.getPassw());
                        return mapUtente(utente);
                    })
                    .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));
        };
        System.out.println("[DEBUG] AccountLookupService: Password hash restituito = " + result.getPasswordHash());
        return result;
    }

    private AccountUserDetails mapAdmin(Admin admin) {
        return AccountUserDetails.builder()
                .id(admin.getId_admin())
                .email(admin.getEmail())
                .passwordHash(admin.getPassw())
                .accountType(AccountType.ADMIN)
                .build();
    }

    private AccountUserDetails mapAgente(Agente agente) {
        return AccountUserDetails.builder()
                .id(agente.getId_agente())
                .email(agente.getEmail())
                .passwordHash(agente.getPassw())
                .accountType(AccountType.AGENTE)
                .build();
    }

    private AccountUserDetails mapUtente(Utente utente) {
        return AccountUserDetails.builder()
                .id(utente.getId_utente())
                .email(utente.getEmail())
                .passwordHash(utente.getPassw())
                .accountType(AccountType.fromRoleId(utente.getId_ruolo()))
                .build();
    }
}

