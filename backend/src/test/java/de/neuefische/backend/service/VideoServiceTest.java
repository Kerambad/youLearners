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


    Video testVideo1 = new Video("1", "test");
    Video testVideo2 = new Video("2", "test2");
    Video testVideo1Expected = new Video("1", "test");
    Video testVideo2Expected = new Video("2", "test2");

    @Test
    void getCompleteHistory_ShouldReturnListOfVideos() {
        //GIVEN
        when(testRepo.findAll()).thenReturn(List.of(testVideo1, testVideo2));
        //WHEN
        List<Video> actual = testService.getCompleteHistory();
        //THEN
        List<Video> expected = List.of(testVideo1Expected,
                testVideo2Expected);
        assertEquals(expected, actual);
    }

    @Test
    void addNewVideo_ShouldReturnSuccessfullyAddedVideo() throws AlreadyExistsException {
        //GIVEN
        when(testRepo.save(any())).thenReturn(testVideo1);
        //WHEN
        Video actual = testService.addNewVideo(testVideo1);
        //THEN
        Video expected = testVideo1Expected;
        assertEquals(expected, actual);
    }

    @Test
    void addNewVideo_ShouldThrowAlreadyExistsException() {
        //GIVEN
        when(testRepo.existsById(any())).thenReturn(true);
        //WHEN
        //THEN
        assertThrows(AlreadyExistsException.class, () -> testService.addNewVideo(testVideo1));
    }

    @Test
    void addNewVideo_ShouldThrowIllegalArgumentException() {
        //GIVEN
        when(testRepo.existsById(any())).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewVideo(new Video("","test")));
    }

    @Test
    void getSingleVideo_ShouldReturnVideo() {
        //GIVEN
        when(testRepo.findById(any())).thenReturn(Optional.of(testVideo1));
        //WHEN
        Video actual = testService.getSingleVideo("1");
        //THEN
        Video expected = testVideo1Expected;
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
    @Test
    void removeSingleVideo_ShouldReturnTrue_IfVideoWasDeleted() {
        //GIVEN
        when(testRepo.existsById("1")).thenReturn(true);
        //WHEN
        Boolean actual = testService.removeSingleVideo("1");
        //THEN
        assertTrue(actual);

    }
    @Test
    void removeSingleVideo_ShouldThrowNoSuchElementException_IfVideoIdWasNotFound() {
        //GIVEN
        when(testRepo.existsById("1")).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, () -> testService.removeSingleVideo("1"));

    }

    @Test
    void updateVideo_ShouldReturnSuccessfullyUpdatedVideo() {
        //GIVEN
        when(testRepo.existsById("1")).thenReturn(true);
        when(testRepo.save(any())).thenReturn(testVideo1);
        //WHEN
        Video actual = testService.updateVideo(testVideo1);
        //THEN
        assertEquals(testVideo1Expected, actual);
    }
    @Test
    void updateVideo_ShouldThrowIllegalArgumentException() {
        //GIVEN
       Video testVideo = new Video("1","");
       when(testRepo.existsById("1")).thenReturn(true);
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateVideo(testVideo));
    }
    @Test
    void updateVideo_ShouldThrowNoSuchElementException_IfVideoIdWasNotFound() {
        //GIVEN
        when(testRepo.existsById("1")).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, () -> testService.updateVideo(testVideo1));

    }
}