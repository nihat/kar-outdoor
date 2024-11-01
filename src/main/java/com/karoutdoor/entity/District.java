package com.karoutdoor.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class District {

    @Id
    @Generated
    @GeneratedValue
    private Long id;

    private String name;
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

}
