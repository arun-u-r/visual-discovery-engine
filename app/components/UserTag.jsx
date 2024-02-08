import Image from "next/image";
import React from "react";

const UserTag = ({ user }) => {
  // console.log(user.session)
  return (
    <div className="">
      {user ? 
        <div>
          <Image
            src={user.image}
            alt="user-image"
            height={40}
            width={40}
            className="rounded-full"
          />

          <div>
            <h2 className="text-[14px] font-medium">{user.name}</h2>
            <h2 className="text-[12px]">{user.email}</h2>
          </div>
        </div>
       : null}
    </div>
  );
};

export default UserTag;
