package com.jobtracker.backend.controller;

import com.jobtracker.backend.dto.ApplicationRequest;
import com.jobtracker.backend.dto.ApplicationResponse;
import com.jobtracker.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getAll() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> create(@RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(applicationService.createApplication(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationResponse> update(@PathVariable Long id, @RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(applicationService.updateApplication(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
  }
