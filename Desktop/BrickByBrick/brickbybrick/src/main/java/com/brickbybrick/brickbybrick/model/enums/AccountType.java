package com.brickbybrick.brickbybrick.model.enums;

import java.util.Arrays;

public enum AccountType {
    ADMIN(1, "@admin.net"),
    AGENTE(2, "@agente.net"),
    CLIENTE(3, "@user.net");

    private final int roleId;
    private final String domain;

    AccountType(int roleId, String domain) {
        this.roleId = roleId;
        this.domain = domain;
    }

    public int getRoleId() {
        return roleId;
    }

    public String getDomain() {
        return domain;
    }

    public String getRoleName() {
        return "ROLE_" + name();
    }

    public static AccountType fromRoleId(Integer roleId) {
         if (roleId == null) {
            throw new IllegalArgumentException("Id_ruolo mancante");
        }
        return Arrays.stream(values())
                .filter(type -> type.roleId == roleId)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Id_ruolo non supportato: " + roleId));
    }

    public static AccountType fromEmail(String email) {
        if (email == null) {
            throw new IllegalArgumentException("Email mancante");
        }
        String lower = email.toLowerCase();
        return Arrays.stream(values())
                .filter(type -> lower.endsWith(type.domain))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Dominio email non valido: " + email));
    }
}


