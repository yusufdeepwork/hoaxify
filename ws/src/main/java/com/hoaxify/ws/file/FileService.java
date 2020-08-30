package com.hoaxify.ws.file;


import com.hoaxify.ws.configuration.AppConfiguration;
import org.apache.tika.Tika;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;


@Service
public class FileService {

    AppConfiguration appConfiguration;
    Tika tika ;

    public FileService(AppConfiguration appConfiguration, Tika tika) {
        super();
        this.appConfiguration = appConfiguration;
        this.tika = tika;
    }

    public String writeBase64EncodedStringToFile(String image) throws IOException{
        String fileName =  generateRandomName();
        File target =  new File(appConfiguration.getUploadPath()+"/"+fileName);
        OutputStream outputStream = new FileOutputStream(target);
        byte [] base64Encoded = Base64.getDecoder().decode(image);
        outputStream.write(base64Encoded);
        outputStream.close();
        return fileName;
    }

    public String generateRandomName() {
    return UUID.randomUUID().toString().replaceAll("-","");
    }


    public void deleteFile(String oldImageName) {
        if(oldImageName == null){
            return;
        }
        try {
            Files.deleteIfExists(Paths.get(appConfiguration.getUploadPath(),oldImageName));
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    public String dedectType(String value) {
        byte [] base64ByteEncoded = Base64.getDecoder().decode(value);
        return tika.detect(base64ByteEncoded);
    }
}

