package com.lokomotif.accelorometer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "locomotives")
public class Loco {

    @Id
    @Field("LocoCode")
    private String locoCode;

    @Field("LocoName")
    private String locoName;

    @Field("LocoLength")
    private Double locoLength;

    @Field("LocoWidth")
    private Double locoWidth;

    @Field("LocoHeigth")
    private Double locoHeigth;

    @Field("Status")
    private String status;
    
    @Field("DateAndTime")
    private String dateAndTime;
}
