package de.neuefische.backend.controller;

import de.neuefische.backend.model.Bookmark;
import de.neuefische.backend.repository.BookmarkRepo;
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
class BookmarkControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private BookmarkRepo testRepo;
    @MockBean
    IdService testIdService;

    Bookmark validTestBookmark = new Bookmark("1", "2w", "2", 5);
    String validDtoJson = """
            {
            "dedicatedVideoId": "2w",
            "name": "2",
            "time": 5
            }
            """;
    String validJsonExpected = """
            {
            "bookmarkId":"1",
            "dedicatedVideoId": "2w",
            "name": "2",
            "time": 5
            }
            """;
    String invalidTimeDtoJson = """
            {
            "dedicatedVideoId": "2w",
            "name": "2",
            "time": -1
            }
            """;
    String invalidNameDtoJson = """
            {
            "dedicatedVideoId": "2w",
            "name": "",
            "time": 1
            }
            """;
    String invalidVideoIdDtoJson = """
            {
            "dedicatedVideoId": "",
            "name": "test",
            "time": 1
            }
            """;

    @Test
    @DirtiesContext
    void getAllBookmarks_ShouldReturnAllBookmarks() throws Exception {
        //GIVEN
        List<Bookmark> testValues = List.of(validTestBookmark, new Bookmark("2", "5w", "3", 10));
        testRepo.saveAll(testValues);
        String expectedJson = """
                [
                {
                "bookmarkId":"1",
                "dedicatedVideoId": "2w",
                "name": "2",
                "time": 5
                },
                {
                "bookmarkId":"2",
                "dedicatedVideoId": "5w",
                "name": "3",
                "time": 10
                }
                ]
                """;
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/bookmarks"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

    @Test
    @DirtiesContext
    void addNewBookmark_ShouldReturnAddedBookmark() throws Exception {
        //GIVEN
        content().json(validDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");

        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookmarks")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(validDtoJson))
                .andExpect(status().isOk())
                .andExpect(content().json(validJsonExpected));
    }

    @Test
    @DirtiesContext
    void addNewBookmark_ShouldReturnStatusCode400BadRequest_IfAddedBookmarkHasInvalidTime() throws Exception {
        //GIVEN
        content().json(invalidTimeDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookmarks")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidTimeDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Time can't be lower then 0"));
    }
    @Test
    @DirtiesContext
    void addNewBookmark_ShouldReturnStatusCode400BadRequest_IfNameIsEmpty() throws Exception {
        //GIVEN
        content().json(invalidNameDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookmarks")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidNameDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Name can't be empty"));
    }
    @Test
    @DirtiesContext
    void addNewBookmark_ShouldReturnStatusCode400BadRequest_IfVideoIdIsEmpty() throws Exception {
        //GIVEN
        content().json(invalidVideoIdDtoJson);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/bookmarks")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidVideoIdDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("VideoId can't be empty"));
    }
    @Test
    @DirtiesContext
    void updateBookmark_ShouldReturnUpdatedBookmark() throws Exception {
        //GIVEN
        testRepo.save(validTestBookmark);
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/bookmarks/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(validDtoJson))
                .andExpect(status().isOk())
                .andExpect(content().json(validJsonExpected));
    }

    @Test
    @DirtiesContext
    void updateBookmark_ShouldReturnStatusCode400BadRequest_IfNameIsEmpty() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/bookmarks/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidNameDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Name can't be empty"));
    }

    @Test
    @DirtiesContext
    void updateBookmark_ShouldReturnStatusCode400BadRequest_IfAddedBookmarkHasInvalidTime() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/bookmarks/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidTimeDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Time can't be lower then 0"));
    }
    @Test
    @DirtiesContext
    void updateBookmark_ShouldReturnStatusCode400BadRequest_IfAddedBookmarkHasInvalidVideoId() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/bookmarks/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(invalidVideoIdDtoJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("VideoId can't be empty"));
    }
    @Test
    @DirtiesContext
    void updateBookmark_ShouldReturnStatusCode404NotFound_IfIdDoesNotExist() throws Exception {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/bookmarks/" + id)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(validDtoJson))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Bookmark Id Not Found: 1"));
    }

    @Test
    @DirtiesContext
    void removeBookmark_ShouldReturnTrue_IfIdWasDeletedSuccessfully() throws Exception {
        //GIVEN
        testRepo.save(validTestBookmark);
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/bookmarks/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
        //THEN
    }

    @Test
    @DirtiesContext
    void removeBookmark_ShouldReturn_StatusCode404NotFound_IfVideoIdWasNotFound() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/bookmarks/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Bookmark Id Not Found: 1"));
        //THEN
    }
}