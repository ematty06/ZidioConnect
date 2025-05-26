package com.zidio.connect.application.repository;

import com.zidio.connect.application.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);

    List<Application> findByInternshipId(Long internshipId);
}
