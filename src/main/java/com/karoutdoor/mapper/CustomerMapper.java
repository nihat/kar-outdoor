package com.karoutdoor.mapper;


import com.karoutdoor.dto.CustomerDto;
import com.karoutdoor.entity.Customer;
import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {


    public Customer toCustomer(CustomerDto customer) {
        return Customer.builder()
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .phone(customer.getPhone())
                .email(customer.getEmail()).build();
    }
}
