import React,{useEffect} from 'react'
import Leftsidebar from './Leftsidebar'
import Feed from './Feed';
import RightSidebar from './Rightsidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetProfile from '../hooks/useGetProfile';
import useOtherUsers from '../hooks/useOtherUsers';
import useGetMyTweets from '../hooks/useGetMyTweets';



const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);
  // custom Hook
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  return (
    <div className='flex justify-between w-[80%] mx-auto' >
        <Leftsidebar/>
        <Outlet/>
        <RightSidebar otherUsers={otherUsers} />
        

    </div>
  )
}

export default Home