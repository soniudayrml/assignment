package com.comments.assignment.responses;

import com.comments.assignment.models.Comments;

import java.util.List;

public class UserComments {
    private List<Comments> comments;

    public UserComments() {
    }

    public UserComments(List<Comments> comments) {
        this.comments = comments;
    }

    public List<Comments> getComments() {
        return comments;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
    }
}
