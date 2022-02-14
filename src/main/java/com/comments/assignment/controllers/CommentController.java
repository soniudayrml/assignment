package com.comments.assignment.controllers;

import com.comments.assignment.models.Comments;
import com.comments.assignment.models.User;
import com.comments.assignment.repositories.CommentRepository;
import com.comments.assignment.repositories.UserRepository;
import com.comments.assignment.responses.AllComments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;


        @RequestMapping(value="/comments/user/{id}/comment",method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createComment(@Valid @RequestBody Comments comment,@PathVariable Long id)
    {
        Optional<User> user= userRepository.findById(id);
        comment.setUser(user.get());
        commentRepository.save(comment);
        return new ResponseEntity<>("Comment registered successfully", HttpStatus.OK);

    }
    @RequestMapping(value="/comments",method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllComments()
    {
        List<AllComments> comments=new ArrayList<>();
        List<Comments> commentsList=commentRepository.findAll();
        for(int i=0;i<commentsList.size();i++)
        {
            AllComments comments1=new AllComments();
            comments1.setId(commentsList.get(i).getId());
            comments1.setComment(commentsList.get(i).getComment());
            comments1.setUserName(commentsList.get(i).getUser().getUserName());
            comments.add(comments1);
        }

        return new ResponseEntity<>(comments, HttpStatus.OK);

    }
    @RequestMapping(value="/comments/{id}",method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllCommentsofUser(@PathVariable Long id)
    {
        List<Comments> commentsList=commentRepository.findAllByUserId(id);

        return new ResponseEntity<>(commentsList, HttpStatus.OK);

    }
    @RequestMapping(value="/commentsd",method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllCommentsofUserChecking()
    {
//        List<Comments> commentsList=commentRepository.findAllByUserId(id);
        Optional<Comments> comment=commentRepository.findById(1L);
        System.out.println(comment.get().getUser().getUserName());
        return new ResponseEntity<>(comment, HttpStatus.OK);

    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return errors;
    }


}
