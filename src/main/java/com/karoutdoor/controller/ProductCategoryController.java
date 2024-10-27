package com.karoutdoor.controller;

import com.karoutdoor.service.ProductCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("product-categories")
@AllArgsConstructor
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;
}
