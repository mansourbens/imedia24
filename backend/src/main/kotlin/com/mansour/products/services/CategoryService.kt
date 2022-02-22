package com.mansour.products.services

import com.mansour.products.entities.Category
import com.mansour.products.exceptions.CategoryNotFoundException
import com.mansour.products.repositories.CategoryRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

@Service
class CategoryService(private val categoryRepository: CategoryRepository) {

    fun getAllCategories(): List<Category> = categoryRepository.findAll()

    fun getCategoryById(productId: Long): Category = categoryRepository.findById(productId)
        .orElseThrow { CategoryNotFoundException(HttpStatus.NOT_FOUND, "No matching category was found") }

    fun createCategory(category: Category): Category = categoryRepository.save(category)

    fun updateCategoryById(categoryId: Long, category: Category): Category {
        return if (categoryRepository.existsById(categoryId)) {
            categoryRepository.save(
                Category(
                    id = category.id,
                    label = category.label,
                    products = categoryRepository.getById(categoryId).products
                )
            )
        } else throw CategoryNotFoundException(HttpStatus.NOT_FOUND, "No matching category was found")
    }

    fun deleteCategoryById(productId: Long) {
        return if (categoryRepository.existsById(productId)) {
            categoryRepository.deleteById(productId)
        } else throw CategoryNotFoundException(HttpStatus.NOT_FOUND, "No matching category was found")
    }
}