package com.karoutdoor.dto;


import com.karoutdoor.entity.Order;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    private List<OrderDto> orders;

    public void addOrder(OrderDto order) {
        if (orders == null) {
            setOrders(new ArrayList<>());
        }
        orders.add(order);
    }
}
