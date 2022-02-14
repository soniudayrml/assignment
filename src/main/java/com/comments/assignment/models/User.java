package com.comments.assignment.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
@Table(name = "user")
public class User {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;

    @Column(
            name = "username",
            nullable = false,
            unique = true
    )
    @Email(message = "Email should be valid")
    @NotBlank
    private String userName;

    @Column(
            name = "password",
            nullable = false
    )
    @NotBlank(message = "Password cannot be blank")
    private String password;

    @Column(
            name = "secret_code",
            nullable = false
    )
    @NotBlank(message = "Secret Code cannot be Empty")
    private String secretCode;

    @Column(
            name = "active"
    )
    private boolean active;

    @Column(
            name = "roles"
    )
    private String roles;
    @OneToMany(mappedBy = "user", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
            CascadeType.REFRESH })
    private List<Comments> comments;



}
