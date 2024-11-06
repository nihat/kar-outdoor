package com.karoutdoor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Integer id;

    private String name;
    private Boolean active;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    public District(Integer id) {
        this.id = id;
    }
}
