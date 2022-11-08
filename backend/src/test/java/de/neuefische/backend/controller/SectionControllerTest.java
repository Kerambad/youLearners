package de.neuefische.backend.controller;

import de.neuefische.backend.model.Section;
import de.neuefische.backend.repository.SectionRepo;
import de.neuefische.backend.service.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class SectionControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private SectionRepo testRepo;
    @MockBean
    IdService testIdService;

    Section validTestSection = new Section("1", "2w", "2", 5,10);
    String validDtoJson = """
            {
            "dedicatedVideoId": "2w",
            "name": "2",
            "time": 5,
            "endTime": 10
            }
            """;
    String validJsonExpected = """
            {
            "sectionId":"1",
            "dedicatedVideoId": "2w",
            "name": "2",
            "time": 5,
            "endTime": 10
            }
            """;
    String invalidTimeDtoJson = """
            {
            "dedicatedVideoId": "2w",
            "name": "2",
            "time": -1,
            "endTime": 2
            }
            """;
    String invalidNameDtoJson = """
            {
            "dedicatedVideoId": "2w",
            "name": "",
            "time": 1,
            "endTime": 10
            }
            """;
    String invalidVideoIdDtoJson = """
            {
            "dedicatedVideoId": "",
            "name": "test",
            "time": 1,
            "endTime": 10
            }
            """;
    String invalidEndTimeBeforeStartTimeDtoJson = """
            {
            "dedicatedVideoId": "2w",
            "name": "test",
            "time": 20,
            "endTime": 10
            }
            """;

    @Test
    @DirtiesContext
    void getAllSections_ShouldReturnAllSections() throws Exception {
        //GIVEN
        List<Section> testValues = List.of(validTestSection, new Section("2", "5w", "3", 10,20));
        testRepo.saveAll(testValues);
        String expectedJson = """
                [
                {
                "sectionId":"1",
                "dedicatedVideoId": "2w",
                "name": "2",
                "time": 5,
                "endTime": 10
                },
                {
                "sectionId":"2",
                "dedicatedVideoId": "5w",
                "name": "3",
                "time": 10,
                "endTime": 20
                }
                ]
                """;
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/sections"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

    @Test
    @DirtiesContext
    void addNewSection_ShouldReturnAddedSection() throws Exception {
        //GIVEN
        content().json(validDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");

        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sections")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(validDtoJson))
                .andExpect(status().isOk())
                .andExpect(content().json(validJsonExpected));
    }

    @Test
    @DirtiesContext
    void addNewSection_ShouldReturnStatusCode400BadRequest_IfAddedSectionHasInvalidTime() throws Exception {
        //GIVEN
        content().json(invalidTimeDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sections")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidTimeDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Time can't be lower then 0"));
    }
    @Test
    @DirtiesContext
    void addNewSection_ShouldReturnStatusCode400BadRequest_IfNameIsEmpty() throws Exception {
        //GIVEN
        content().json(invalidNameDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sections")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidNameDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Name can't be empty"));
    }
    @Test
    @DirtiesContext
    void addNewSection_ShouldReturnStatusCode400BadRequest_IfVideoIdIsEmpty() throws Exception {
        //GIVEN
        content().json(invalidVideoIdDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sections")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidVideoIdDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("VideoId can't be empty"));
    }
    @Test
    @DirtiesContext
    void addNewSection_ShouldReturnStatusCode400BadRequest_IfEndTimeIsBeforeStartTime() throws Exception {
        //GIVEN
        content().json(invalidEndTimeBeforeStartTimeDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sections")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidEndTimeBeforeStartTimeDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("End time must be after start time"));
    }
    @Test
    @DirtiesContext
    void updateSection_ShouldReturnUpdatedSection() throws Exception {
        //GIVEN
        testRepo.save(validTestSection);
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/sections/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(validDtoJson))
                .andExpect(status().isOk())
                .andExpect(content().json(validJsonExpected));
    }

    @Test
    @DirtiesContext
    void updateSection_ShouldReturnStatusCode400BadRequest_IfNameIsEmpty() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/sections/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidNameDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Name can't be empty"));
    }

    @Test
    @DirtiesContext
    void updateSection_ShouldReturnStatusCode400BadRequest_IfAddedSectionHasInvalidTime() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/sections/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidTimeDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Time can't be lower then 0"));
    }
    @Test
    @DirtiesContext
    void updateSection_ShouldReturnStatusCode400BadRequest_IfAddedSectionHasInvalidVideoId() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/sections/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidVideoIdDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("VideoId can't be empty"));
    }
    @Test
    @DirtiesContext
    void updateSection_ShouldReturnStatusCode400BadRequest_IfEndTimeIsBeforeStartTime() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/sections/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidEndTimeBeforeStartTimeDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("End time must be after start time"));
    }
    @Test
    @DirtiesContext
    void updateSection_ShouldReturnStatusCode404NotFound_IfIdDoesNotExist() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/sections/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(validDtoJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Section Id Not Found: 1"));
    }

    @Test
    @DirtiesContext
    void removeSection_ShouldReturnTrue_IfIdWasDeletedSuccessfully() throws Exception {
        //GIVEN
        testRepo.save(validTestSection);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/sections/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
        //THEN
    }

    @Test
    @DirtiesContext
    void removeSection_ShouldReturn_StatusCode404NotFound_IfVideoIdWasNotFound() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/sections/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Section Id Not Found: 1"));
        //THEN
    }
}