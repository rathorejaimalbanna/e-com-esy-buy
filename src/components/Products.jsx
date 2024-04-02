import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import {  productSelectors } from '../Redux/productReducer'
import ProductCard from './Card'
import styles from "../App.module.css"
import UpdateModal from './Modal'

export default function Products() {
  const {products}  = useSelector(productSelectors)
  const [show,setShow] =  useState(false); // State to manage modal visibility
  const [modalData,setModalData] = useState({name:"",city:"",email:"",phone:""});

  function handleClose(){
    setShow(false)
  };
  function handleShow(item){
    setModalData(item)
    setShow(true)
  }
  return (
    <div>
      {show && <div className={styles.modalContainer}>
        <div className={styles.modalDiv}>
          <UpdateModal handleClose={handleClose} modalData={modalData} />
        </div></div>}
      {/* Render ProductCard for each product */}
      <h2 className={styles.productsHeading}>Edit your Products </h2>
      <div className={styles.outerCardDiv}>
      {products.map((item, id) => 
        <ProductCard key={id} item={item} type="edit" handleShow={handleShow}/>
      )}
      </div>
    </div>
  )
}
