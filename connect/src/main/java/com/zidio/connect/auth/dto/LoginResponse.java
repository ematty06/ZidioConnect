package com.zidio.connect.auth.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class LoginResponse {
    private String message;
    private Long userId;

    public LoginResponse(String message, Long userId) {
        this.message = message;
        this.userId = userId;
    }
}
