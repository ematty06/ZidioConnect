package com.zidio.connect.recruiter.controller;

import com.zidio.connect.recruiter.entity.Internship;
import com.zidio.connect.recruiter.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    private static final String PDF_DIR = "uploads/recruiter_pdfs/";

    @PostMapping("/{recruiterId}/internships")
    public ResponseEntity<Internship> postInternship(
            @PathVariable Long recruiterId,
            @RequestBody Internship internship) {

        // Construct the expected PDF URL
        String filename = "profile_" + recruiterId + ".pdf";
        String filePath = PDF_DIR + filename;
        String profilePdfUrl = "http://localhost:8081/" + filePath.replace("\\", "/");

        // Optionally regenerate PDF if not present or on demand
        Path path = Paths.get(filePath);
        if (!Files.exists(path)) {
            // You could call the same logic to generate PDF here
            // Or redirect the recruiter to complete profile first
            throw new RuntimeException("Recruiter profile PDF not found. Please complete your profile.");
        }

        // Attach the profile PDF URL to the internship
        internship.setRecruiterProfilePdfUrl(profilePdfUrl);

        Internship created = internshipService.createInternship(recruiterId, internship);
        return ResponseEntity.ok(created);
    }

    // Recruiter views internships they posted
    @GetMapping("/{recruiterId}/internships")
    public ResponseEntity<List<Internship>> getPosted(@PathVariable Long recruiterId) {
        return ResponseEntity.ok(internshipService.getInternshipsByRecruiter(recruiterId));
    }

    @DeleteMapping("/{recruiterId}/internships/{internshipId}")
    public ResponseEntity<String> deleteInternship(
            @PathVariable Long recruiterId,
            @PathVariable Long internshipId) {

        boolean deleted = internshipService.deleteInternshipByRecruiter(recruiterId, internshipId);
        if (deleted) {
            return ResponseEntity.ok("Internship deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Internship not found or unauthorized access.");
        }
    }

    // Public: View or search internships
    @GetMapping("/public/internships")
    public ResponseEntity<List<Internship>> getOrSearchInternships(
            @RequestParam(required = false, name = "q") String keyword) {
        if (keyword != null && !keyword.isEmpty()) {
            return ResponseEntity.ok(internshipService.searchInternships(keyword));
        } else {
            return ResponseEntity.ok(internshipService.getAllInternships());
        }
    }

    // Public: Search internships
    @GetMapping("/public/internships/search")
    public ResponseEntity<List<Internship>> searchInternships(@RequestParam("q") String keyword) {
        return ResponseEntity.ok(internshipService.searchInternships(keyword));
    }

    // Get internship by ID
    @GetMapping("/public/internships/{id}")
    public ResponseEntity<Internship> getInternship(@PathVariable Long id) {
        return ResponseEntity.ok(internshipService.getInternshipById(id));
    }
}
