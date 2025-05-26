package com.zidio.connect.auth.service;

import com.zidio.connect.auth.dto.*;
import com.zidio.connect.student.entity.Student;
import com.zidio.connect.student.repository.StudentRepository;
import com.zidio.connect.auth.util.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentAuthService {
    @Autowired
    private StudentRepository studentRepo;

    public LoginResponse register(RegisterRequest req) {
        Student student = new Student();
        student.setName(req.getName());
        student.setEmail(req.getEmail());
        student.setPassword(PasswordEncoderUtil.encode(req.getPassword()));
        Student savedStudent = studentRepo.save(student);
        return new LoginResponse("Student registered", savedStudent.getId());

    }

    public LoginResponse login(LoginRequest req) {
        Student student = studentRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        if (!PasswordEncoderUtil.matches(req.getPassword(), student.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return new LoginResponse("Login successful", student.getId());
    }
}