package de.neuefische.backend.service;

import de.neuefische.backend.model.Bookmark;
import de.neuefische.backend.model.BookmarkDTO;
import de.neuefische.backend.repository.BookmarkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookmarkService {
    private final BookmarkRepo bookmarkRepo;

    private final IdService idService;

    @Autowired
    public BookmarkService(BookmarkRepo bookmarkRepo, IdService idService) {
        this.bookmarkRepo = bookmarkRepo;
        this.idService = idService;
    }


    public List<Bookmark> getAllBookmarks() {
        return bookmarkRepo.findAll();
    }

    public Bookmark addNewBookmark(BookmarkDTO newBookmark) {
        checkIfNameAndTimeIsValid(newBookmark);
        Bookmark newBookmarkWithId = new Bookmark(
            idService.createRandomId(),
                newBookmark.getDedicatedVideoId(),
                newBookmark.getName(),
                newBookmark.getTime()
        );
        return bookmarkRepo.save(newBookmarkWithId);
    }

    public Bookmark updateBookmark(String id, BookmarkDTO newBookmark) {
        checkIfNameAndTimeIsValid(newBookmark);
        if(!bookmarkRepo.existsById(id)) {
            throw new NoSuchElementException("Bookmark Id Not Found: " + id);
        }
        Bookmark updatedBookmark = new Bookmark(
                id,
                newBookmark.getDedicatedVideoId(),
                newBookmark.getName(),
                newBookmark.getTime()
                );
        return bookmarkRepo.save(updatedBookmark);
    }

    public Boolean removeBookmark(String id) {
        if(!bookmarkRepo.existsById(id)) {
            throw new NoSuchElementException("Bookmark Id Not Found: " + id);
        }
        bookmarkRepo.deleteById(id);
        return true;
    }

    private void checkIfNameAndTimeIsValid(BookmarkDTO newBookmark) {
        if(newBookmark.getTime() < 0) {
            throw new IllegalArgumentException("Time can't be lower then 0");
        }
        if(newBookmark.getName().isEmpty()) {
            throw new IllegalArgumentException("Name can't be empty");
        }
        if(newBookmark.getDedicatedVideoId().isEmpty()) {
            throw new IllegalArgumentException("VideoId can't be empty");
        }
    }
}
