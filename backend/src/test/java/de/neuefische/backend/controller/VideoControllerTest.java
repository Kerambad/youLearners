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
        //GIVE
        testRepo.saveAll(List.of(new Video("1"), new Video("3")));
        String expectedJson = """
                [
                {
                "videoId":"1"
                },
                {
                "videoId":"3"
                }
                ]
                """;
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/videos")).andExpect(status().isOk()).andExpect(content().json(expectedJson));
        //THEN

    }

    @Test
    @DirtiesContext
    void addNewVideo_ShouldReturnAddedVideo() throws Exception {
        //GIVEN
        String toPost = """ 
                "5q"
                """;
        content().json(toPost);
        String expectedJson = """
                {
                "videoId":"5q"
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
        testRepo.save(new Video("5q"));
        String toPost = """ 
                "5q"
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
    void getSingleVideo_ShouldReturnSingleVideo() throws Exception {
        //GIVEN
        testRepo.save(new Video("4"));
                String expected= """
                        {
                        "videoId":"4"
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
}