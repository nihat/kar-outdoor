package com.karoutdoor;

import com.karoutdoor.entity.OrderItem;
import org.apache.commons.collections4.CollectionUtils;

import java.math.BigDecimal;
import java.util.List;

public class OrderUtils {

    public static BigDecimal calculateTotalPrice(List<OrderItem> orderItems) {
        BigDecimal totalPrice = BigDecimal.ZERO;
        if (CollectionUtils.isNotEmpty(orderItems)) {
            totalPrice = orderItems.stream().map(OrderItem::calculateTotalPrice).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);
        }
        return totalPrice;
    }


    public static Integer totalQuantity(List<OrderItem> orderItems) {
        Integer totalQuantity = 0;
        if (CollectionUtils.isNotEmpty(orderItems)) {
            totalQuantity = orderItems.stream().map(OrderItem::getQuantity).reduce(Integer::sum).orElse(0);
        }
        return totalQuantity;
    }
}
