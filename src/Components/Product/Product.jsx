import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import Styles from './Product.module.css'
import Loader from '../Loader/Loader'
const Product = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        axios.get('https://fakestoreapi.com/products') 
            .then((res) => {
                // console.log(res)
              setProducts(res.data) 
              setIsLoading(false)
            })
            .catch((err) => {
              console.log(err)
              setIsLoading(false)
        })
       }, [])
  return (
    <>
      {
        isLoading ? (<Loader />) : (
           <section className={Styles.products_container}>
          {
              products?.map((singleProduct) => {
                return <ProductCard renderAdd={true} product={singleProduct}  key={singleProduct.id}/>
              })
      }
    </section>
        )
      }
     
    </>
  )
}

export default Product
