import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import { GrLogout } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { Link,useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

  const Leftsidebar = () => {

    const {user} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <div>
        <div className='flex items-center w-[%]'>
          <img className='ml-5'width = {"70px"} src= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8C3vlPSssZnzI1npNvLX8HiF7FaMCUCfUKp8Nw1-lH2xRLs084C7Z28cicfhGhhBOUAfHiEfU4YLQbzn4u9vtADi0LHsRM3uk9Tmingpqiwu4YP0jjlnFkFx5H7WrGxml1pDeKgY4AsRtqT7jTYEDHFSQGrxc3cqMdbx-kIu-1cDZFsQKVSbkXbiHxTo/w945-h600-p-k-no-nu/httpwebunify.in%20(4).png" alt="webunify-logo" />
        <div>
          <h1 text lg className='font-bold'>WebUnify</h1>
        </div>
        </div>
        <div className='my-2'>
          <Link to="/" className='flex items-center my- px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
            <IoHomeSharp/>
            </div>
            <h1 className='font-bold text-lg ml-2'>Home</h1>
          </Link>
        </div>

        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full '>
          <div>
          <FaSearch/>
          </div>
          <h1 className='font-bold text-lg ml-2'>Search</h1>
        </div>
        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
          <div>
          <PiGithubLogoFill/>
          </div>
          <h1 className='font-bold text-lg ml-2'>Blog</h1>
        </div>
        <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
          <div>
          <FaUser/>
          </div>
          <h1 className='font-bold text-lg ml-2'>Profile</h1>
        </Link>
        <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
          <div>
          <GrLogout/>
          </div>
          <h1 className='font-bold text-lg ml-2'>Log out</h1>
        </div>
        <button className='px-4 py-2 border-none text-md bg-[Green] w-full rounded-full text-white font-bold'>Post</button>
      </div>
    </div>
  )
}

export default Leftsidebar