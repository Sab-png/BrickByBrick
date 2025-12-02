package com.brickbybrick.brickbybrick.security;

import com.brickbybrick.brickbybrick.model.enums.AccountType;

public class AccountUserDetails {

    private final Integer id;
    private final String email;
    private final String passwordHash;
    private final AccountType accountType;

    private AccountUserDetails(Builder builder) {
        this.id = builder.id;
        this.email = builder.email;
        this.passwordHash = builder.passwordHash;
        this.accountType = builder.accountType;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private Integer id;
        private String email;
        private String passwordHash;
        private AccountType accountType;

        private Builder() {
        }

        public Builder id(Integer id) {
            this.id = id;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder passwordHash(String passwordHash) {
            this.passwordHash = passwordHash;
            return this;
        }

        public Builder accountType(AccountType accountType) {
            this.accountType = accountType;
            return this;
        }

        public AccountUserDetails build() {
            if (id == null || email == null || passwordHash == null || accountType == null) {
                throw new IllegalStateException("Dati account incompleti");
            }
            return new AccountUserDetails(this);
        }
    }
}

