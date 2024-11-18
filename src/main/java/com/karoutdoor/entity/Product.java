package com.karoutdoor.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product extends BaseEntity {

    private String sku;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private boolean active;
    private Integer stockCount;
    private Integer categoryId;
    private String imageUrl;
}
