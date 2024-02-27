import React from "react";
import { useState } from "react";
import Login from "./Login";

const Auth = ({ setIsLoggedIn, setBusinessID, setToken }) => {
    const [authFunction, setAuthFunction] = useState('login');

    return(
        authFunction ? (
            <Login setIsLoggedIn={setIsLoggedIn} setBusinessID={setBusinessID} setToken={setToken}/>
        ) :(
            <div>register</div>
        )
        
    )
}

export default Auth;