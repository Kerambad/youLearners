package de.neuefische.backend.controller;

import de.neuefische.backend.model.Video;
import de.neuefische.backend.repository.VideoRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class VideoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private VideoRepo testRepo;

    @Test
    @DirtiesContext
    void getCompleteHistory_ReturnsListOfVideoModels() throws Exception {
        //GIVEN
        testRepo.saveAll(List.of(new Video("1","test"), new Video("3", "test2")));
        String expectedJson = """
                [
                {
                "videoId":"1",
                "title": "test"
                },
                {
                "videoId":"3",
                "title": "test2"
                }
                ]
                """;
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/videos")).andExpect(status().isOk()).andExpect(content().json(expectedJson));
        //THEN

    }

    @Test
    @DirtiesContext
    void addNewVideo_ShouldReturnAddedVideo_IfSaveWasSuccessfully() throws Exception {
        //GIVEN
        String toPost = """ 
                {
                "videoId":"5q",
                "title": "test"
                }
                """;
        content().json(toPost);
        String expectedJson = """
                {
                "videoId":"5q",
                "title": "test"
                }
                """;
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/videos")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(toPost))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
        //THEN

    }
    @Test
    @DirtiesContext
    void addNewVideo_ShouldReturnStatusCode_409Conflict() throws Exception {
        //GIVEN
        testRepo.save(new Video("5q","test"));
        String toPost = """ 
                {
                "videoId":"5q",
                "title": "test"
                }
                """;
        content().json(toPost);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/videos")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(toPost))
                .andExpect(status().isConflict());
        //THEN

    }
    @Test
    @DirtiesContext
    void addNewVideo_ShouldReturnStatusCode_404BadRequest_IfElementHasEmptyId() throws Exception {
        //GIVEN
        String toPost = """ 
                {
                "videoId":"",
                "title": "test"
                }
                """;
        content().json(toPost);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/videos")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(toPost))
                .andExpect(status().isBadRequest());
        //THEN

    }
    @Test
    @DirtiesContext
    void getSingleVideo_ShouldReturnSingleVideo() throws Exception {
        //GIVEN
        testRepo.save(new Video("4", "test"));
                String expected= """
                        {
                        "videoId":"4",
                        "title": "test"
                        }
                        """;
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/videos/4"))
                .andExpect(status().isOk())
                .andExpect(content().json(expected));

        //THEN

    }
    @Test
    @DirtiesContext
    void getSingleVideo_ShouldReturnStatusCode_404NotFound() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/videos/4"))
                .andExpect(status().isNotFound());

        //THEN

    }

    @Test
    @DirtiesContext
    void removeSingleVideo_ShouldReturnTrue_IfVideoWasDeletedSuccessfully() throws Exception {
        //GIVEN
            testRepo.save(new Video("1", "test"));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete( "/api/videos/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
        //THEN

    }
    @Test
    @DirtiesContext
    void removeSingleVideo_ShouldReturn_StatusCode404NotFound_IfVideoIdWasNotFound() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete( "/api/videos/1"))
                .andExpect(status().isNotFound());
        //THEN
    }

    @Test
    @DirtiesContext
    void updateVideo_ShouldReturn_UpdatedVideo() throws Exception {
        //GIVEN
        testRepo.save(new Video("5q", "123"));
        String toPut = """ 
                {
                "videoId":"5q",
                "title": "test2"
                }
                """;
        content().json(toPut);
        String expectedJson = """
                {
                "videoId":"5q",
                "title": "test2"
                }
                """;
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/videos")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(toPut))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }
    @Test
    @DirtiesContext
    void updateVideo_ShouldReturnStatusCode_400BadRequest_IfUpdateVideoHasEmptyTitle() throws Exception {
        //GIVEN
        testRepo.save(new Video("5q", "123"));
        String toPost = """ 
                {
                "videoId":"5q",
                "title": ""
                }
                """;
        content().json(toPost);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/videos")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(toPost))
                .andExpect(status().isBadRequest());
        //THEN

    }
    @Test
    @DirtiesContext
    void updateVideo_ShouldReturn_StatusCode404NotFound_IfVideoIdWasNotFound() throws Exception {
        //GIVEN

        String toPost = """ 
                {
                "videoId":"5q",
                "title": "Hallo"
                }
                """;
        content().json(toPost);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put( "/api/videos")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(toPost))
                .andExpect(status().isNotFound());
        //THEN
    }
}