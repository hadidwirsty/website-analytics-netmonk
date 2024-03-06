import React from 'react';
import { useSelector } from 'react-redux';

export function LayoutWelcome() {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const teamName = userDetails ? userDetails.teamName : '';

  return (
    <div className="flex flex-col space-y-2 mb-6">
      <h1 className="font-bold text-4xl text-gunmetal-90">Welcome, {teamName}!</h1>
      <p className="text-lg font-medium text-gunmetal-80">
        This dashboard aims to monitor the progress of your project.
      </p>
    </div>
  );
}

export default LayoutWelcome;
