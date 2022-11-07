package de.neuefische.backend.repository;

import de.neuefische.backend.model.Bookmark;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepo extends MongoRepository<Bookmark,String> {
}
