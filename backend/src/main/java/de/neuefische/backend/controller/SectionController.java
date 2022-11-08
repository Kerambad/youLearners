package de.neuefische.backend.controller;

import de.neuefische.backend.model.Section;
import de.neuefische.backend.model.SectionDTO;
import de.neuefische.backend.service.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class SectionController {
    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }
    @PostMapping
    public Section addNewSection(@RequestBody SectionDTO newSection) {
        return sectionService.addNewSection(newSection);
    }
    @PutMapping("/{id}")
    public Section updateSection(@PathVariable String id, @RequestBody SectionDTO newSection) {
        return sectionService.updateSection(id, newSection);
    }
    @DeleteMapping("/{id}")
    public Boolean removeSection(@PathVariable String id) {
        return sectionService.removeSection(id);
    }
}
