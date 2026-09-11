package com.jobtracker.backend.service;

import com.jobtracker.backend.dto.ApplicationRequest;
import com.jobtracker.backend.dto.ApplicationResponse;
import com.jobtracker.backend.model.JobApplication;
import com.jobtracker.backend.model.User;
import com.jobtracker.backend.repository.JobApplicationRepository;
import com.jobtracker.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private ApplicationResponse toResponse(JobApplication app) {
        return new ApplicationResponse(
                app.getId(),
                app.getCompany(),
                app.getRole(),
                app.getStatus(),
                app.getDate(),
                app.getNotes()
        );
    }

    public List<ApplicationResponse> getAllApplications() {
        User user = getCurrentUser();
        return jobApplicationRepository.findByUserId(user.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ApplicationResponse createApplication(ApplicationRequest request) {
        User user = getCurrentUser();

        JobApplication app = JobApplication.builder()
                .company(request.getCompany())
                .role(request.getRole())
                .status(request.getStatus())
                .date(request.getDate())
                .notes(request.getNotes())
                .user(user)
                .build();

        return toResponse(jobApplicationRepository.save(app));
    }

    public ApplicationResponse updateApplication(Long id, ApplicationRequest request) {
        User user = getCurrentUser();

        JobApplication app = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if(!app.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        app.setCompany(request.getCompany());
        app.setRole(request.getRole());
        app.setStatus(request.getStatus());
        app.setDate(request.getDate());
        app.setNotes(request.getNotes());

        return toResponse(jobApplicationRepository.save(app));

    }

    public void deleteApplication(Long id) {
        User user = getCurrentUser();

        JobApplication app = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!app.getUser().getId().equals(user.getId()) ) {
            throw new RuntimeException("Unauthorized");
        }

        jobApplicationRepository.delete(app);
    }
}
