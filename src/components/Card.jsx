import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "../App.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/cartReducer';
import { deleteProductAsync } from '../Redux/productReducer';

// ProductCard component renders a card displaying product information
function ProductCard(props) {
  const dispatch = useDispatch();

  // Function to add item to cart
  function addCartItem() {
    props.addCart(props.item);
  };

  // Function to remove item from cart
  function removeCartItem(){
    toast.success("Item removed from cart")
    dispatch(cartActions.removeCart(props.item.name));
  };

  // Function to handle deleting product
  function handleDelete(){
    toast.warn(`${props.item.name} removed from products`)
    dispatch(deleteProductAsync(props.item.name));
  };

  // Function to handle editing product
  function handleEdit(){
    props.handleShow(props.item);
  }

  return (
    <Card className={styles.cardsDiv}>
      {/* Render product image */}
      <Card.Img variant="top" src={props.item.image} className={styles.cardImage} alt='product image'/>
      <Card.Body>
        {/* Render product name */}
        <Card.Title className={styles.cardTextTitle}>{props.item.name}</Card.Title>
        {/* Render product description (placeholder) */}
        {<Card.Text className={styles.cardText}>
          {props.type === "cart"? `qty :${props.item.quantity}` : "Perfect buy for you"}
        </Card.Text>}
        <Card.Text className={styles.cardText}>
        &#8377; {props.item.price}
        </Card.Text>
        {/* Render button for adding/removing from cart */}
        {props.type === "product" && <Button className={styles.cardButton} variant="primary" onClick={()=>{addCartItem()}}>
          Add To Cart
        </Button>}
        {props.type === "cart" && <Button className={styles.cardButton} variant="primary" onClick={()=>{removeCartItem()}}>
          Remove From Cart
        </Button>}
        {props.type === "edit" && <Button className={styles.cardButton} variant="" onClick={handleDelete}>
          <img src="./images/delete.png" alt="" className={styles.icons}/>
        </Button>}
        {props.type === "edit" && <Button className={styles.cardButton} variant="" onClick={handleEdit}>
          <img src="./images/edit.png" alt="" className={styles.icons} />
        </Button>}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
