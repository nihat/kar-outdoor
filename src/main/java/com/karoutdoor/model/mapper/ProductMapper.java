package com.karoutdoor.model.mapper;

import com.karoutdoor.entity.Product;
import com.karoutdoor.model.response.ProductResponse;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {

    public ProductResponse toProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .active(product.isActive())
                .description(product.getDescription())
                .categoryId(product.getCategoryId())
                .stockCount(product.getStockCount())
                .imageUrl(product.getImageUrl())
                .build();
    }

}
