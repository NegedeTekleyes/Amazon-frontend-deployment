import React, { useContext } from 'react';
import Styles from './Cart.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";



const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={Styles.container}>
        <div className={Styles.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket.map((item) => (
              <section className={Styles.cart_product}
              key={item.id}>
                <ProductCard
                  
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={Styles.btn_container}>
                  <button className={Styles.btn} onClick={() => increment(item)}>
                    <IoIosArrowUp size={25}/>
                  </button>
                  <span>{item.amount}</span>
                  <button className={Styles.btn} onClick={() => decrement(item.id)}>
                    <IoIosArrowDown size={25} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={Styles.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <label>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </label>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;
