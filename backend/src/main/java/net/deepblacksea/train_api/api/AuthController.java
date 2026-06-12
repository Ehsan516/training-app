package net.deepblacksea.train_api.api;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import net.deepblacksea.train_api.api.dto.AuthDtos.*;
import net.deepblacksea.train_api.api.dto.AuthDtos.AuthRes;
import net.deepblacksea.train_api.api.dto.AuthDtos.AuthUserRes;
import net.deepblacksea.train_api.api.dto.AuthDtos.LoginReq;
import net.deepblacksea.train_api.api.dto.AuthDtos.SignupReq;
import net.deepblacksea.train_api.model.User;
import net.deepblacksea.train_api.repo.UserRepository;
import net.deepblacksea.train_api.security.JwtService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository users,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public AuthRes signup(@Valid @RequestBody SignupReq req) {
        String email = req.email().trim().toLowerCase();

        if (users.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(req.password()));

        users.save(user);

        return toAuthRes(user);
    }

    @PostMapping("/login")
    public AuthRes login(@Valid @RequestBody LoginReq req) {
        String email = req.email().trim().toLowerCase();

        User user = users.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return toAuthRes(user);
    }

    @GetMapping("/me")
    public AuthUserRes me(Principal principal) {
        User user = users.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        return new AuthUserRes(user.getId(), user.getEmail());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout() {
        // Stateless JWT logout is handled client-side by deleting the token.
    }

    private AuthRes toAuthRes(User user) {
        String token = jwtService.generateToken(user);
        return new AuthRes(token, new AuthUserRes(user.getId(), user.getEmail()));
    }
}