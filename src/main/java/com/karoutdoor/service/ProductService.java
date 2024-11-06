package com.karoutdoor.service;


import com.karoutdoor.mapper.ProductMapper;
import com.karoutdoor.response.ProductResponse;
import com.karoutdoor.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;


    public ProductResponse getProductById(Long id) {
        return productRepository.findById(id).map(productMapper::toProductResponse).orElseThrow(() -> new EntityNotFoundException("Book not found by id " + id));
    }

}
