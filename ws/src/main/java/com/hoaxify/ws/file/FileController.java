package com.hoaxify.ws.file;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;

@RestController
public class FileController {


    @Autowired
    FileService fileService;


    @PostMapping("/api/1.0/hoax-attachments")
    FileAttachment saveHoaxAttachment(MultipartFile file) {
        return fileService.saveHoaxAttachment(file);
    }

}
