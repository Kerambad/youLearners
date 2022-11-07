package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("sections")
public class Section {

    @Id
    private String markId;

    private String dedicatedVideoId;
    private String name;
    private String time;
    private String endTime;
}
