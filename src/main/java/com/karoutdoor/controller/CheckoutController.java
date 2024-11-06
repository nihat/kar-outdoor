package com.karoutdoor.controller;


import com.karoutdoor.dto.OrderDto;
import com.karoutdoor.dto.Purchase;
import com.karoutdoor.response.OrderResponse;
import com.karoutdoor.response.ProductResponse;
import com.karoutdoor.response.PurchaseResponse;
import com.karoutdoor.service.CheckoutService;
import com.karoutdoor.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkout")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutService.placeOrder(purchase);
    }

    @GetMapping("/getCustomerOrders/{customerId}")
    public ResponseEntity<OrderResponse> getCustomerOrders(@PathVariable Integer customerId) {
        return ResponseEntity.ok(checkoutService.getCustomerOrders(customerId));
    }


    @GetMapping("/getOrder/{trackingNumber}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(checkoutService.retrieveOrder(trackingNumber));
    }

}
