package com.zidio.connect.auth.service;

import com.zidio.connect.auth.dto.*;
import com.zidio.connect.admin.entity.Admin;
import com.zidio.connect.admin.repository.AdminRepository;
import com.zidio.connect.auth.util.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {
    @Autowired
    private AdminRepository adminRepo;

    public LoginResponse register(RegisterRequest req) {
        Admin admin = new Admin();
        admin.setName(req.getName());
        admin.setEmail(req.getEmail());
        admin.setPassword(PasswordEncoderUtil.encode(req.getPassword()));
        Admin savedAdmin = adminRepo.save(admin);
        return new LoginResponse("Admin registered", savedAdmin.getId());

    }

    public LoginResponse login(LoginRequest req) {
        Admin admin = adminRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!PasswordEncoderUtil.matches(req.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return new LoginResponse("Login successful", admin.getId());
    }
}
