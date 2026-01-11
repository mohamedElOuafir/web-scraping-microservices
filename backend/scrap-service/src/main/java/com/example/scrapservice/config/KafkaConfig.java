package com.example.scrapservice.config;

import com.example.scrapservice.dto.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

@Configuration
public class KafkaConfig {

    @Bean
    public KafkaTemplate<String, ArticleDto> kafkaTemplateArticle(ProducerFactory<String, ArticleDto> producerFactory) {
        return new KafkaTemplate<>(producerFactory);
    }

}
