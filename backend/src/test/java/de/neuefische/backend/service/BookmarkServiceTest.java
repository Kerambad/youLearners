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


    @Test
    void getAllBookmarks_ShouldReturnAllBookmarks() {
        //GIVEN
        List<Bookmark> testValues = List.of(new Bookmark("1", "Test", 100), new Bookmark("1", "tseT", 1));
        when(testRepo.findAll()).thenReturn(testValues);
        //WHEN
        List<Bookmark> actual = testService.getAllBookmarks();
        //THEN
        List<Bookmark> expected = List.of(new Bookmark("1", "Test", 100), new Bookmark("1", "tseT", 1));
        assertEquals(expected, actual);
    }

    @Test
    void addNewBookmark_ShouldReturnNewBookmark_IfTimeIs0() {
        //GIVEN
        BookmarkDTO testBookmarkDTO = new BookmarkDTO("Test", 0);
        when(testIdService.createRandomId()).thenReturn("1");
        when(testRepo.save(new Bookmark("1", "Test", 0))).thenReturn(new Bookmark("1", "Test", 0));
        //WHEN
        Bookmark actual = testService.addNewBookmark(testBookmarkDTO);
        //THEN
        Bookmark expected = new Bookmark("1", "Test", 0);
        verify(testIdService).createRandomId();
        assertEquals(expected, actual);
    }

    @Test
    void addNewBookmark_ShouldThrowIllegalArgumentException_IfTimeIsLowerThen0() {
        //GIVEN
        BookmarkDTO testBookmarkDTO = new BookmarkDTO("Test", -1);
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewBookmark(testBookmarkDTO));
    }

    @Test
    void addNewBookmark_ShouldThrowIllegalArgumentException_IfNameIsEmpty() {
        //GIVEN
        BookmarkDTO testBookmarkDTO = new BookmarkDTO("", 1);
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.addNewBookmark(testBookmarkDTO));
    }

    @Test
    void updateBookmark_ShouldReturnUpdatedBookmark_IfTimeIs0() {
        //GIVEN
        BookmarkDTO testBookmarkDTO = new BookmarkDTO("Test", 0);
        when(testRepo.existsById("1")).thenReturn(true);
        when(testRepo.save(new Bookmark("1", "Test", 0))).thenReturn(new Bookmark("1", "Test", 0));
        //WHEN
        Bookmark actual = testService.updateBookmark("1", testBookmarkDTO);
        //THEN
        Bookmark expected = new Bookmark("1", "Test", 0);
        assertEquals(expected, actual);
    }
    @Test
    void updateBookmark_ShouldThrowNoSuchElementException_IfBookmarkWasNotFound() {
        //GIVEN
        String testId = "1";
        BookmarkDTO testBookmarkDTO = new BookmarkDTO("Test", 1);
        when(testRepo.existsById("1")).thenReturn(false);
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, () -> testService.updateBookmark(testId, testBookmarkDTO));
    }

    @Test
    void updateBookmark_ShouldThrowIllegalArgumentException_IfTimeIsLowerThen0() {
        //GIVEN
        BookmarkDTO testBookmarkDTO = new BookmarkDTO("Test", -1);
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateBookmark("1", testBookmarkDTO));
    }

    @Test
    void updateBookmark_ShouldThrowIllegalArgumentException_IfNameIsEmpty() {
        //GIVEN
        BookmarkDTO testBookmarkDTO = new BookmarkDTO("", 1);
        //WHEN
        //THEN
        assertThrows(IllegalArgumentException.class, () -> testService.updateBookmark("1", testBookmarkDTO));
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