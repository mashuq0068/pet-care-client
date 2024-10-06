import CreatePost from "@/components/NewsFeed/CreatePost";
import Image from "next/image";
import React from "react";
import { BiDislike } from "react-icons/bi";
import { MdOutlineHowToVote } from "react-icons/md";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa"; // For like and comment icons
import { FaThumbsDown } from "react-icons/fa6";

import { LuBookUp, LuMonitorDown } from "react-icons/lu";
const NewsFeedPage = () => {
  return (
    <div className="">
      <div>
        <CreatePost />
      </div>

      {/* Example Post */}
      <div className=" p-4 container rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
        <Image
          height={40}
          width={40}
          src="https://i.ibb.co.com/ZX8LhK8/th-4.jpg"
          alt="profile"
          className="w-10 h-10 object-cover rounded-full mr-3"
        />
          <div>
            <p className="font-semibold">Mission Web Development</p>
            <p className="text-sm text-gray-500">3h ago</p>
          </div>
        </div>
        <p className="mb-4">
          যারা যারা Programming Hero Courses গ্রুপে বিয়োকাস্ট করতে পারেনি, এরা
          রিপোর্ট করতে পারবেন।
        </p>
        <Image
          height={550}
          width={550}
          src="https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg"
          alt="profile"
          className=" object-contain mb-3 rounded-lg"
        />
        <div className="flex justify-between items-center text-gray-500">
         <div className="flex gap-5">
         <button className="flex items-center">
         <LuBookUp className="mr-1 " /> Upvote
          </button>
          <button className="flex items-center">
          <LuMonitorDown  className="mr-1 " /> Downvote
          </button>
         </div>
          <button className="flex items-center">
            <FaCommentAlt className="mr-1 text-gray-400" /> Comments
          </button>
        </div>
      </div>
      {/* Example Post */}
      <div className=" p-4 container rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
        <Image
          height={40}
          width={40}
          src="https://i.ibb.co.com/ZX8LhK8/th-4.jpg"
          alt="profile"
          className="w-10 h-10 object-cover rounded-full mr-3"
        />
          <div>
            <p className="font-semibold">Mission Web Development</p>
            <p className="text-sm text-gray-500">3h ago</p>
          </div>
        </div>
        <p className="mb-4">
          যারা যারা Programming Hero Courses গ্রুপে বিয়োকাস্ট করতে পারেনি, এরা
          রিপোর্ট করতে পারবেন।
        </p>
        <Image
          height={550}
          width={550}
          src="https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg"
          alt="profile"
          className=" object-contain mb-3 rounded-lg"
        />
        <div className="flex justify-between items-center text-gray-500">
         <div className="flex gap-5">
         <button className="flex items-center">
         <LuBookUp className="mr-1 " /> Upvote
          </button>
          <button className="flex items-center">
          <LuMonitorDown  className="mr-1 " /> Downvote
          </button>
         </div>
          <button className="flex items-center">
            <FaCommentAlt className="mr-1 text-gray-400" /> Comments
          </button>
        </div>
      </div>
      {/* Example Post */}
      <div className=" p-4 container rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
        <Image
          height={40}
          width={40}
          src="https://i.ibb.co.com/ZX8LhK8/th-4.jpg"
          alt="profile"
          className="w-10 h-10 object-cover rounded-full mr-3"
        />
          <div>
            <p className="font-semibold">Mission Web Development</p>
            <p className="text-sm text-gray-500">3h ago</p>
          </div>
        </div>
        <p className="mb-4">
          যারা যারা Programming Hero Courses গ্রুপে বিয়োকাস্ট করতে পারেনি, এরা
          রিপোর্ট করতে পারবেন।
        </p>
        <Image
          height={550}
          width={550}
          src="https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg"
          alt="profile"
          className=" object-contain mb-3 rounded-lg"
        />
        <div className="flex justify-between items-center text-gray-500">
         <div className="flex gap-5">
         <button className="flex items-center">
         <LuBookUp className="mr-1 " /> Upvote
          </button>
          <button className="flex items-center">
          <LuMonitorDown  className="mr-1 " /> Downvote
          </button>
         </div>
          <button className="flex items-center">
            <FaCommentAlt className="mr-1 text-gray-400" /> Comments
          </button>
        </div>
      </div>
      {/* Example Post */}
      <div className=" p-4 container rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
        <Image
          height={40}
          width={40}
          src="https://i.ibb.co.com/ZX8LhK8/th-4.jpg"
          alt="profile"
          className="w-10 h-10 object-cover rounded-full mr-3"
        />
          <div>
            <p className="font-semibold">Mission Web Development</p>
            <p className="text-sm text-gray-500">3h ago</p>
          </div>
        </div>
        <p className="mb-4">
          যারা যারা Programming Hero Courses গ্রুপে বিয়োকাস্ট করতে পারেনি, এরা
          রিপোর্ট করতে পারবেন।
        </p>
        <Image
          height={550}
          width={550}
          src="https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg"
          alt="profile"
          className=" object-contain mb-3 rounded-lg"
        />
        <div className="flex justify-between items-center text-gray-500">
         <div className="flex gap-5">
         <button className="flex items-center">
         <LuBookUp className="mr-1 " /> Upvote
          </button>
          <button className="flex items-center">
          <LuMonitorDown  className="mr-1 " /> Downvote
          </button>
         </div>
          <button className="flex items-center">
            <FaCommentAlt className="mr-1 text-gray-400" /> Comments
          </button>
        </div>
      </div>
      {/* Example Post */}
      <div className=" p-4 container rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
        <Image
          height={40}
          width={40}
          src="https://i.ibb.co.com/ZX8LhK8/th-4.jpg"
          alt="profile"
          className="w-10 h-10 object-cover rounded-full mr-3"
        />
          <div>
            <p className="font-semibold">Mission Web Development</p>
            <p className="text-sm text-gray-500">3h ago</p>
          </div>
        </div>
        <p className="mb-4">
          যারা যারা Programming Hero Courses গ্রুপে বিয়োকাস্ট করতে পারেনি, এরা
          রিপোর্ট করতে পারবেন।
        </p>
        <Image
          height={550}
          width={550}
          src="https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg"
          alt="profile"
          className=" object-contain mb-3 rounded-lg"
        />
        <div className="flex justify-between items-center text-gray-500">
         <div className="flex gap-5">
         <button className="flex items-center">
         <LuBookUp className="mr-1 " /> Upvote
          </button>
          <button className="flex items-center">
          <LuMonitorDown  className="mr-1 " /> Downvote
          </button>
         </div>
          <button className="flex items-center">
            <FaCommentAlt className="mr-1 text-gray-400" /> Comments
          </button>
        </div>
      </div>
      {/* Example Post */}
      <div className=" p-4 container rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
        <Image
          height={40}
          width={40}
          src="https://i.ibb.co.com/ZX8LhK8/th-4.jpg"
          alt="profile"
          className="w-10 h-10 object-cover rounded-full mr-3"
        />
          <div>
            <p className="font-semibold">Mission Web Development</p>
            <p className="text-sm text-gray-500">3h ago</p>
          </div>
        </div>
        <p className="mb-4">
          যারা যারা Programming Hero Courses গ্রুপে বিয়োকাস্ট করতে পারেনি, এরা
          রিপোর্ট করতে পারবেন।
        </p>
        <Image
          height={550}
          width={550}
          src="https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg"
          alt="profile"
          className=" object-contain mb-3 rounded-lg"
        />
        <div className="flex justify-between items-center text-gray-500">
         <div className="flex gap-5">
         <button className="flex items-center">
         <LuBookUp className="mr-1 " /> Upvote
          </button>
          <button className="flex items-center">
          <LuMonitorDown  className="mr-1 " /> Downvote
          </button>
         </div>
          <button className="flex items-center">
            <FaCommentAlt className="mr-1 text-gray-400" /> Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedPage;
