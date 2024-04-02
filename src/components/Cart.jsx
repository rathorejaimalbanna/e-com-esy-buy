import React from 'react'
import { useSelector } from 'react-redux'
import { cartSelectors } from '../Redux/cartReducer'
import ProductCard from './Card' // Assuming './Card' is the correct import path
import styles from "../App.module.css"

export default function Cart() {
  // Selecting cart items from Redux store
  const {cartItems} = useSelector(cartSelectors);
  
  return (
    <div>
      {/* Render ProductCard for each product */}
      <h2 className={styles.productsHeading}>Cart Items </h2>
      <div className={styles.outerCardDiv}>
        {/* Mapping through cart items and rendering ProductCard component */}
        {cartItems.map((item, id) => 
          <ProductCard key={id} item={item} type="cart"/>
        )}
      </div>
    </div>
  )
}
