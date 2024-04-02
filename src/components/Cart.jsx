import React from 'react'
import { useSelector } from 'react-redux'
import { cartSelectors } from '../Redux/cartReducer'
import ProductCard from './Card'
import styles from "../App.module.css"

export default function Cart() {
  const {cartItems} = useSelector(cartSelectors);
  console.log(cartItems)
  return (
    <div>
      {/* Render ProductCard for each product */}
      <h2 className={styles.productsHeading}>Cart Items </h2>
      <div className={styles.outerCardDiv}>
      {cartItems.map((item, id) => 
        <ProductCard key={id} item={item} type="cart"/>
      )}
      </div>
    </div>
  )
}
