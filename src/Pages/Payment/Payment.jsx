import React, { useContext, useState } from "react";
import Styles from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { CircleLoader } from "react-spinners";
import { db } from "../../Utility/firbase";
import { doc, setDoc, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true)
      // 1. Contact the backend to get the client secret
      const response = await axiosInstance.post(`/payment/create?total=${total*100}`);
      const { clientSecret } = response.data;

      // 2. Confirm payment using Stripe
      const payment_intent = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payment_intent.error) {
        setCardError(payment_intent.error.message);
      } else if (payment_intent.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", payment_intent.paymentIntent);

  // 3. Save order details and clear basket (backend/database logic needed)
       
       
      //  try {
      //    await db
      //     .collection("users")
      //     .doc(user.uid)
      //     .collection("orders")
      //     .doc(paymentIntent.paymentIntent.id)
      //     .set({
      //       basket: basket,
      //       amount: paymentIntent.paymentIntent.amount,
      //       created: paymentIntent.paymentIntent.created,
      //     })
      //    console.log("Order successfully saved to Firestore")
      //  } catch (error) {
      //    console.error("Failed to save order", error)
        
        //  }
        // In Firebase v9+ (modular SDK), instead of calling methods like db.collection(), you need to use the modular syntax like collection(db, 'collectionName')
        
        await setDoc(
  doc(collection(db, 'users', user.uid, 'orders'), payment_intent.paymentIntent.id),
  {
    basket: basket,
    amount: payment_intent.paymentIntent.amount,
    created: payment_intent.paymentIntent.created,
  }
        );
        //  empty the basket
dispatch({type:Type.EMPTY_BASKET})
        
       
        setProcessing(false)
        navigate("/orders", { state: { msg: "You have placed new Order" } })
        // alert("Payment successful!");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setProcessing(false)
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={Styles.Payment_header}>Checkout ({totalItem}) items</div>

      {/* Payment Form */}
      <section className={Styles.Payment}>
        {/* Address Section */}
        <div className={Styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>Nman Shopping Center</div>
            <div>DebreBirhan, SH</div>
          </div>
        </div>
        <hr />

        {/* Products Section */}
        <div className={Styles.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Card Form */}
        <div className={Styles.flex}>
          <h3>Payment Methods</h3>
          <div className={Styles.payment_card_container}>
            <div className={Styles.payment__details}>
              <form onSubmit={handlePayment}>
                {/* Card Error */}
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}

                {/* Card Input */}
                <CardElement onChange={handleChange} />

                {/* Payment Info */}
                <div className={Styles.Payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">


                    {
                      processing ? (
                        <div className={Styles.loading}>
                          <CircleLoader color="#369ee9" size={12}/>
                          
                          <p>Please Wait....</p>
                      </div>
                        
                      ):("PayNow")
                    }
                    
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
