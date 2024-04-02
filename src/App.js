import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Import necessary routing components
import Home from './components/Home'; // Import Home component
import Header from './components/Navbar'; // Import Header (Navbar) component
import Cart from './components/Cart'; // Import Cart component
import Products from './components/Products'; // Import Products component
import { Provider } from 'react-redux'; // Import Provider from React Redux for Redux store
import { store } from './Redux/store'; // Import Redux store

// Define the main App component
export default function App() {
  // Create a browser router with specified routes
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Header/>, // Header component rendered for all routes
      children: [
        { index: true, element: <Home/> }, // Home component rendered for the root path
        { path: "products", element: <Products/> }, // Products component rendered for /products path
        { path: "cart", element: <Cart/> } // Cart component rendered for /cart path
      ]
    }
  ]);

  // Return the main structure of the app
  return (
    <>
      {/* Provide Redux store to the application */}
      <Provider store={store}>
        {/* Provide router for navigation */}
        <RouterProvider router={router}/>
      </Provider>
    </>
  );
}
