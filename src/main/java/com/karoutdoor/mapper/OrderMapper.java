package com.karoutdoor.mapper;

import com.karoutdoor.dto.OrderDto;
import com.karoutdoor.dto.OrderItemDto;
import com.karoutdoor.dto.Purchase;
import com.karoutdoor.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderMapper {

    private final AddressMapper addressMapper;
    private final OrderItemMapper orderItemMapper;

    public Order torder(Purchase purchase, String trackingNumber, Integer userId) {
        return Order.builder()
                .trackingNumber(trackingNumber)
                .totalPrice(purchase.getTotalPrice())
                .totalQuantity(purchase.getTotalQuantity())
                .createUser(userId)
                .createdDate(LocalDateTime.now())
                .build();

    }


    public OrderDto toOrderDto(Order order) {
        List<OrderItemDto> orderItemDtos = new ArrayList<>();
        order.getOrderItems().forEach(orderItem -> orderItemDtos.add(orderItemMapper.toOrderItemDto(orderItem)));
        return OrderDto.builder()
                .trackingNumber(order.getTrackingNumber())
                .totalPrice(order.getTotalPrice())
                .totalQuantity(order.getTotalQuantity())
                .billingAddress(addressMapper.toAddressDto(order.getBillingAddress()))
                .shippingAddress(addressMapper.toAddressDto(order.getShippingAddress()))
                .orderItems(orderItemDtos)
                .build();
    }
}
