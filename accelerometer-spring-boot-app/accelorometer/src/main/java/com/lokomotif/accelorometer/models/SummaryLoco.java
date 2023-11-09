package com.lokomotif.accelorometer.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import jakarta.persistence.Column;

import lombok.Data;

@Entity
@Data
@Table(name = "summary_loco")
public class SummaryLoco {
    @Id
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name = "timestamps")
    private LocalDateTime timestamps;

    @Column(name = "total_locomotive")
    private int totalLocomotive;

    @Column(name = "total_beroperasi")
    private int totalBeroperasi;

    @Column(name = "total_diperbaiki")
    private int totalDiperbaiki;

    @Column(name = "total_ditangguhkan")
    private int totalDitangguhkan;
}
