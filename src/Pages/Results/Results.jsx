import React, { useEffect, useState } from 'react'
import Styles from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'
const Results = () => {
  const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
  
  const { catagoryName } = useParams()
  useEffect(() => {
        setIsLoading(true)

      axios.get(`${productUrl}/products/category/${catagoryName}`)
    .then((res) => {
      setResults(res.data)
      setIsLoading(false)
    }).catch((err)=> {
      console.log(err)
      setIsLoading(false)
  })
  }, [])
  // console.log(catagoryName)

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Catagory / {catagoryName}</p>
        <hr />
        {isLoading ? (
          <Loader/>
        ) : (
           <div className={Styles.products_container}>
          {results?.map((product) => (
            <ProductCard
              key={productUrl.id} 
              product={product}
              renderDesc={false}
              renderAdd={true}
            
            />
          ))}

        </div> 
        )}
        
    </section>
    </LayOut>
  )
}

export default Results
