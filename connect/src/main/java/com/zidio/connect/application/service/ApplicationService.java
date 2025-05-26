package com.zidio.connect.application.service;

import com.zidio.connect.application.entity.Application;
import com.zidio.connect.application.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepo;

    public Application applyForInternship(Long studentId, Long internshipId, String resumeUrl,
            String firstName, String lastName, String phoneNumber,
            String education, int graduationYear) {
        Application application = new Application();
        application.setStudentId(studentId);
        application.setInternshipId(internshipId);
        application.setAppliedDate(LocalDate.now());
        application.setResumeUrl(resumeUrl);
        application.setStatus(Application.Status.PENDING);

        // Set additional details
        application.setFirstName(firstName);
        application.setLastName(lastName);
        application.setPhoneNumber(phoneNumber);
        application.setEducation(education);
        application.setGraduationYear(graduationYear);

        return applicationRepo.save(application);
    }

    public List<Application> getApplicationsByStudent(Long studentId) {
        return applicationRepo.findByStudentId(studentId);
    }

    public List<Application> getApplicantsByInternship(Long internshipId) {
        return applicationRepo.findByInternshipId(internshipId);
    }

    public Application updateApplicationStatus(Long applicationId, Application.Status status) {
        Application application = applicationRepo.findById(applicationId).orElseThrow();
        application.setStatus(status);
        return applicationRepo.save(application);
    }
}
