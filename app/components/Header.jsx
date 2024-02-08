"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiSearch, HiBell, HiChat, HiChevronDown } from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import app from "../shared/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const db = getFirestore(app);

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const saveUserInfo = async () => {
    try {
      if (session?.user) {
        await setDoc(doc(db, "users", session.user.email), {
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image,
        });
      }
    } catch (error) {
      console.error("Firestore Error:", error);
    }
  };

  const createClick = () => {
    if (session) {
      router.push("/pin-builder");
    } else {
      signIn();
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 md:gap-2 p-6">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
          onClick={() => router.push("/")}
        />
        
      </div>
      <div className="relative md:hidden">
        <button
          className="bg-white p-3 rounded-full px-6 text-[18px] items-center hover:bg-gray-300"
          onClick={toggleDropdown}
        >
          <span className="flex gap-x-1">
            Home <HiChevronDown className="mt-1" />
          </span>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <button
              className="p-3 px-6 text-[18px] w-full hover:bg-gray-300 font-bold"
              onClick={() => router.push("/")}
            >
              Home
            </button>
            <button
              className="p-3 px-6 text-[18px] w-full hover:bg-gray-300 font-semibold"
              onClick={createClick}
            >
              Create
            </button>
            <button
              className="p-3 px-6 text-[18px] w-full hover:bg-gray-300 font-semibold"
              onClick={() => router.push("/pin-builder")}
            >
              Today
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:flex-1 md:flex md:justify-between">
        <nav className="flex gap-3">
          <button
            className="p-3 px-6 rounded-full text-[20px]"
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button
            className="p-3 px-6 rounded-full text-[20px]"
            onClick={createClick}
          >
            Create
          </button>
          <button
            className="p-3 px-6 rounded-full text-[20px]"
            onClick={() => router.push("/explore-today")}
          >
            Explore
          </button>
        </nav>

        <div className="flex items-center bg-[#e8e9c9] p-3 rounded-full w-full md:w-auto">
          <HiSearch className="text-[26px] text-grey-500" />
          <input
            type="text"
            placeholder="Search."
            className="bg-transparent outline-none w-full  text-[18px]"
          />
        </div>
      </div>

      <div className="flex gap-3 md:gap-2 items-center">
      <HiSearch
          className="text-[25px] cursor-pointer md:hidden ml-auto "
          onClick={() => router.push("/")}
        />
        <HiBell className="text-[25px] cursor-pointer" />
        <HiChat className="text-[25px] cursor-pointer" />
        {session?.user ? (
          <Image
            src={session.user.image}
            onClick={() => router.push("/" + session.user.email)}
            alt="avatar"
            width={50}
            height={50}
            className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
          />
        ) : (
          <button
            className="p-2 rounded-full px-4 font-semibold"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>

      
    </header>
  );
};

export default Header;
