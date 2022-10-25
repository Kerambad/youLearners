package de.neuefische.backend.service;

import de.neuefische.backend.exceptions.AlreadyExistsException;
import de.neuefische.backend.model.Video;
import de.neuefische.backend.repository.VideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    private final VideoRepo videoRepo;

    @Autowired
    public VideoService(VideoRepo videoRepo) {
        this.videoRepo = videoRepo;
    }

    public List<Video> getCompleteHistory() {
        return videoRepo.findAll();
    }

    public Video addNewVideo(Video newVideo) throws AlreadyExistsException {
        if(videoRepo.existsById(newVideo.getVideoId())) {
            throw new AlreadyExistsException("Video with ID exists already: " + newVideo.getVideoId());
        }
        return videoRepo.save(newVideo);
    }

    public Video getSingleVideo(String videoId) {
        return videoRepo.findById(videoId).orElseThrow();
    }
}
