package com.lokomotif.accelorometer.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lokomotif.accelorometer.dto.SummaryResponse;
import com.lokomotif.accelorometer.services.SummaryService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/summary")
public class SummaryController {

    private final SummaryService summaryService;

    public SummaryController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<SummaryResponse>> getAllData(
            @RequestParam(value = "orderBy", required = false) String orderBy,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        List<SummaryResponse> allSummaryData;

        if (orderBy != null && !orderBy.isEmpty()) {
            allSummaryData = summaryService.getDataAll(page, size, orderBy);
        } else {
            allSummaryData = summaryService.getDataAll(page, size, "Default");
        }

        return ResponseEntity.ok(allSummaryData);
    }

    
    @GetMapping("/latest")
    public ResponseEntity<SummaryResponse> getLatest() {
        SummaryResponse latestSummary = summaryService.getLatest();
        if (latestSummary != null) {
            return ResponseEntity.ok(latestSummary);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
