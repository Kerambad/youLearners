package de.neuefische.backend.service;

import de.neuefische.backend.model.Bookmark;
import de.neuefische.backend.model.BookmarkDTO;
import de.neuefische.backend.repository.BookmarkRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookmarkServiceTest {

    private final BookmarkRepo testRepo = mock(BookmarkRepo.class);
    private final IdService testIdService = mock(IdService.class);
    private final BookmarkService testService = new BookmarkService(testRepo, testIdService);

    //TestValues
    Bookmark testBookmark1 = new Bookmark("1", "q1", "Test", 0);
    BookmarkDTO testBookmark1DTO = new BookmarkDTO("q1", "Test", 0);
    Bookmark expectedTestBookmark1 = new Bookmark("1", "q1", "Test", 0);

    Bookmark testBookmark2 = new Bookmark("1", "q2", "tseT", 1);
    Bookmark expectedTestBookmark2 = new Bookmark("1", "q2", "tseT", 1);

    BookmarkDTO invalidTimeBookmarkDTO = new BookmarkDTO("1","Test", -1);
    BookmarkDTO invalidNameBookmarkDTO = new BookmarkDTO("1","", 1);
    BookmarkDTO invalidVideoIdBookmarkDTO = new BookmarkDTO("","Test", 1);

    @Test
    void getAllBookmarks_ShouldReturnAllBookmarks() {
        //GIVEN
        List<Bookmark> testValues = List.of(testBookmark1,testBookmark2);
        when(testRepo.findAll()).thenReturn(testValues);
        //WHEN
        List<Bookmark> actual = testService.getAllBookmarks();
        //THEN
        List<Bookmark> expected = List.of(expectedTestBookmark1,expectedTestBookmark2);
        assertEquals(expected, actual);
    }

    @Test
    void addNewBookmark_ShouldReturnNewBookmark_IfTimeIs0() {
        //GIVEN
        when(testIdService.createRandomId()).thenReturn("1");
        when(testRepo.save(testBookmark1)).thenReturn(testBookmark1);
        //WHEN
        Bookmark actual = testService.addNewBookmark(testBookmark1DTO);
        //THEN
        verify(testIdService).createRandomId();
        assertEquals(expectedTestBookmark1, actual);
    }

    @Test
    void addNewBookmark_ShouldThrowIllegalArgumentException_IfTimeIsLowerThen0() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewBookmark(invalidTimeBookmarkDTO));
    }

    @Test
    void addNewBookmark_ShouldThrowIllegalArgumentException_IfNameIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewBookmark(invalidNameBookmarkDTO));
    }
    @Test
    void addNewBookmark_ShouldThrowIllegalArgumentException_IfVideoIdIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewBookmark(invalidVideoIdBookmarkDTO));
    }

    @Test
    void updateBookmark_ShouldReturnUpdatedBookmark_IfTimeIs0() {
        //GIVEN
        when(testRepo.existsById("1")).thenReturn(true);
        when(testRepo.save(testBookmark1)).thenReturn(testBookmark1);
        //WHEN
        Bookmark actual = testService.updateBookmark("1", testBookmark1DTO);
        //THEN
        assertEquals(expectedTestBookmark1, actual);
    }

    @Test
    void updateBookmark_ShouldThrowNoSuchElementException_IfBookmarkWasNotFound() {
        //GIVEN
        String testId = "1";
        when(testRepo.existsById("1")).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, () -> testService.updateBookmark(testId, testBookmark1DTO));
    }

    @Test
    void updateBookmark_ShouldThrowIllegalArgumentException_IfTimeIsLowerThen0() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateBookmark("1", invalidTimeBookmarkDTO));
    }

    @Test
    void updateBookmark_ShouldThrowIllegalArgumentException_IfNameIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateBookmark("1", invalidNameBookmarkDTO));
    }
    @Test
    void updateBookmark_ShouldThrowIllegalArgumentException_IfVideoIdIsEmpty() {
        //GIVEN
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateBookmark("1", invalidVideoIdBookmarkDTO));
    }

    @Test
    void removeBookmark_ShouldReturnTrue_IfBookmarkWasDeleted() {
        //GIVEN
        String testId = "1";
        when(testRepo.existsById("1")).thenReturn(true);
        //WHEN
        Boolean expected = testService.removeBookmark(testId);
        //THEN
        assertTrue(expected);
    }

    @Test
    void removeBookmark_ShouldThrowNoSuchElementException_IfBookmarkWasNotFound() {
        //GIVEN
        String testId = "1";
        when(testRepo.existsById("1")).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, () -> testService.removeBookmark(testId));
    }
}