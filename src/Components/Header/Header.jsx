import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import { SlLocationPin } from 'react-icons/sl'
import { BiCart } from "react-icons/bi";


import styles from './Header.module.css'
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firbase';
const Header = () => {

  const [{user,basket = []},dispatch] = useContext(DataContext)
  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  },0)
  // console.log(basket?.length)
  
  
  return (

    <section className={styles.fixed}>
      <section>
        <div className={styles.header_container}>
          {/* logo */}
          <div className={styles.logo_container}>
            <Link to="/">
              <img
                src="../../src/assets/logo.png"
                alt="EthioShop logo"
              />
            </Link>
            <div className={styles.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* Search */}

          <div className={styles.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>

            <input type="text" />
            <FaSearch size={38} />
          </div>
          {/* icon */}

          {/* right side link */}
         
            <div className={styles.order_container}>
                          <Link to="" className={styles.language}>
                              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/180px-Flag_of_Ethiopia.svg.png"
                alt=""
              />
              <select name='' id=''>
                <option value="">ETH</option>
              </select>
              </Link>
           
            {/* Three component */}
            <Link to={!user && "/auth"}>
              <div>

                {
                  user ? (
                    <>
                      <p>Hello{user?.email?.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sign Out</span>
 
                    </>

                  ) : (
                      <>
                        <p>Hello, Sign In</p>
                <span>Account & Lists</span>

                        </>

                  )
                }
              </div>
              
            </Link>
            {/* Order */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to='/cart' className={styles.cart}>
              {/* icon */}
              <BiCart size={35} />

              <span>{totalItem}</span>
            </Link>
           </div>
        </div>
          </section>
          <LowerHeader/>
    </section>
  )
}

export default Header