package de.neuefische.backend.controller;

import de.neuefische.backend.exceptions.AlreadyExistsException;
import de.neuefische.backend.model.Video;
import de.neuefische.backend.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService videoService;

    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping
    public List<Video> getCompleteHistory() {
        return videoService.getCompleteHistory();
    }
    @PostMapping
    public Video addNewVideo (@RequestBody Video newVideo) throws AlreadyExistsException {
        return videoService.addNewVideo(newVideo);
    }
    @GetMapping("/{videoId}")
    public Video getSingleVideo(@PathVariable String videoId) {
        return videoService.getSingleVideo(videoId);
    }
    @DeleteMapping("/{videoId}")
    public Boolean removeSingleVideo(@PathVariable String videoId) {
        return videoService.removeSingleVideo(videoId);
    }

}

