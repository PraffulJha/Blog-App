import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home"
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Write from './pages/Write';
import "./css/styles.scss"
const Layout = () => {
  return(
  <>
  <Navbar />
  <Outlet />
  <Footer />
  </>
  ) 
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/post.:id",
        element: <Single />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: "/",
        element: <Home />
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

const App = () => {
  return (
    <div>
      <div className='app'>
        <div className='container'>
          <RouterProvider router={router}/>
        </div>
      </div>
    </div>
  )
}



export default App