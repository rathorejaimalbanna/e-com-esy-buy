import React, { useEffect } from 'react'
import { productActions, productAsync, productSelectors } from '../Redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './Card';
import styles from "../App.module.css";
import ControlledCarousel from './carousel/carousel';
import { cartActions, cartSelectors } from '../Redux/cartReducer';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function Home() {
  const {products} = useSelector(productSelectors);
  const {cartItems} = useSelector(cartSelectors);
  console.log(cartItems);
  const dispatch = useDispatch();

  // State to manage data for modal
  useEffect(() => {
    // Fetch contacts from API when component mounts
    if (!products.length > 0) {
      dispatch(productAsync('https://my-json-server.typicode.com/rathorejaimalbanna/jsonapi/products'));
    }
  }, [dispatch, products.length]); 

  // Function to add item to cart
  function addCart(item) {
    const isPresent = cartItems.find((cartItem) => cartItem.name === item.name);
    if (isPresent) {
      toast.success("Item quantity increased");
      dispatch(cartActions.updateCart(item.name));
    } else {
      toast.success("Item added to cart");
      const  cartItem = {name:item.name, price:item.price, image:item.image, quantity:1};
      dispatch(cartActions.addCart(cartItem));
    }
  };

  // Function to sort products by price
  function sortProducts() {
    dispatch(productActions.sortProducts());
  }

  // Render loading message if product data is not available
  if (products.length === 0) {
    return (<><h2>Loading.....</h2></>);
  }

  return (
    <>
    <div className={styles.container}>
      {/* Render search bar with carousel */}
      <div className={styles.searchBar}>
        <ControlledCarousel />
      </div>
      <div >
        <button className={styles.sortButton} onClick={sortProducts}><img src="./images/sort.png" className={styles.sortImg} alt="" /> Short BY Price</button>
      </div>
      {/* Render ProductCard for each product */}
      <div className={styles.outerCardDiv}>
      {products.map((item, id) => 
        <ProductCard key={id} item={item} addCart={addCart} type="product"/>
      )}
      </div>
    </div>
    </>
  );
}
