package com.zidio.connect.student.service;

import org.springframework.stereotype.Service;

import com.zidio.connect.student.entity.Student;

@Service
public class ResumeService {

    public String generateResume(Student student) {
        // Logic to generate resume and return file path
        return "uploads/resumes/" + student.getName() + "_resume.pdf";
    }
}
