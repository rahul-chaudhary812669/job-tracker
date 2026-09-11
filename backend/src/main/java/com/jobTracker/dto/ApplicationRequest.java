package com.jobtracker.backend.dto;

import lombok.Data;

@Data
public class ApplicationRequest {
    private String company;
    private String role;
    private String status;
    private String date;
    private String notes;
}
