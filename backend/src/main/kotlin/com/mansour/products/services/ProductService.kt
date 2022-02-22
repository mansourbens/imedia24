package com.mansour.products.services

import com.mansour.products.entities.Product
import com.mansour.products.exceptions.CategoryNotFoundException
import com.mansour.products.exceptions.ProductNotFoundException
import com.mansour.products.repositories.CategoryRepository
import com.mansour.products.repositories.ProductRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository,
                     private val categoryRepository: CategoryRepository) {

    fun getAllProducts(): List<Product> = productRepository.findAll()

    fun getProductById(productId: Long): Product = productRepository.findById(productId)
        .orElseThrow { ProductNotFoundException(HttpStatus.NOT_FOUND, "No matching product was found") }

    fun createProduct(product: Product): Product {
        println(product.category.id);
        println(product.label);
        return if (categoryRepository.existsById(product.category.id)) {
            product.category =  categoryRepository.getById(product.category.id);
            productRepository.save(product)
        } else throw CategoryNotFoundException(HttpStatus.NOT_FOUND, "No matching category was found")
    }

    fun updateProductById(productId: Long, product: Product): Product {
        return if (productRepository.existsById(productId) && categoryRepository.existsById(product.category.id)) {
            productRepository.save(
                Product(
                    id = product.id,
                    label = product.label,
                    description = product.description,
                    price = product.price,
                    category = categoryRepository.getById(product.category.id)
                )
            )
        } else throw ProductNotFoundException(HttpStatus.NOT_FOUND, "No matching product was found")
    }

    fun deleteProductById(productId: Long) {
        return if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId)
        } else throw ProductNotFoundException(HttpStatus.NOT_FOUND, "No matching product was found")
    }

    fun getProductsByCategory(categoryId: Long): List<Product> {
        return if (categoryRepository.existsById(categoryId)) {
             productRepository.findProductsByCategoryId(categoryId)
        } else throw CategoryNotFoundException(HttpStatus.NOT_FOUND, "No matching category was found")
    }
}