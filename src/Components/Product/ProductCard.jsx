import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import Styles from './Product.module.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import {Type} from '../../Utility/action.type'
const ProductCard = ({ product,flex,renderDesc,renderAdd }) => {
  const { image = '', title = 'No title available', id = '', rating = { rate: 0, count: 0 }, price = 0 , description} = product || {};
//  const {image, title, id, rating, price,description} = product
  console.log(product)
  
  //
if (!id) {
    return <div>Product data is missing or incomplete.</div>;
  } 
  //

  const [state, dispatch] = useContext(DataContext)
  

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description
      }
      })
    }







  return (
    <div className={`${Styles.card_container} ${flex?Styles.product_flexed : ''}`}>
          <Link to={`/products/${id}`}>
              <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description }</div>}
              <div className={Styles.rating}>
                  {/* Rating */}
                  <Rating value ={rating?.rate} precision={0.1}/>
                  {/* rating counter*/}
                  <small>{rating?.count}</small>
              </div>
              <div>
                  {/* price */}
                  <CurrencyFormat amount={price} />
        </div>
        
        {
          renderAdd && <button className={Styles.button} onClick={addToCart}>
                  Add to Cart
              </button>
        }

              
      </div> 
    </div>
  )
}

export default ProductCard
