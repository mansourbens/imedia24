package com.mansour.products.repositories;
import com.mansour.products.entities.Category
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
interface CategoryRepository : JpaRepository<Category, Long>