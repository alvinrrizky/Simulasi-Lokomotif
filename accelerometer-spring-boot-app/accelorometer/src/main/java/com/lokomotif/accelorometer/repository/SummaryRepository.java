package com.lokomotif.accelorometer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lokomotif.accelorometer.models.SummaryLoco;

@Repository
public interface SummaryRepository extends JpaRepository<SummaryLoco, String> {
    
    SummaryLoco findTopByOrderByIdDesc();
    List<SummaryLoco> findAllByOrderByTimestampsDesc();
    List<SummaryLoco> findAllByOrderByTimestampsAsc();
}

