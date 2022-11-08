package de.neuefische.backend.service;

import de.neuefische.backend.model.Section;
import de.neuefische.backend.model.SectionDTO;
import de.neuefische.backend.repository.SectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SectionService {
    private final SectionRepo sectionRepo;

    private final IdService idService;

    @Autowired
    public SectionService(SectionRepo sectionRepo, IdService idService) {
        this.sectionRepo = sectionRepo;
        this.idService = idService;
    }


    public List<Section> getAllSections() {
        return sectionRepo.findAll();
    }

    public Section addNewSection(SectionDTO newSection) {
        checkIfNameAndTimeIsValid(newSection);
        Section newSectionWithId = new Section(
            idService.createRandomId(),
                newSection.getDedicatedVideoId(),
                newSection.getName(),
                newSection.getTime(),
                newSection.getEndTime()
        );
        return sectionRepo.save(newSectionWithId);
    }

    public Section updateSection(String id, SectionDTO newSection) {
        checkIfNameAndTimeIsValid(newSection);
        if(!sectionRepo.existsById(id)) {
            throw new NoSuchElementException("Section Id Not Found: " + id);
        }
        Section updatedSection = new Section(
                id,
                newSection.getDedicatedVideoId(),
                newSection.getName(),
                newSection.getTime(),
                newSection.getEndTime()
                );
        return sectionRepo.save(updatedSection);
    }

    public Boolean removeSection(String id) {
        if(!sectionRepo.existsById(id)) {
            throw new NoSuchElementException("Section Id Not Found: " + id);
        }
        sectionRepo.deleteById(id);
        return true;
    }

    private void checkIfNameAndTimeIsValid(SectionDTO newSection) {
        if(newSection.getTime() < 0) {
            throw new IllegalArgumentException("Time can't be lower then 0");
        }
        if(newSection.getName().isEmpty()) {
            throw new IllegalArgumentException("Name can't be empty");
        }
        if(newSection.getDedicatedVideoId().isEmpty()) {
            throw new IllegalArgumentException("VideoId can't be empty");
        }
        if(newSection.getEndTime() < newSection.getTime()) {
            throw new IllegalArgumentException("End time must be after start time");
        }
    }
}
