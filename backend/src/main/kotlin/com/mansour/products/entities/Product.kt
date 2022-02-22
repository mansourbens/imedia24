package com.mansour.products.entities

import org.hibernate.annotations.Cascade
import javax.persistence.*

@Entity
@Table(name = "PRODUCT")
data class Product (

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        @Column(name = "label", unique = true, nullable = false)
        val label: String,
        @Column(name = "description")
        val description: String,
        @ManyToOne
        @JoinColumn(name = "category", nullable = false)
        var category: Category,
        @Column(name = "price", nullable = false)
        val price: Double,
    )