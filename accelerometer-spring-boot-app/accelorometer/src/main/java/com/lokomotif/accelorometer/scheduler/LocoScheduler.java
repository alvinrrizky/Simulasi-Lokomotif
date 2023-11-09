package com.lokomotif.accelorometer.scheduler;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.lokomotif.accelorometer.services.LocoService;

@Component
public class LocoScheduler {

    private LocoService locoService;

    public LocoScheduler (LocoService locoService) {
        this.locoService = locoService;
    }

    @Async
    @Scheduled(fixedRate = 10000)
    public void sendLocoData() {
        locoService.sendDataToNodeJS();
    }
}
