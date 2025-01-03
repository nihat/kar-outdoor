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
public class Country {


    @Id
    @Generated
    @GeneratedValue
    private Integer id;

    private String name;
    private String nameLower;
    private String countryCode;
    private String iso3;
    private String numCode;
    private String phoneCode;
    private Boolean active;
    private Integer order;

    @JsonIgnore
    @OneToMany(mappedBy = "country")
    private List<City> cities;


    public Country(Integer id){
        this.id = id;
    }



}
