import React from "react";
import { Link } from 'react-router-dom';

const Dashboard = (loggedIn) => {
    const businessID = 'test';

    return(
        <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 shadow-xl">
        <div className="flex items-center justify-between">
            <Link to={`/Dashboard`} className="text-white hover:text-gray-300">
              Dashboard
            </Link>
            <Link to={`/v/${businessID}`} className="text-white hover:text-gray-300">
              View
            </Link>
        </div>
      </nav>
    )
}

export default Dashboard;