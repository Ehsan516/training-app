package net.deepblacksea.train_api.api.dto;

import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public record AuthUserRes(
            UUID id,
            String email
    ) {}

    public record AuthRes(
            String accessToken,
            AuthUserRes user
    ) {}

    public record LoginReq(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}

    public record SignupReq(
            @Email @NotBlank String email,
            @Size(min = 6, message = "Password must be at least 6 characters")
            String password
    ) {}
}