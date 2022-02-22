package com.mansour.products.repositories

import com.mansour.products.entities.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : JpaRepository<Product, Long> {
    fun findProductsByCategoryId(categoryId: Long) : List<Product>
}

