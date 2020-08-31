package com.hoaxify.ws.hoax;

import com.hoaxify.ws.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HoaxController {


    @Autowired
    HoaxService hoaxService;

    @PostMapping("/api/1.0/hoaxes")
    GenericResponse saveHoax(@RequestBody Hoax hoax){
        hoaxService.save(hoax);
        return new GenericResponse("Hoax is saved");
    }
}
