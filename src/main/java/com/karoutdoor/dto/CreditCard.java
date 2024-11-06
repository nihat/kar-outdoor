package com.karoutdoor.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreditCard {

    private String nameOnCard;
    private String cardNumber;
    private String expirationMonth;
    private String expirationYear;
    private String securityCode;
}
