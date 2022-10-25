package de.neuefische.backend.repository;

import de.neuefische.backend.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepo extends MongoRepository<Video,String> {
}
