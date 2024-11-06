package com.karoutdoor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Purchase {

    private CustomerDto customer;
    private AddressDto shippingAddress;
    private AddressDto billingAddress;

    private List<OrderItemDto> orderItems;
    private CreditCard creditCard;

    private BigDecimal totalPrice;
    private Integer totalQuantity;
}
