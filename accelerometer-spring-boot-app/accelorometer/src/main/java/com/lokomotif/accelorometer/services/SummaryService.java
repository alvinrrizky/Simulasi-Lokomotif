package com.lokomotif.accelorometer.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.lokomotif.accelorometer.dto.SummaryResponse;
import com.lokomotif.accelorometer.models.SummaryLoco;
import com.lokomotif.accelorometer.repository.SummaryRepository;

@Service
public class SummaryService {

    private final SummaryRepository summaryRepository;

    public SummaryService(SummaryRepository summaryRepository) {
        this.summaryRepository = summaryRepository;
    }

    

    public List<SummaryResponse> getDataAll(int page, int size, String orderBy) {
        Pageable pageable;

        if ("Desc".equalsIgnoreCase(orderBy)) {
            pageable = PageRequest.of(page, size, Sort.by("timestamps").descending());
        } else if ("Asc".equalsIgnoreCase(orderBy)) {
            pageable = PageRequest.of(page, size, Sort.by("timestamps").ascending());
        } else {
            pageable = PageRequest.of(page, size);
        }

        Page<SummaryLoco> summaryLocosPage = summaryRepository.findAll(pageable);
        List<SummaryLoco> summaryLocos = summaryLocosPage.getContent();

        List<SummaryResponse> summaryResponses = new ArrayList<>();

        for (SummaryLoco summaryLoco : summaryLocos) {
            SummaryResponse summaryResponse = new SummaryResponse(
                summaryLoco.getId(),
                summaryLoco.getTimestamps(),
                summaryLoco.getTotalLocomotive(),
                summaryLoco.getTotalBeroperasi(),
                summaryLoco.getTotalDiperbaiki(),
                summaryLoco.getTotalDitangguhkan()
            );
            summaryResponses.add(summaryResponse);
        }

        return summaryResponses;
    }
    

    public SummaryResponse getLatest() {
        SummaryLoco latestSummary = summaryRepository.findTopByOrderByIdDesc();
    
        if (latestSummary != null) {
            return new SummaryResponse(
                latestSummary.getId(),
                latestSummary.getTimestamps(),
                latestSummary.getTotalLocomotive(),
                latestSummary.getTotalBeroperasi(),
                latestSummary.getTotalDiperbaiki(),
                latestSummary.getTotalDitangguhkan()
            );
        } else {
            return null;
        }
    }
}

