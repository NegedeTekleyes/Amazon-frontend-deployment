import React, { useState, useContext } from 'react';
import Styles from './SignUp.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from "../../Utility/firbase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from '../../Utility/action.type';
import { ClipLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false }); // Correct initialization

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation()
  console.log(navStateData)

  const authHandler = async (e) => {
    e.preventDefault();
    const actionType = e.target.name;
    try {
      if (actionType === "signin") {
        // Firebase Sign In
        setLoading((prev) => ({ ...prev, signIn: true })); // Update only the signIn state
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading((prev) => ({ ...prev, signIn: false })); // Set signIn back to false after success
     navigate(navStateData?.state?.redirect || "/")
     
      } else if (actionType === "signup") {
        // Firebase Sign Up
        setLoading((prev) => ({ ...prev, signUp: true })); // Update only the signUp state
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading((prev) => ({ ...prev, signUp: false })); // Set signUp back to false after success
           navigate(navStateData?.state?.redirect || "/")

      
      }
    } catch (error) {
      setError(error.message); // Set error message to display in the UI
      setLoading((prev) => ({ ...prev, signIn: false, signUp: false })); // Reset both states on error
    }
  };

  return (
    <section className={Styles.login}>
      {/* logo */}
      <Link to={"/"}>
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG3.png" alt="Amazon Logo" />
      </Link>

      {/* form */}
      <div className={Styles.login_container}>
        <h1>Sign In</h1>

        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}


          </small>
        )

        }
        <form onSubmit={authHandler}> {/* Form submission handled via authHandler */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button type="submit"
            onClick={authHandler}
            name="signin"
            className={Styles.login_signInButton}
          >
            {
              loading.signIn ? (<ClipLoader color="#36d7b7" size={20} />) // Show loading spinner
                :("Sign In"
           ) }
          </button>
          
        </form>

        {/* Agreement */}
        <p>
          By signing in you agree to the AMAZON FAKE CLONE Conditions of use & Sale.
          Please see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
        </p>

        {/* Create account btn */}
        <button
          type="button"
          onClick={authHandler}
          name="signup"
          className={Styles.login__registerButton}
        >
          {
            loading.signUp ? (<ClipLoader color="#36d7b7" size={20} />) // Show loading spinner
              : ("Create your Amazon Account"
          )}
        </button>
        {
          error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        }
      </div>
    </section>
  );
};

export default Auth;
