package de.neuefische.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {

    public String createRandomId() {
        return UUID.randomUUID().toString();
    }
}
