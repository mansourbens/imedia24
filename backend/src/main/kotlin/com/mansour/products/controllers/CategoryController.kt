package com.mansour.products.controllers

import com.mansour.products.entities.Category
import com.mansour.products.services.CategoryService
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*

@Tag(name = "categories", description = "the Categories API")
@RestController
class CategoryController(private val categoryService: CategoryService) {

    @GetMapping("/categories")
    fun getAllCategorys(): List<Category> = categoryService.getAllCategories()

    @GetMapping("/categories/{id}")
    fun getCategorysById(@PathVariable("id") categoryId: Long): Category =
        categoryService.getCategoryById(categoryId)

    @PostMapping("/categories")
    fun createCategory(@RequestBody payload: Category): Category = categoryService.createCategory(payload)

    @PutMapping("/categories/{id}")
    fun updateCategoryById(@PathVariable("id") categoryId: Long, @RequestBody payload: Category): Category =
        categoryService.updateCategoryById(categoryId, payload)


    @DeleteMapping("/categories/{id}")
    fun deleteCategory(@PathVariable("id") categoryId: Long): Unit =
        categoryService.deleteCategoryById(categoryId)
}