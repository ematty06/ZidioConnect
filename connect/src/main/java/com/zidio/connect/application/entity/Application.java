// File: application/entity/Application.java
package com.zidio.connect.application.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long internshipId;
    private LocalDate appliedDate;
    private String resumeUrl;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String education;
    private Integer graduationYear;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING, SELECTED, REJECTED
    }
}
