package com.comments.assignment.responses;

public class AllComments {
    private Long id;
    private String comment;
    private String userName;

    public AllComments() {
    }

    public AllComments(Long id, String comment, String userName) {
        this.id = id;
        this.comment = comment;
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
