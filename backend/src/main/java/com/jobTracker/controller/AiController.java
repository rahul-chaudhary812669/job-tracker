package com.jobtracker.backend.controller;


import com.jobtracker.backend.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/resume-tips")
    public ResponseEntity<Map<String, String>> getResumeTips(@RequestBody Map<String, String> request) {
        String jobDescription = request.get("jobDescription");
        String tips = aiService.getResumeTips(jobDescription);
        return ResponseEntity.ok(Map.of("tips", tips));
    }
}
