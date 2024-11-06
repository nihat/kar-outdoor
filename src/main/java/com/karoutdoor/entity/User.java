package com.karoutdoor.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {


    @Id
    @Generated
    @GeneratedValue
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Boolean active;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDate createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDate updateDate;

    @DateTimeFormat
    private LocalDate lastLoginDate;

    @OneToMany(mappedBy = "user")
    private List<Address> addresses;

}
