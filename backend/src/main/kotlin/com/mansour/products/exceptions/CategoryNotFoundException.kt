package com.mansour.products.exceptions

import org.springframework.http.HttpStatus

class CategoryNotFoundException(val statusCode: HttpStatus, val reason: String) : Exception()
