package com.karoutdoor.model.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductResponse {

    private Long id;
    private String sku;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private boolean active;
    private Integer stockCount;
    private Integer categoryId;
    private String imageUrl;
}
