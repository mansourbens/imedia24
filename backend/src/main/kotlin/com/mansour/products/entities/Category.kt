package com.mansour.products.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "CATEGORY")
data class Category (

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    @Column(name = "label", unique = true, nullable = false)
    val label: String,
    @OneToMany(mappedBy = "category", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    val products: List<Product>?
)