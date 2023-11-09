package com.lokomotif.accelorometer.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class LocoService {

    private static final Logger logger = LoggerFactory.getLogger(LocoService.class);

    private RestTemplate restTemplate = new RestTemplate();
    private Random random = new Random();

    private double formatDouble(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    public void sendDataToNodeJS() {
        String[] possibleLocoNames = {"Kereta Api", "Lokomotif", "Gerbong", "KRL", "MRT"};
        String[] possibleStatus = {"Beroperasi", "Diperbaiki", "Ditangguhkan"};

        String locoName = possibleLocoNames[random.nextInt(possibleLocoNames.length)];
        String status = possibleStatus[random.nextInt(possibleStatus.length)];

        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String dateTimeString = currentDateTime.format(formatter);

        Map<String, Object> data = new HashMap<>();
        data.put("LocoCode", UUID.randomUUID());
        data.put("LocoName", locoName);
        data.put("LocoLength", formatDouble(random.nextDouble() * 100));
        data.put("LocoWidth", formatDouble(random.nextDouble() * 100));
        data.put("LocoHeigth", formatDouble(random.nextDouble() * 100));
        data.put("Status", status);
        data.put("DateAndTime", dateTimeString);

        logger.info("LocoCode: {}", UUID.randomUUID());
        logger.info("LocoName: {}", locoName);
        logger.info("LocoLength: {}", formatDouble(random.nextDouble() * 100));
        logger.info("LocoWidth: {}", formatDouble(random.nextDouble() * 100));
        logger.info("LocoHeigth: {}", formatDouble(random.nextDouble() * 100));
        logger.info("Status: {}", status);
        logger.info("DateAndTime: {}", dateTimeString);

        String url = "http://localhost:3000/receive-data";
        restTemplate.postForEntity(url, data, String.class);
    }
}
