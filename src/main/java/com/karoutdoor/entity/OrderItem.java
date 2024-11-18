package com.karoutdoor.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class OrderItem extends BaseEntity {

    private Integer quantity;
    private BigDecimal unitPrice;
    private String imageUrl;
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;



    public BigDecimal calculateTotalPrice(){
        return unitPrice.multiply(new BigDecimal(quantity));
    }


}
