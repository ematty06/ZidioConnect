package com.zidio.connect.recruiter.service;

import com.zidio.connect.recruiter.entity.Internship;
import com.zidio.connect.recruiter.entity.Recruiter;
import com.zidio.connect.recruiter.repository.InternshipRepository;
import com.zidio.connect.recruiter.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    public Internship createInternship(Long recruiterId, Internship internship) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        internship.setRecruiter(recruiter);
        return internshipRepository.save(internship);
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public List<Internship> getInternshipsByRecruiter(Long recruiterId) {
        return internshipRepository.findByRecruiterId(recruiterId);
    }

    public List<Internship> searchInternships(String keyword) {
        return internshipRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    public boolean deleteInternshipByRecruiter(Long recruiterId, Long internshipId) {
        Optional<Internship> internshipOpt = internshipRepository.findById(internshipId);
        if (internshipOpt.isPresent()) {
            Internship internship = internshipOpt.get();
            if (internship.getRecruiter().getId().equals(recruiterId)) {
                internshipRepository.delete(internship);
                return true;
            }
        }
        return false;
    }

}
