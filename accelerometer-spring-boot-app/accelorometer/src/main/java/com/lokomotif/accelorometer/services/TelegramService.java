package com.lokomotif.accelorometer.services;

import org.springframework.stereotype.Service;

import com.lokomotif.accelorometer.models.SummaryLoco;
import com.lokomotif.accelorometer.repository.SummaryRepository;

@Service
public class TelegramService {
    
    private final SummaryRepository summaryRepository;

    public TelegramService(SummaryRepository summaryRepository) {
        this.summaryRepository = summaryRepository;
    }

    public SummaryLoco getLatestData() {
        return summaryRepository.findTopByOrderByIdDesc();
    }
}
