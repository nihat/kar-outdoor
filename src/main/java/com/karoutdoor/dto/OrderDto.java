package com.karoutdoor.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class OrderDto {


    private String trackingNumber;
    private BigDecimal totalPrice;
    private Integer totalQuantity;
    private AddressDto shippingAddress;
    private AddressDto billingAddress;

    private List<OrderItemDto> orderItems;

}
