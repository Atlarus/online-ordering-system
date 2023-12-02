import React from 'react';
import { useParams } from 'react-router-dom';
import database from '../database';

const BusinessDetails = () => {
  const { businessName } = useParams();
  const business = database.businesses.find(business => business.BusinessName === businessName);

  if (!business) {
    return <div>Business not found</div>;
  }

  // Now you can use the 'business' object to display data for the specific business

  return (
    <div>
      <h2>{business.BusinessName}</h2>
      {/* Render other business-related data */}
    </div>
  );
};

export default BusinessDetails;
