package com.comments.assignment.controllers;

import com.comments.assignment.jwt.JwtToken;
import com.comments.assignment.models.User;
import com.comments.assignment.repositories.UserRepository;
import com.comments.assignment.requests.AuthenticationRequest;
import com.comments.assignment.requests.ForgotPasswordRequest;
import com.comments.assignment.responses.LoginResponse;
import com.comments.assignment.services.MyUserDetailsService;
import com.comments.assignment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin
@RestController
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtToken jwtToken;

    @Autowired
    private MyUserDetailsService userDetailsService;


    @RequestMapping({ "/hello" })
    public String firstPage() {
        return "Hello World";
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(), authenticationRequest.getPassword()));
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUserName());


        String token = jwtToken.generateToken(userDetails);
        User user=userRepository.findByUserName(userDetails.getUsername()).get();
        LoginResponse response=new LoginResponse();
        response.setId(user.getId());
        response.setToken(token);

        return ResponseEntity.ok(response);
    }
    @RequestMapping(value = "/forgot", method = RequestMethod.POST)
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
//        if(userService.isUserNameExists(forgotPasswordRequest.getUserName())) {
            System.out.println("Exists");

            Optional<User> user = userRepository.findByUserName(forgotPasswordRequest.getUserName());
        System.out.println(user.get().getSecretCode());
        System.out.println(forgotPasswordRequest.getSecretCode());
            if (user.get().getSecretCode().equals(forgotPasswordRequest.getSecretCode())) {
                System.out.println("Correct");

                return ResponseEntity.ok(user.get().getPassword());
            }
            else {
                System.out.println("Here it is failing");
                return new ResponseEntity<>("Please Enter Correct Details", HttpStatus.BAD_REQUEST);
            }
//        }
//        else {
//            return new ResponseEntity<>("Please Enter Correct Details", HttpStatus.BAD_REQUEST);
//        }

    }
}
