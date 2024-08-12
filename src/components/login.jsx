import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function login() {
  const [users, setUsers] = useState([]);
  const [userGbox, setUserGbox] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/user-masterlist/masterlist');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // console.log(users, userGbox); 
  
    const user = users.find(user => user.email === userGbox);
    // console.log(user);
    if (user) {
      if (user.status_id === 2) {
        localStorage.setItem('id', user.id);
        navigate('/survey');
      } else {
        alert('User has already taken the survey!');
        navigate('/');
      }
    } else {
      alert('User not found!');
    }
  }

  // const handleStatusUpdate = (event) => {
  //   event.preventDefault();
  //   const user = users.find(user => user.email === userGbox);
  //   if (user) {
  //     if (user.status_id === 2) {
  //       const updatedUser = {
  //         ...user,
  //         email: user.email,
  //         status_id: 1

  //       };
  //       console.log(updatedUser);
  //       axios.put(`http://localhost:3000/user-masterlist/masterlist/${user.id}`, updatedUser);
  //       navigate('/survey');
  //     } else {
  //       alert('User has already taken the survey!');
  //       navigate('/');
  //     }
  //   } else {
  //     alert('User not found!');
  //   }
  // }

  return (
    <>
    <div className='flex justify-center items-center h-full'>
      <div className="m-10 p-2 max-w-sm bg-white border items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-10">
          <img src="../../public/ncfLogo2.png" className="h-30 block mb-2" alt="NCF Logo" />
          <form className="max-w-sm mx-auto">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
              </span>
              <input type="text" id="user-verification" value={userGbox} onChange={event => setUserGbox(event.target.value)}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Gbox Account" />
            </div>
          </form>
          {/* <div onClick={handleLogin} className="mt-5 max-w-sm mx-auto text-dark-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span>Start</span>
          </div> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default login

