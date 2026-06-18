package com.example.taskmanagement.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // 👈 This automatically generates getters and setters for password
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password; // 👈 Make sure this is lowercase and exactly matches the frontend
}