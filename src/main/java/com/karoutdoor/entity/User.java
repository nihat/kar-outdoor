package com.karoutdoor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {


    @Id
    @Generated
    @GeneratedValue
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

}
