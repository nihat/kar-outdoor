package com.karoutdoor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @OneToMany(mappedBy = "city")
    private List<District> districts;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;


    public City(Integer id){
        this.id = id;
    }
}
