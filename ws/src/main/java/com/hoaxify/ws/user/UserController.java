package com.hoaxify.ws.user;



import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.shared.Views;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;


@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@Valid @RequestBody User user){
        userService.save(user);
        return  new GenericResponse("user created");
    }
    @GetMapping("/api/1.0/users")
    @JsonView(Views.Base.class)
    List<User> getUsers(){
        return userService.getUsers();
    }

}
