import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div>
            <Link to={'/'}>
              <img src="../../public/ncfLogo1.png" className="h-12" alt="NCF Logo" />
            </Link>
          </div>
          <div>
            <span className='font-bold'>College of Computer Studies</span>
          </div>
          <div>
            <div className="inline-flex items-center p-2 w-20 h-10 justify-center text-sm text-dark-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" id="navbar-default">
              <Link to={'/dashboard'}>
                <span>Dashboard</span>
              </Link>
            </div>
            <div className="inline-flex items-center p-2 w-20 h-10 justify-center text-sm text-dark-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" id="navbar-default">
              <Link to={'/login'}>
                <span>Survey</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Header;
