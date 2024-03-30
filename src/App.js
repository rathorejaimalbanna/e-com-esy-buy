import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

export default function App() {
  const router = createBrowserRouter([
    {
      path:"home",element:"nav",children:[
        {
          index:true,element:"home"},
        {path:"/products",element:"products"},
        {path:"/cart",element:"cart"},
        {path:"/signin",element:"login"}
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
