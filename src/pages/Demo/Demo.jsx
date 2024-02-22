import React from "react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/v/test");
    };

    return (
        <div>
            <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-4 shadow-xl">
                <div className="flex items-center justify-between flex-wrap">
                    <button onClick={handleButtonClick}>Demo</button>
                </div>
            </nav>
        </div>
    );
};

export default Demo;
