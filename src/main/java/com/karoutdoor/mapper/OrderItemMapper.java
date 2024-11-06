package com.karoutdoor.mapper;

import com.karoutdoor.dto.OrderDto;
import com.karoutdoor.dto.OrderItemDto;
import com.karoutdoor.entity.OrderItem;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderItemMapper {


    public OrderItem toOrderItem(OrderItemDto item, Integer userId) {
        return OrderItem.builder()
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .imageUrl(item.getImageUrl())
                .productId(item.getProductId())
                .createUser(userId)
                .createdDate(LocalDateTime.now())
                .build();
    }

    public OrderItemDto toOrderItemDto(OrderItem item) {
        return OrderItemDto.builder()
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .imageUrl(item.getImageUrl())
                .productId(item.getProductId())
                .build();
    }
}
