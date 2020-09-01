package com.hoaxify.ws.hoax;

import com.hoaxify.ws.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {

    @Autowired
    HoaxService hoaxService;

    @PostMapping("/hoaxes")
    GenericResponse saveHoax(@Valid @RequestBody Hoax hoax){
        hoaxService.save(hoax);
        return new GenericResponse("Hoax is saved");
    }
    @GetMapping("/hoaxes")
    Page<Hoax> getHoaxes (@PageableDefault(sort="id",direction = Sort.Direction.DESC) Pageable page){
        return hoaxService.getHoaxes(page);
    }
}
