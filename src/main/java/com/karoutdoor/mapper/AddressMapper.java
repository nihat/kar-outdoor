package com.karoutdoor.mapper;

import com.karoutdoor.dto.AddressDto;
import com.karoutdoor.entity.Address;
import com.karoutdoor.entity.City;
import com.karoutdoor.entity.Country;
import com.karoutdoor.entity.District;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AddressMapper {


    public Address toAddress(AddressDto addressDto, Integer userId) {
        return Address.builder()
                .country(new Country(Integer.valueOf(addressDto.getCountry())))
                .city(new City(Integer.valueOf(addressDto.getCity())))
                .district(new District(Integer.valueOf(addressDto.getDistrict())))
                .street(addressDto.getStreet())
                .zipCode(addressDto.getZipCode())
                .createdDate(LocalDateTime.now())
                .createUser(userId)
                .build();
    }

    public AddressDto toAddressDto(Address address) {
        return AddressDto.builder()
                .country(address.getCountry().getId().toString())
                .city(address.getCity().getId().toString())
                .district(address.getDistrict().getId().toString())
                .street(address.getStreet())
                .zipCode(address.getZipCode())
                .build();
    }
}
