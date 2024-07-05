import React from 'react';
import Note from '../../components/UserNote';
import jwtDecode from 'jwt-decode';

function WelcomeBanner() {
  const token = localStorage.getItem('authTokens');
  const first_name = token ? jwtDecode(token).first_name : '';

  return (
    <div className="relative bg-indigo-200 dark:bg-indigo-800 p-4 sm:p-6 rounded-full overflow-hidden mb-8">
      {/* Content */}
      <div dir="rtl" className="relative flex items-center">
        <h2 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1 flex items-center">
          <Note />
          <span className="ml-2">{first_name}</span>
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
