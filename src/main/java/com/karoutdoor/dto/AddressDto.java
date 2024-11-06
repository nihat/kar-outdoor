package com.karoutdoor.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDto {

    private String country;
    private String city;
    private String district;
    private String street;
    private String zipCode;
}
