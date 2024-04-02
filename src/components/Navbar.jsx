import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom";
import styles from "../App.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { cartSelectors } from "../Redux/cartReducer";

// Header component renders the navigation bar
function Header() {
  const {cartItems} = useSelector(cartSelectors);
  var num = cartItems.length; // Getting the number of items in the cart
  console.log(num); // Logging the number of items in the cart
  return (
    <>
      {/* Render navigation bar */}
      <div className={styles.navbar}>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand
              href="/"
              style={{ color: "rgb(88, 144, 234)", fontWeight: "700" }}
            >
              <img
                src="./images/fastShop.jpg"
                alt=""
                className={styles.fastIcons}
              />{" "}
              Esy Buy
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <div
                  style={{
                    display: "flex",
                    width: "80vw",
                    justifyContent: "space-around",
                  }}
                >
                  {/* Render search bar */}
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.search}
                  />
                  <div
                    className={styles.iconsDiv}
                  >
                    {/* Render home link */}
                    <Link to="/" className={styles.link}>
                      <img
                        src="./images/home.png"
                        alt=""
                        className={styles.icons}
                      />{" "}
                      Home
                    </Link>
                    {/* Render cart link */}
                    <Link to="/cart" className={styles.link}>
                      <img
                        src="./images/trolley.png"
                        alt=""
                        className={styles.icons}
                      />{" "}
                      Cart <button className={styles.countButton}>{num}</button>
                    </Link>
                    {/* Render products link */}
                    <Link to="/products" className={styles.link}>
                      <img
                        src="./images/product.png"
                        alt=""
                        className={styles.icons}
                      />{" "}
                      Products
                    </Link>
                    {/* Render user link */}
                      <Link to="/" className={styles.link}>
                        {" "}
                        <img
                          src="./images/user.png"
                          alt=""
                          className={styles.icons}
                          style={{ marginRight: "3px" }}
                        />
                        User
                      </Link>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* Render outlet */}
      <Outlet />
    </>
  );
}

export default Header;
