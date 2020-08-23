package com.hoaxify.ws.auth;


import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;
import com.hoaxify.ws.user.vm.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
public class AuthController{

    @Autowired
    UserRepository userRepository;


    @PostMapping("/api/1.0/auth")
    UserVM handleAuthentication(@CurrentUser User user){
       return new UserVM(user);
    }


}
