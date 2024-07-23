import {
    createBrowserRouter,
    RouterProvider
  } from 'react-router-dom';
import App from './App';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Survey from './components/survey';
import Login from './components/login';
import Notfound from './components/notfound';
import Questions from './components/questions';

  const routers = createBrowserRouter([
  
    {
      path: '/',
      element: <App/>,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/survey/",
          element: <Survey />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/question",
      element: <Questions />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
    
  ])
export default routers;