import React, { useContext, useState, useEffect } from 'react'
import Styles from './Orders.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { db } from '../../Utility/firbase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { collection, query,orderBy, onSnapshot } from 'firebase/firestore'
import ProductCard from '../../Components/Product/ProductCard'
const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext)
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
    if (user) {
      // Reference to the user's orders collection
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      
      // Create a query to order the orders by "created" in descending order
      const q = query(ordersRef, orderBy("created", "desc"));

      // Set up the onSnapshot listener for real-time updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData); // Set the orders in state
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    } else {
      setOrders([])
    }
  }, [user]);
  return (
    <LayOut>
    <section className={Styles.container}>
        <div className={Styles.orders__container}>
          <h2>Your Orders</h2>
          {/* If there are no orders, display a message */}
          {orders.length === 0 && <p style={{padding: "20px"}}>No orders yet.</p>}
          {/* Ordered items */}
          <div>{
            orders?.map((eachOrder,i) => {
              

              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {
                    eachOrder?.basket?.map(order => {
                      return (
                        <ProductCard
                        flex={true}
                        product={order}
                     key={order.id}
                   />
                   )
                    })
                  }
                </div>
              )
                
            
             
              
            })
          }</div>

          
      </div>
      </section>
      </LayOut>
  )
}

export default Orders
