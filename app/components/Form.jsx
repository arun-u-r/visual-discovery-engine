"use client";
import React, { useState } from "react";
import Image from "next/image";
import UploadImage from "./UploadImage";
import app from "../shared/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import UserTag from "./UserTag";

const Form = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [link, setLink] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const storage = getStorage(app);
  const db= getFirestore(app);
  const postId = Date.now().toString();
  const router = useRouter();

  const onSave = () => {
    console.log("title:", title, "desc:",  desc , "link:", link);
    console.log("file:", file);
    // setLoading(true)
    uploadFile()
  }

  const uploadFile = async () => {
    const storageRef = ref(storage, "pintrest/" + file.name);
  
    try {
      console.log("Uploading file...");
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a file!");
  
      console.log("Getting download URL...");
      const url = await getDownloadURL(storageRef);
      console.log("Download URL:", url);
  
      const postData = {
        title: title,
        desc: desc,
        link: link,
        image: url,
        username: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
        id: postId,
      };
  
      console.log("Saving data...");
      await setDoc(doc(db, "pintrest-post", postId), postData);
      console.log("Data saved successfully!");
      
      setLoading(true);
      router.push("/" + session.user.email);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-16">
      <div className="flex justify-end mb-6">
        <button
          className="bg-red-400 rounded-lg text-white p-2 px-3 font-semibold"
          onClick={() => onSave()}
        >
          {loading ? 
            <Image
              src="/loading-indicator.png"
              width={30}
              height={30}
              className="animate-spin"
              alt="loading.."
            />
           : 
            <span>Save</span>
          }
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <UploadImage setFile={(file) => setFile(file)} />
        <div className="col-span-2">
          <div className="w-[100%]">
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Add your title"
              className="tex-[35px] outline-none font-bold w-full border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <h2 className="text-[12px] text-gray-400 mb-8 w-full">
              The first40 characters are what usually show up in feeds.
            </h2>
            <UserTag user={session?.user} />
            <textarea
              type="text"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="outline-none w-full mt-8 pb-4 text-[14px] border-b-[2px] border-gray-400 placeholder-gray-400 "
              placeholder="Tell everyone what your pin is about"
            />
            <input
              type="text"
              onChange={(e) => {
                setLink(e.target.value);
              }}
              placeholder="Add description link"
              className=" outline-none w-full pb-4 mt-[90px] border-b-[2px] placeholder-gray-400 border-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
