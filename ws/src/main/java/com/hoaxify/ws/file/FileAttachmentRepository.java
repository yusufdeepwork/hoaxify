package com.hoaxify.ws.file;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long>{

    List<FileAttachment> findByDateBeforeAndHoaxIsNull(Date date);
}