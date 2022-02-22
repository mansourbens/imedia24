package com.mansour.products.controllers

import com.mansour.products.entities.Product
import com.mansour.products.services.ProductService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
@Tag(name = "products", description = "the Product API")
@RestController
class ProductController(private val productService: ProductService) {

    @GetMapping("/products")
    fun getAllProducts(): List<Product> = productService.getAllProducts()

    @GetMapping("/products/{id}")
    fun getProductsById(@PathVariable("id") productId: Long): Product =
        productService.getProductById(productId)

    @PostMapping("/products")
    fun createProduct(@RequestBody payload: Product): Product = productService.createProduct(payload)

    @PutMapping("/products/{id}")
    fun updateProductById(@PathVariable("id") productId: Long, @RequestBody payload: Product): Product =
        productService.updateProductById(productId, payload)

    @DeleteMapping("/products/{id}")
    fun deleteProductsById(@PathVariable("id") productId: Long): Unit =
        productService.deleteProductById(productId)

    @Operation(summary = "Get a list of products by category")
    @GetMapping("/products/category/{id}")
    fun getProductsByCategory(@PathVariable("id") categoryId: Long):  List<Product> =
        productService.getProductsByCategory(categoryId)
}