package com.karoutdoor.dto;

import com.karoutdoor.entity.OrderItem;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemDto {

    private Integer quantity;
    private BigDecimal unitPrice;
    private String imageUrl;
    private Long productId;

}
