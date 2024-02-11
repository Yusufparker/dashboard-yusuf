import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_BASE_URL from "../utils/api"
import { useEffect } from "react"





const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] =  useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')









  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
          email : username,
          password : password,
        }
      );
      // console.log(response)
      localStorage.setItem('token', response.data)
      const userResponse = await axios.get(`${API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${response.data}`,
        },
      });
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      navigate('/')
    } catch (error) {
      console.log('username atau password salah');
      setError('Username Atau Password Tidak Valid!')
    }
  };


  return (
    <>
      <h1 className="text-center fw-bold mt-5 text-primary mb-3">
        LOGIN
      </h1>
      <form
        onSubmit={handleLogin}
        className="login-form p-5  col-md-4 m-auto border rounded bg-white shadow fs-14"
      >

        {
          error && 
          <div className="alert mb-2 mb-4 fs-12 alert-danger alert-dismissible fade show" role="alert">
            {error}
          </div>

        }
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="email"
            className="form-control fs-12"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            value={username}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control fs-12"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-primary fs-14 w-100 mt-3 text-white"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login
