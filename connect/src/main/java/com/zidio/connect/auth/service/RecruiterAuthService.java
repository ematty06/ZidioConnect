package com.zidio.connect.auth.service;

import com.zidio.connect.auth.dto.*;
import com.zidio.connect.recruiter.entity.Recruiter;
import com.zidio.connect.recruiter.repository.RecruiterRepository;
import com.zidio.connect.auth.util.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecruiterAuthService {
    @Autowired
    private RecruiterRepository recruiterRepo;

    public LoginResponse register(RegisterRequest req) {
        Recruiter recruiter = new Recruiter();
        recruiter.setName(req.getName());
        recruiter.setEmail(req.getEmail());
        recruiter.setPassword(PasswordEncoderUtil.encode(req.getPassword()));
        Recruiter savedRecruiter = recruiterRepo.save(recruiter);
        return new LoginResponse("Recruiter registered", savedRecruiter.getId());

    }

    public LoginResponse login(LoginRequest req) {
        Recruiter recruiter = recruiterRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        if (!PasswordEncoderUtil.matches(req.getPassword(), recruiter.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return new LoginResponse("Login successful", recruiter.getId());
    }
}
