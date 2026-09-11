package com.jobtracker.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class AiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String getResumeTips(String jobDescription) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        String prompt = """
                You are a professional resume advisor.
                Based on the following job description, give 5 specific and practical resume tips 
                to help a candidate tailor their resume for this role.
                Be concise and direct. Use numbered points.
                
                Job Description:
                """ + jobDescription;

        Map<String, Object> requestBody = Map.of("contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))));

        RestClient restClient = RestClient.create();

        Map response = restClient.post()
                .uri(url)
                .header("Content-Type", "application/json")
                .body(requestBody)
                .retrieve()
                .body(Map.class);

        var candidates = (List<?>) response.get("candidates");
        var first = (Map<?, ?>) candidates.get(0);
        var content = (Map<?,?>) first.get("content");
        var parts = (List<?>) content.get("parts");
        var part = (Map<?, ?>) parts.get(0);

        return part.get("text").toString();
    }
}

