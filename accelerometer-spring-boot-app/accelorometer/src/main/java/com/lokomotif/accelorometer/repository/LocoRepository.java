package com.lokomotif.accelorometer.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lokomotif.accelorometer.models.Loco;

public interface LocoRepository extends MongoRepository<Loco, String> {
    
}
