package com.zidio.connect.recruiter.controller;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import com.zidio.connect.recruiter.entity.Recruiter;
import com.zidio.connect.recruiter.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    @Autowired
    private RecruiterRepository recruiterRepo;

    private static final String IMAGE_DIR = "uploads/recruiter_images/";
    private static final String PDF_DIR = "uploads/recruiter_pdfs/";

    // ✅ Setup recruiter profile
    @PostMapping(value = "/{id}/setup-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Recruiter> setupProfile(
            @PathVariable Long id,
            @RequestPart("recruiter") Recruiter updated,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {

        Recruiter recruiter = recruiterRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        // Save image if present
        if (profileImage != null && !profileImage.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + profileImage.getOriginalFilename();
            Path imagePath = Paths.get(IMAGE_DIR + filename);
            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, profileImage.getBytes());

            String publicImageUrl = "http://localhost:8081/" + imagePath.toString().replace("\\", "/");
            recruiter.setProfileImagePath(publicImageUrl);
        }

        recruiter.setCompanyName(updated.getCompanyName());
        recruiter.setDesignation(updated.getDesignation());
        recruiter.setCompanyWebsite(updated.getCompanyWebsite());
        recruiter.setPhoneNumber(updated.getPhoneNumber());
        recruiter.setLinkedInProfile(updated.getLinkedInProfile());

        // Set new fields
        recruiter.setAddress(updated.getAddress());
        recruiter.setIndustry(updated.getIndustry());
        recruiter.setCompanyDescription(updated.getCompanyDescription());
        recruiter.setNumberOfEmployees(updated.getNumberOfEmployees());
        recruiter.setHeadquartersLocation(updated.getHeadquartersLocation());
        recruiter.setFoundedYear(updated.getFoundedYear());
        recruiter.setCompanyType(updated.getCompanyType());
        recruiter.setTwitterHandle(updated.getTwitterHandle());
        recruiter.setFacebookPage(updated.getFacebookPage());
        recruiter.setContactEmail(updated.getContactEmail());

        recruiter.setProfileCompleted(true);

        return ResponseEntity.ok(recruiterRepo.save(recruiter));
    }

    // ✅ Get recruiter profile
    @GetMapping("/{id}")
    public ResponseEntity<Recruiter> getProfile(@PathVariable Long id) {
        Optional<Recruiter> recruiter = recruiterRepo.findById(id);
        return recruiter.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Generate and serve recruiter profile PDF (with embedded image)
    @GetMapping("/{id}/profile-pdf")
    public ResponseEntity<String> generateAndServePdf(@PathVariable Long id) {
        Recruiter recruiter = recruiterRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        try {
            Files.createDirectories(Paths.get(PDF_DIR));
            String filename = "profile_" + id + ".pdf";
            String filePath = PDF_DIR + filename;

            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();

            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Font labelFont = new Font(Font.HELVETICA, 12, Font.BOLD);
            Font valueFont = new Font(Font.HELVETICA, 12);

            document.add(new Paragraph("Recruiter Profile", titleFont));
            document.add(new Paragraph(" ")); // spacer

            // Embed profile image if available
            if (recruiter.getProfileImagePath() != null) {
                String imagePath = recruiter.getProfileImagePath().replace("http://localhost:8081/", "");
                try {
                    Image profileImage = Image.getInstance(imagePath);
                    profileImage.scaleToFit(120, 120);
                    profileImage.setAlignment(Image.ALIGN_CENTER);
                    document.add(profileImage);
                    document.add(new Paragraph(" "));
                } catch (Exception e) {
                    document.add(new Paragraph("Image could not be loaded in PDF."));
                }
            }

            // Add fields with label on left and value on right
            addField(document, "Name", recruiter.getName(), labelFont, valueFont);
            addField(document, "Email", recruiter.getEmail(), labelFont, valueFont);
            addField(document, "Company Name", recruiter.getCompanyName(), labelFont, valueFont);
            addField(document, "Designation", recruiter.getDesignation(), labelFont, valueFont);
            addField(document, "Company Website", recruiter.getCompanyWebsite(), labelFont, valueFont);
            addField(document, "Phone Number", recruiter.getPhoneNumber(), labelFont, valueFont);
            addField(document, "LinkedIn Profile", recruiter.getLinkedInProfile(), labelFont, valueFont);
            addField(document, "Address", recruiter.getAddress(), labelFont, valueFont);
            addField(document, "Industry", recruiter.getIndustry(), labelFont, valueFont);
            addField(document, "Company Description", recruiter.getCompanyDescription(), labelFont, valueFont);
            addField(document, "Number of Employees", String.valueOf(recruiter.getNumberOfEmployees()), labelFont,
                    valueFont);
            addField(document, "Headquarters Location", recruiter.getHeadquartersLocation(), labelFont, valueFont);
            addField(document, "Founded Year", recruiter.getFoundedYear(), labelFont, valueFont);
            addField(document, "Company Type", recruiter.getCompanyType(), labelFont, valueFont);
            addField(document, "Twitter Handle", recruiter.getTwitterHandle(), labelFont, valueFont);
            addField(document, "Facebook Page", recruiter.getFacebookPage(), labelFont, valueFont);
            addField(document, "Contact Email", recruiter.getContactEmail(), labelFont, valueFont);

            document.close();

            String fileUrl = "http://localhost:8081/" + filePath.replace("\\", "/");
            return ResponseEntity.ok(fileUrl);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to generate PDF: " + e.getMessage());
        }
    }

    private void addField(Document doc, String label, String value, Font labelFont, Font valueFont)
            throws DocumentException {
        Paragraph p = new Paragraph();
        p.add(new Chunk(label + ": ", labelFont));
        p.add(new Chunk(value != null ? value : "N/A", valueFont));
        doc.add(p);
    }
}
