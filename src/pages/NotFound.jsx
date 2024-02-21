import React from 'react';

const NotFound = () => {
  return (
    <div className="fixed w-full h-full flex items-center justify-center bg-white">
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg p-8">
        <p className="text-lg font-semibold mb-2">404 - Page Not Found</p>
        <p className="text-sm">The page you are looking for does not exist. Please check the URL or navigate to a different page.</p>
      </div>
    </div>
  );
};

export default NotFound;
