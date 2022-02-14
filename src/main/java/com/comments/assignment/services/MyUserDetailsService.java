package com.comments.assignment.services;

import com.comments.assignment.MyUserDetails;
import com.comments.assignment.models.User;
import com.comments.assignment.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> user=userRepository.findByUserName(s);
        user.orElseThrow(()->new UsernameNotFoundException("User Not Found"));

        return user.map(MyUserDetails::new).get();
    }
}
