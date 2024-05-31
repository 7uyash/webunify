import React, { useState } from 'react';
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';
import { FaFileImage } from "react-icons/fa";


const CreatePost = () => {
    const [description, setDescription] = useState("");
    const { user } = useSelector(store => store.user);
    const {isActive} = useSelector(store=>store.tweet);
    const dispatch = useDispatch();
    const submitHandler = async () => {

        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setDescription("");
    }

    const forYouHandler = () => {
         dispatch(getIsActive(true));
    }
    const followingHandler = () => {
        
        dispatch(getIsActive(false));
    }
  return (
    <div className='w-[100%]'>
    <div className='m-3'>
        <div className='flex items-center justify-evenly border-b border-gray-200'>
                    <div className='border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center'>
                        <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                    </div>
                    
                </div>

                <div>
                    <div className='flex items-center p-4'>
                    <div>
                    <Avatar src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci80MzIxZDU3YzU3NGRlNmJiNWI5NmVmNTI1Y2VmZDNkZT9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.4qjiIRT50TOEUAbyNqDD_2XXgQN0AqhxY4itvehXzsY" size="40" round={true} />
                    </div>
                        <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full outline-none border-none text-xl ml-2' type='text' placeholder='Post your contact and location'/>
                    </div>
                    <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                    <div>
                        <FaFileImage size="24px"/>
                         
                    </div>
                        <button onClick={submitHandler} className='bg-[Green] px-4 py-1 border-none rounded-full text-lg text-white'>Post</button>
                    </div>
                </div>
        
    </div>
    </div>
  )
}

export default CreatePost