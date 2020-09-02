package com.hoaxify.ws.hoax;

import com.hoaxify.ws.hoax.vm.HoaxVM;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;
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
    GenericResponse saveHoax(@Valid @RequestBody Hoax hoax ,@CurrentUser User user){
        hoaxService.save(hoax,user);

        return new GenericResponse("Hoax is saved");
    }
    @GetMapping("/hoaxes")
    Page<HoaxVM> getHoaxes (@PageableDefault(sort="id",direction = Sort.Direction.DESC) Pageable page){
        return hoaxService.getHoaxes(page).map(HoaxVM::new);
    }
    @GetMapping("/users/{username}/hoaxes")
    Page<HoaxVM> getUserHoaxes(@PathVariable String username,@PageableDefault(sort="id",direction = Sort.Direction.DESC) Pageable page){
        return hoaxService.getHoaxesOfUser(username,page).map(HoaxVM::new);
    }
}
