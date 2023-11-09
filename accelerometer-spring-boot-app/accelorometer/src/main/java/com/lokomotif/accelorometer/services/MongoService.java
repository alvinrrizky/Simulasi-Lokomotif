package com.lokomotif.accelorometer.services;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.lokomotif.accelorometer.models.Loco;
import com.lokomotif.accelorometer.models.SummaryLoco;
import com.lokomotif.accelorometer.repository.SummaryRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MongoService {

    private static final Logger logger = LoggerFactory.getLogger(MongoService.class);
    
    private final MongoTemplate mongoTemplate;
    private final SummaryRepository summaryRepository;

    public MongoService(MongoTemplate mongoTemplate, SummaryRepository summaryRepository) {
        this.mongoTemplate = mongoTemplate;
        this.summaryRepository = summaryRepository;
    }

    public List<Loco> fetchDataFromMongo() {
        return mongoTemplate.findAll(Loco.class);
    }

    @Scheduled(fixedRate = 3600000)
    public void fetchDataRegularly() {
        logger.info("Fetching data from MongoDB...");
        List<Loco> data = fetchDataFromMongo();
        logger.info("Data fetched!");

        if (data != null && !data.isEmpty()) {
            int totalLocomotive = data.size();
            int totalBeroperasi = 0;
            int totalDiperbaiki = 0;
            int totalDitangguhkan = 0;

            for (Loco entity : data) {
                switch (entity.getStatus()) {
                    case "Beroperasi":
                        totalBeroperasi++;
                        break;
                    case "Diperbaiki":
                        totalDiperbaiki++;
                        break;
                    case "Ditangguhkan":
                        totalDitangguhkan++;
                        break;
                    default:
                        break;
                }
            }

            logger.info("Total Locomotive: {}", totalLocomotive);
            logger.info("Total Operational: {}", totalBeroperasi);
            logger.info("Total Under Repair: {}", totalDiperbaiki);
            logger.info("Total Suspended: {}", totalDitangguhkan);

            SummaryLoco summaryLoco = new SummaryLoco();
            summaryLoco.setId(UUID.randomUUID().toString());
            summaryLoco.setTimestamps(LocalDateTime.now());
            summaryLoco.setTotalLocomotive(totalLocomotive);
            summaryLoco.setTotalBeroperasi(totalBeroperasi);
            summaryLoco.setTotalDiperbaiki(totalDiperbaiki);
            summaryLoco.setTotalDitangguhkan(totalDitangguhkan);

            summaryRepository.save(summaryLoco);
        }
    }
}
