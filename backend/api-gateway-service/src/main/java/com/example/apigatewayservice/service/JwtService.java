package com.example.apigatewayservice.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;


@Component
public class JwtService {

    private final String secretKey = System.getenv("JWT_SECRET_KEY");


    public boolean validate(String token) {
        try{
            Jwts.parser()
                    .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseClaimsJws(token);

            return true;
        }catch(Exception e){
            return false;
        }
    }

    public String getIdUserFromToken(String token) {
        Claims claims =  Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}
