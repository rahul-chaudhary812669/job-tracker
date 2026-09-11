package com.jobtracker.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private String company;
    private String role;
    private String status;
    private String date;
    private String notes;
}
