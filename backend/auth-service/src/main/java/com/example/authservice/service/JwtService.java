package com.example.authservice.service;

import com.example.authservice.dto.UserInfo;
import com.example.authservice.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtService {

    private final String SecretKey = System.getenv("JWT_SECRET_KEY");
    private final long ExpirationTime = (long) (1000 * 60 * 120);

    public String generateToken(UserInfo userInfo) {
        return Jwts.builder()
                .setSubject(String.valueOf(userInfo.getIdUser()))
                .claim("username", userInfo.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ExpirationTime))
                .signWith(Keys.hmacShaKeyFor(SecretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
