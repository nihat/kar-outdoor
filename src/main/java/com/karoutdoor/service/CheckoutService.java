package com.karoutdoor.service;

import com.karoutdoor.dto.OrderDto;
import com.karoutdoor.dto.Purchase;
import com.karoutdoor.entity.Address;
import com.karoutdoor.entity.Customer;
import com.karoutdoor.entity.Order;
import com.karoutdoor.entity.OrderItem;
import com.karoutdoor.mapper.AddressMapper;
import com.karoutdoor.mapper.CustomerMapper;
import com.karoutdoor.mapper.OrderItemMapper;
import com.karoutdoor.mapper.OrderMapper;
import com.karoutdoor.repository.CustomerRepository;
import com.karoutdoor.repository.OrderRepository;
import com.karoutdoor.response.OrderResponse;
import com.karoutdoor.response.PurchaseResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CheckoutService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final OrderItemMapper orderItemMapper;
    private final AddressMapper addressMapper;
    private final CustomerMapper customerMapper;
    private final OrderMapper orderMapper;

    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Integer userId = 1;
        String trackingNumber = generateTrackingNumber();

        Order order = orderMapper.torder(purchase, trackingNumber, userId);

        Customer customer = customerMapper.toCustomer(purchase.getCustomer());

        order.setOrderItems(new ArrayList<>());
        purchase.getOrderItems().forEach((item) -> {
            OrderItem orderItem = orderItemMapper.toOrderItem(item, userId);
            orderItem.setOrder(order);
            order.getOrderItems().add(orderItem);
        });

        Address shippingAddress = addressMapper.toAddress(purchase.getShippingAddress(), userId);
        Address billingAddress = addressMapper.toAddress(purchase.getBillingAddress(), userId);
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);
        order.setCustomer(customer);
        customer.addOrder(order);
        customerRepository.save(customer);

        return new PurchaseResponse(order.getTrackingNumber());
    }

    private String generateTrackingNumber() {
        //generate random UUID
        return UUID.randomUUID().toString();
    }


    public OrderResponse getCustomerOrders(Integer customerId) {
        List<Order> orderList = orderRepository.findByCustomerId(customerId);
        return OrderResponse.builder().orders(orderList).build();
    }

    public OrderDto retrieveOrder(String trackingNumber) {
        Order order = orderRepository.findByTrackingNumber(trackingNumber);
        if (order == null) {
            throw new EntityNotFoundException("Order with trackingNumber " + trackingNumber + " not found");
        }
        return orderMapper.toOrderDto(order);
    }
}
