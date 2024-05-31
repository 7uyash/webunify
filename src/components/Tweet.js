import React from "react";
import Avatar from "react-avatar";
import { timeSince } from "../utils/constant";

const Tweet = ({ tweet }) => {
  const deleteTweetHandler = async (id) => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
        console.log(res);
        dispatch(getRefresh());
        toast.success(res.data.message);
    } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
    }
}
  return (
    <div className="border-b border-gray-200 ">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci80MzIxZDU3YzU3NGRlNmJiNWI5NmVmNTI1Y2VmZDNkZT9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.4qjiIRT50TOEUAbyNqDD_2XXgQN0AqhxY4itvehXzsY"
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${
                tweet?.userDetails[0]?.username
              } . ${timeSince(tweet?.createdAt)}`}</p>
            </div>

            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div>
                <button className=" flex items-center px-1 py-1 border-none text-md bg-[Green] w-full rounded-full text-white font-bold text-sm hover:bg-red-700 cursor-pointer">
                  contact
                </button>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                    <MdOutlineDeleteOutline size="24px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
