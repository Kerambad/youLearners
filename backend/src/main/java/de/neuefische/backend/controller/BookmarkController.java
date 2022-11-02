package de.neuefische.backend.controller;

import de.neuefische.backend.model.Bookmark;
import de.neuefische.backend.model.BookmarkDTO;
import de.neuefische.backend.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {
    private final BookmarkService bookmarkService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    public List<Bookmark> getAllBookmarks() {
        return bookmarkService.getAllBookmarks();
    }
    @PostMapping
    public Bookmark addNewBookmark(@RequestBody BookmarkDTO newBookmark) {
        return bookmarkService.addNewBookmark(newBookmark);
    }
    @PutMapping("/{id}")
    public Bookmark updateBookmark(@PathVariable String id, @RequestBody BookmarkDTO newBookmark) {
        return bookmarkService.updateBookmark(id, newBookmark);
    }
    @DeleteMapping("/{id}")
    public Boolean removeBookmark(@PathVariable String id) {
        return bookmarkService.removeBookmark(id);
    }
}
