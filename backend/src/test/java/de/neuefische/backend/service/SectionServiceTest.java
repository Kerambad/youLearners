package de.neuefische.backend.service;

import de.neuefische.backend.model.Section;
import de.neuefische.backend.model.SectionDTO;
import de.neuefische.backend.repository.SectionRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SectionServiceTest {

    private final SectionRepo testRepo = mock(SectionRepo.class);
    private final IdService testIdService = mock(IdService.class);
    private final SectionService testService = new SectionService(testRepo, testIdService);

    //TestValues
    Section testSection1 = new Section("1", "q1", "Test", 0,5);
    SectionDTO testSection1DTO = new SectionDTO("q1", "Test", 0,5);
    Section expectedTestSection1 = new Section("1", "q1", "Test", 0,5);

    Section testSection2 = new Section("1", "q2", "tseT", 1, 5);
    Section expectedTestSection2 = new Section("1", "q2", "tseT", 1, 5);

    SectionDTO invalidTimeSectionDTO = new SectionDTO("1","Test", -1,10);
    SectionDTO invalidNameSectionDTO = new SectionDTO("1","", 1,10);
    SectionDTO invalidVideoIdSectionDTO = new SectionDTO("","Test", 1,10);
    SectionDTO invalidEndTimeBeforeStartTimeDtoJson = new SectionDTO("","Test", 10,5);

    @Test
    void getAllSections_ShouldReturnAllSections() {
        //GIVEN
        List<Section> testValues = List.of(testSection1,testSection2);
        when(testRepo.findAll()).thenReturn(testValues);
        //WHEN
        List<Section> actual = testService.getAllSections();
        //THEN
        List<Section> expected = List.of(expectedTestSection1,expectedTestSection2);
        assertEquals(expected, actual);
    }

    @Test
    void addNewSection_ShouldReturnNewSection_IfTimeIs0() {
        //GIVEN
        when(testIdService.createRandomId()).thenReturn("1");
        when(testRepo.save(testSection1)).thenReturn(testSection1);
        //WHEN
        Section actual = testService.addNewSection(testSection1DTO);
        //THEN
        verify(testIdService).createRandomId();
        assertEquals(expectedTestSection1, actual);
    }

    @Test
    void addNewSection_ShouldThrowIllegalArgumentException_IfTimeIsLowerThen0() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewSection(invalidTimeSectionDTO));
    }

    @Test
    void addNewSection_ShouldThrowIllegalArgumentException_IfNameIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewSection(invalidNameSectionDTO));
    }
    @Test
    void addNewSection_ShouldThrowIllegalArgumentException_IfVideoIdIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewSection(invalidVideoIdSectionDTO));
    }
    @Test
    void addNewSection_ShouldThrowIllegalArgumentException_IfEndTimeIsBeforeStartTime() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewSection(invalidEndTimeBeforeStartTimeDtoJson));
    }
    @Test
    void updateSection_ShouldReturnUpdatedSection_IfTimeIs0() {
        //GIVEN
        when(testRepo.existsById("1")).thenReturn(true);
        when(testRepo.save(testSection1)).thenReturn(testSection1);
        //WHEN
        Section actual = testService.updateSection("1", testSection1DTO);
        //THEN
        assertEquals(expectedTestSection1, actual);
    }

    @Test
    void updateSection_ShouldThrowNoSuchElementException_IfSectionWasNotFound() {
        //GIVEN
        String testId = "1";
        when(testRepo.existsById("1")).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, () -> testService.updateSection(testId, testSection1DTO));
    }

    @Test
    void updateSection_ShouldThrowIllegalArgumentException_IfTimeIsLowerThen0() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateSection("1", invalidTimeSectionDTO));
    }

    @Test
    void updateSection_ShouldThrowIllegalArgumentException_IfNameIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateSection("1", invalidNameSectionDTO));
    }
    @Test
    void updateSection_ShouldThrowIllegalArgumentException_IfVideoIdIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateSection("1", invalidVideoIdSectionDTO));
    }
    @Test
    void updateSection_ShouldThrowIllegalArgumentException_IfEndTimeIsBeforeStartTime() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateSection("1",invalidEndTimeBeforeStartTimeDtoJson));
    }
    @Test
    void removeSection_ShouldReturnTrue_IfSectionWasDeleted() {
        //GIVEN
        String testId = "1";
        when(testRepo.existsById("1")).thenReturn(true);
        //WHEN
        Boolean expected = testService.removeSection(testId);
        //THEN
        assertTrue(expected);
    }

    @Test
    void removeSection_ShouldThrowNoSuchElementException_IfSectionWasNotFound() {
        //GIVEN
        String testId = "1";
        when(testRepo.existsById("1")).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, () -> testService.removeSection(testId));
    }
}