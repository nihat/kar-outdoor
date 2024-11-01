package com.karoutdoor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class City {

    @Id
    @Generated
    @GeneratedValue
    private Integer id;

    private String name;
    private String cityCode;
    private Boolean active;

    @OneToMany(mappedBy = "city")
    private List<District> districts;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
}
