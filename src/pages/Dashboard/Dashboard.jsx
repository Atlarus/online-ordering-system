import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Auth from "../Auth/Auth";

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
    const [businessID, setBusinessID] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const verifyToken = async () => {
        const token = localStorage.getItem('token');

        if (token){
            try{
                const verification = await axios.post('http://localhost:5000/verify_token', {
                    token: token
                })
    
                if (verification.data.error){
                    setIsVerified(false);
                } else {
                    setIsVerified(true);
                }
            } catch (error) {
                console.error('Error during verification:', error);
            }
        }
    }

    useEffect(() => {
        verifyToken();
    }, [token]);
    
    return (
        <>
            {isVerified === true ? (
                <div>
                    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 shadow-xl flex items-center justify-between space-x-4">
                        <div className="flex items-center justify-between flex-1">
                            <Link to={`/Dashboard`} className="text-white hover:text-gray-300">
                                Dashboard
                            </Link>
                            <Link to={`/v/${businessID}`} className="text-white hover:text-gray-300">
                                View
                            </Link>
                        </div>
                        <button>Log Out</button>
                    </nav>
                </div>
            ) : (
                <div>
                    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 shadow-xl">
                        <div className="flex items-center justify-between">
                            <Link to={`/Dashboard`} className="text-white hover:text-gray-300">
                                Dashboard
                            </Link>
                        </div>
                    </nav>
                    <Auth setIsLoggedIn={setIsLoggedIn} setBusinessID={setBusinessID} setToken={setToken}/>
                </div>)}
        </>
    )
}

export default Dashboard;