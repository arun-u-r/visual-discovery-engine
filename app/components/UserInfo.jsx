import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserInfo = ({ userInfo }) => {
  // console.log(userInfo);
  const router = useRouter()
  const { data: session } = useSession();
  const logoutClick = () =>{
    signOut();
    router.push('/');
  } 

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={userInfo.userImage}
        height={80}
        width={80}
        alt="user-image"
        className="rounded-full"
      />
      <h2 className="text-[30px] font-semibold">{userInfo.userName}</h2>
      <h2 className="text-gray-400"> {userInfo.email} </h2>
      <button className="bg-gray-200 mt-5 rounded-full p-2 px-3 font-semibold">
        Share
      </button>
      {session?.user.email == userInfo.email ? 
        <button className="bg-gray-400 rounded-full font-semibold p-2 px-3 mt-5 hover:bg-red-600" onClick={()=>logoutClick()} >
          Logout
        </button>
       : null}
    </div>
  );
};

export default UserInfo;
