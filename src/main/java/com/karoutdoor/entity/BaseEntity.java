package com.karoutdoor.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@MappedSuperclass
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {


    @Id
    @Generated
    @GeneratedValue
    private Long id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDate createdDate;

    @CreatedDate
    @Column(nullable = false, insertable = false)
    private LocalDate updateDate;

    @CreatedBy
    @Column(nullable = false , updatable = false)
    private Integer createUser;

    @LastModifiedBy
    @Column(insertable = false)
    private Integer updateUser;
}