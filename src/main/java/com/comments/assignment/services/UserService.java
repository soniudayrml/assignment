package com.comments.assignment.services;

import com.comments.assignment.models.User;
import com.comments.assignment.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public boolean isUserNameExists(String userName)
    {
        try {
            User user = userRepository.findByUserName(userName).get();
            return true;
        }
        catch (NoSuchElementException e) {
            return false;
        }
    }
    public void saving(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
