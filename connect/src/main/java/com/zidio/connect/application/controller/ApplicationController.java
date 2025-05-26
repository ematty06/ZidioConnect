package com.zidio.connect.application.controller;

import com.zidio.connect.application.entity.Application;
import com.zidio.connect.application.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping(value = "/{studentId}/apply/{internshipId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Application> applyWithDetails(
            @PathVariable Long studentId,
            @PathVariable Long internshipId,
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("education") String education,
            @RequestParam("graduationYear") int graduationYear) {

        // Save resume to disk
        String uploadDir = "uploads/resumes/";
        String filename = UUID.randomUUID() + "_" + resumeFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + filename);

        try {
            Files.createDirectories(filePath.getParent());
            Files.copy(resumeFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // Resume public URL
        String resumeUrl = "http://localhost:8081/api/files/resumes/" + filename;

        // Call your service layer with extra fields (you need to update it too)
        Application application = applicationService.applyForInternship(
                studentId, internshipId, resumeUrl, firstName, lastName, phoneNumber, education, graduationYear);

        return ResponseEntity.ok(application);
    }

    @GetMapping("/status/{studentId}")
    public ResponseEntity<List<Application>> getStatus(@PathVariable Long studentId) {
        return ResponseEntity.ok(applicationService.getApplicationsByStudent(studentId));
    }

    @GetMapping("/internship/{internshipId}/applicants")
    public ResponseEntity<List<Application>> getApplicants(@PathVariable Long internshipId) {
        return ResponseEntity.ok(applicationService.getApplicantsByInternship(internshipId));
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable Long applicationId,
            @RequestBody Map<String, String> body) {
        String statusStr = body.get("status");
        Application.Status status = Application.Status.valueOf(statusStr);
        return ResponseEntity.ok(applicationService.updateApplicationStatus(applicationId, status));
    }
}
