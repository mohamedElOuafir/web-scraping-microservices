package com.example.authservice.service;

import com.example.authservice.dto.LoginResponse;
import com.example.authservice.dto.UserCredential;
import com.example.authservice.entity.User;
import com.example.authservice.exceptions.UserAlreadyExistsException;
import com.example.authservice.exceptions.UserNotExistsException;
import com.example.authservice.repository.AuthRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final JwtService jwtService;


    public AuthService(AuthRepository authRepository, JwtService jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }


    public Optional<LoginResponse> authenticate(UserCredential userCredential) {
        Optional<User> user = authRepository.findByEmail(userCredential.getEmail());

        if (user.isPresent()) {
            User currentUser = user.get();

            if (jwtService.getPasswordEncoder().matches(userCredential.getPassword(), currentUser.getPassword())) {

                return Optional.of(new LoginResponse(
                        jwtService.generateToken(currentUser),
                        currentUser.getId(),
                        currentUser.getUsername(),
                        currentUser.getEmail()
                ));
            }
        }
        return Optional.empty();
    }


    public LoginResponse registerUser(User user){

        if(authRepository.findByEmail(user.getEmail()).isPresent()
            || authRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Email or Username already in use");
        }

        user.setPassword(jwtService.getPasswordEncoder().encode(user.getPassword()));

        User savedUser = authRepository.save(user);

        return new LoginResponse(
                jwtService.generateToken(savedUser),
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );
    }


    public void deleteUser(long id){

        if(authRepository.findById(id).isEmpty()) {
            throw new UserNotExistsException("User does not exists");
        }
        authRepository.deleteById(id);
    }



}
