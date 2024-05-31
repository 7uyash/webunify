import React, { useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        if(res.data.success){
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  }


  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <div className='flex items-center justify-evenly w-[80%]'>
      <div>
      <img className='ml-5' width = {"400jpx"} src= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8C3vlPSssZnzI1npNvLX8HiF7FaMCUCfUKp8Nw1-lH2xRLs084C7Z28cicfhGhhBOUAfHiEfU4YLQbzn4u9vtADi0LHsRM3uk9Tmingpqiwu4YP0jjlnFkFx5H7WrGxml1pDeKgY4AsRtqT7jTYEDHFSQGrxc3cqMdbx-kIu-1cDZFsQKVSbkXbiHxTo/w945-h600-p-k-no-nu/httpwebunify.in%20(4).png" alt="webunify-logo" />
        
      </div>
      <div>
      <div className='my-5'>
        <h1 className=' font-bold text-5xl'>
          Let's start with us!!
        </h1>
      </div>
      <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "Singup"}</h1>
        <form  onSubmit={submitHandler} className='flex flex-col w-[55%]'>
        {
          !isLogin && (<>

          <input type='text'  value={name} onChange={(e) => setName(e.target.value)}  placeholder='Name' className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"/>
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"/>
            
          </>)
        }
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"/>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="outline-green-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"/>
          <button className='bg-[green] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin ? "Login" : "Sign-up"}</button>
        <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-green-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
        </form>
      </div>
    </div>
    
    </div>
  )
}

export default Login