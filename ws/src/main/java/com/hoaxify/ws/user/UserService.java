package com.hoaxify.ws.user;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {


    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void save(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Page<UserProjection> getUsers(Pageable page) {
        return userRepository.getAllUsersProjection(page);
    }
}
