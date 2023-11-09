package com.lokomotif.accelorometer.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class SummaryResponse {
    private String id;
    private LocalDateTime timestamps;
    private int totalLocomotive;
    private int totalBeroperasi;
    private int totalDiperbaiki;
    private int totalDitangguhkan;

    public SummaryResponse(String id, LocalDateTime timestamps, int totalLocomotive, int totalBeroperasi, int totalDiperbaiki, int totalDitangguhkan) {
        this.id = id;
        this.timestamps = timestamps;
        this.totalLocomotive = totalLocomotive;
        this.totalBeroperasi = totalBeroperasi;
        this.totalDiperbaiki = totalDiperbaiki;
        this.totalDitangguhkan = totalDitangguhkan;
    }
}
