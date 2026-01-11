package com.example.articleservice.repository;


import com.example.articleservice.entity.Creator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreatorRepository extends JpaRepository<Creator,Long> {
    Optional<Creator> findByName(String name);
}
