import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useSelector,useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"

const Profile = () => {
  const { user, profile } = useSelector(store => store.user);
  const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();

  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
      <div>
      <div className='flex items-center py-2'>
      <Link to="/" className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
      <IoMdArrowBack size="24px"/>
      </Link>
      <div className='ml-2'>
        <h1 className='font-bold text-lg'>{profile?.name}</h1>
        <p className='text-gray-500 text-sm'>10 post</p>
      </div>
      </div>
        <img src= "https://pbs.twimg.com/profile_banners/1566463268/1470764371/1080x360" alt='banner'/>
      </div>
      <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
      <Avatar src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci80MzIxZDU3YzU3NGRlNmJiNWI5NmVmNTI1Y2VmZDNkZT9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.4qjiIRT50TOEUAbyNqDD_2XXgQN0AqhxY4itvehXzsY" size="120" round={true} />
            </div>
            <div className='text-right m-4'>
            {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

                        ) : (
                            <button className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                    </div>
            <div className='m-4'>
              <h1 className='font-bold text-xl'>{profile?.name}</h1>
              <p>{`@${profile?.username}`}</p>
            </div>
    </div>
  )
}

export default Profile