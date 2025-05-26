package com.zidio.connect.recruiter.repository;

import com.zidio.connect.recruiter.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByRecruiterId(Long recruiterId);

    List<Internship> findByTitleContainingIgnoreCase(String keyword);
}
