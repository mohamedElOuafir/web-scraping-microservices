package com.example.apigatewayservice.filter;

import com.example.apigatewayservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import reactor.util.annotation.NonNull;


@Component
public class AuthFilter implements WebFilter {

    private final JwtService jwtService;

    public AuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }


    public Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }


    @Override
    @NonNull
    public Mono<Void> filter(ServerWebExchange exchange, @NonNull WebFilterChain chain){
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        String path = exchange.getRequest().getPath().value();


        if(path.startsWith("/auth/")){
            return chain.filter(exchange);
        }


        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange);
        }


        String token = authHeader.substring(7);

        if(!jwtService.validate(token)){
            return unauthorized(exchange);
        }

        String username = jwtService.getUsernameFromToken(token);

        exchange.mutate().request(
                exchange.getRequest().mutate()
                        .header("Username", username)
                        .build()
        );

        return chain.filter(exchange);
    }


}
