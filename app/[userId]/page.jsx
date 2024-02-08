"use client";

import React, { useEffect, useState } from "react";
import app from "../shared/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import UserInfo  from "./../components/UserInfo";

function Profile({ params }) {
  
  const [userInfo, setUserInfo] = useState()
  const db = getFirestore(app);


  useEffect(() => {
    console.log(params.userId.replace("%40", "@"));
    if (params) {
      getUserInfo(params.userId.replace("%40", "@"));
    }
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, 'user', email);
    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {
      setUserInfo(docSnap.data())
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return <div>
  {userInfo ? <UserInfo userInfo={userInfo}  /> : null}
  </div>;
}

export default Profile;
