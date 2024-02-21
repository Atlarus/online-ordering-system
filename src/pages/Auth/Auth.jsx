import React from "react";
import Login from "./Login";

const Auth = (setIsLoggedIn) => {
    return(
        <Login setIsLoggedIn={setIsLoggedIn}/>
    )
}

export default Auth;