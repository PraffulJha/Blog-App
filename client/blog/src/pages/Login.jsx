import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [inputs,setInputs] = useState({
    username: "",
    password: "",
  })
  const handleChange = e => {
    setInputs(prev =>({...prev,[e.target.name]: e.target.value}))
  }
  const navigate = useNavigate()
  const [error,setError] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault()
    try{
      const res = await axios.post("/auth/login")
      navigate("/")
      console.log(res);
    }
    catch(err)
    {
      setError(err.response.data);
    }
  }
  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input type="text" placeholder='username' name='username' onChange={handleChange} />
            <input type="password" placeholder='password' name='password' onChange={handleChange} />
            <button onSubmit={handleSubmit}>Login</button>
            {error && <p>{error}</p>}
            <span> Don't have an account? <Link to ="/register">Register</Link> </span>
        </form>

    </div>
  )
}

export default Login