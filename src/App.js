import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Navbar'
import Cart from './components/Cart'
import Products from './components/Products'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
export default function App() {
  const router = createBrowserRouter([
    {
      path:"/",element:<Header/>,children:[
        {
          index:true,element:<Home/>},
        {path:"products",element:<Products/>},
        {path:"cart",element:<Cart/>}
      ]
    }
  ])
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </>
  )
}



// https://docs.google.com/document/d/11b-MXagrJlvd_dQzGHH4jWj_gwu_JV5QNNHq0KPOIAE/edit?usp=sharing