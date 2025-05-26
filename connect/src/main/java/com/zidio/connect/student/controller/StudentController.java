package com.zidio.connect.student.controller;

import com.zidio.connect.student.entity.Student;
import com.zidio.connect.student.repository.StudentRepository;
import com.zidio.connect.student.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private ResumeService resumeService;

    private static final String IMAGE_DIR = "uploads/profile_images/";

    @PostMapping(value = "/{id}/setup-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Student> setupProfile(
            @PathVariable Long id,
            @RequestPart("student") Student updated,
            @RequestPart("profileImage") MultipartFile profileImage) throws IOException {

        Student student = studentRepo.findById(id).orElseThrow();

        // Save image to disk
        String filename = UUID.randomUUID().toString() + "_" + profileImage.getOriginalFilename();
        Path imagePath = Paths.get(IMAGE_DIR + filename);
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, profileImage.getBytes());

        // Update student fields
        student.setBio(updated.getBio());
        student.setSkills(updated.getSkills());
        student.setEducation(updated.getEducation());
        student.setProjects(updated.getProjects());
        student.setCertifications(updated.getCertifications());
        student.setGithubProfile(updated.getGithubProfile());
        student.setLinkedinProfile(updated.getLinkedinProfile());
        student.setPhoneNumber(updated.getPhoneNumber());
        student.setGraduationYear(updated.getGraduationYear());
        student.setUniversity(updated.getUniversity());
        String publicUrl = "http://localhost:8081/" + imagePath.toString().replace("\\", "/");
        student.setProfileImagePath(publicUrl);
        student.setProfileCompleted(true);

        // Generate resume
        String resumePath = resumeService.generateResume(student);
        student.setResumePath(resumePath);

        return ResponseEntity.ok(studentRepo.save(student));
    }
}
