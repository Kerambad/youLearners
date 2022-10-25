package de.neuefische.backend.service;

import de.neuefische.backend.exceptions.AlreadyExistsException;
import de.neuefische.backend.model.Video;
import de.neuefische.backend.repository.VideoRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class VideoServiceTest {

    private final VideoRepo testRepo = mock(VideoRepo.class);
    private final VideoService testService = new VideoService(testRepo);

    @Test
    void getCompleteHistory_ShouldReturnListOfVideos() {
        //GIVEN
        when(testRepo.findAll()).thenReturn(List.of(new Video("1"),
                new Video("2")));
        //WHEN
        List<Video> actual = testService.getCompleteHistory();
        //THEN
        List<Video> expected = List.of(new Video("1"),
                new Video("2"));
        assertEquals(expected,actual);
    }

    @Test
    void addNewVideo_ShouldReturnSuccessfullyAddedVideo() throws AlreadyExistsException {
        //GIVEN
                when(testRepo.save(any())).thenReturn(new Video("1"));
        //WHEN
                Video actual = testService.addNewVideo(new Video("1"));
        //THEN
                Video expected = new Video("1");
                assertEquals(expected, actual);
    }
    @Test
    void addNewVideo_ShouldThrowAlreadyExistsException() {
        //GIVEN
        when(testRepo.existsById(any())).thenReturn(true);
        //WHEN
        //THEN
        assertThrows(AlreadyExistsException.class, () -> testService.addNewVideo(new Video("2")));
    }

    @Test
    void getSingleVideo_ShouldReturnVideo() {
        //GIVEN
            when(testRepo.findById(any())).thenReturn(Optional.of(new Video("4")));
        //WHEN
            Video actual = testService.getSingleVideo("4");
        //THEN
            Video expected = new Video("4");
            assertEquals(expected, actual);
    }
    @Test
    void getSingleVideo_ShouldThrow_NoSuchElementException() {
        //GIVEN
        when(testRepo.findById(any())).thenReturn(Optional.empty());
        //WHEN
        assertThrows(NoSuchElementException.class, () -> testService.getSingleVideo("4"));
        //THEN

    }
}