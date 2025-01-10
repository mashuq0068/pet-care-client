"use client"
import { Navigation } from "@toolpad/core";

import { BiSolidUserAccount } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";
import { FcAbout } from "react-icons/fc";
import { AiOutlineUsergroupAdd } from "react-icons/ai"; // User Management icon
import { RiFileList2Line } from "react-icons/ri"; // Content Management icon
import { BsCashStack } from "react-icons/bs"; // Payment History icons


export const UserMenuItems: Navigation = [
  // {
  //   kind: "header",
  //   title: "Main Contents",
  // },
  {
    segment: "my-profile",
    title: "My Profile",
    icon: <BiSolidUserAccount className="text-purple-500 text-xl" />, // Cool purple for profile
  },
  {
    segment: "news-feed",
    title: "News Feed",
    icon: <PiCoffeeDuotone className="text-lg  text-orange-500" />, // Deep indigo for news
  },
  // {
  //   kind: "divider",
  // },
  // {
  //   kind: "header",
  //   title: "Website Info",
  // },
  {
    segment: "about-us",
    title: "About Us",
    icon: <FcAbout className=" text-lg" />, 
  },
  {
    segment: "contact-us",
    title: "Contact Us",
    icon: <MdContactSupport className='text-red-500 text-xl'  />, // Light purple for contact
  },
];
;


export const AdminMenuItems: Navigation = [
  {
    segment: "my-profile",
    title: "My Profile",
    icon: <BiSolidUserAccount className="text-purple-500 text-xl" />, // Cool purple for profile
  },
  {
    segment: "news-feed",
    title: "News Feed",
    icon: <PiCoffeeDuotone className="text-lg text-orange-500" />, // Deep indigo for news
  },
  {
    segment: "about-us",
    title: "About Us",
    icon: <FcAbout className="text-lg" />, 
  },
  {
    segment: "contact-us",
    title: "Contact Us",
    icon: <MdContactSupport className='text-red-500 text-xl' />, // Light purple for contact
  },
  {
    segment: "admin/user-management",
    title: "User Management",
    icon: <AiOutlineUsergroupAdd className="text-purple-500 text-xl" />, // Green for user management
  },
  {
    segment: "admin/content-management",
    title: "Content Management",
    icon: <RiFileList2Line className="text-orange-500 text-xl" />, // Blue for content management
  },
  {
    segment: "admin/payment-history",
    title: "Payment History",
    icon: <BsCashStack className="text-green-500 text-xl" />, // Yellow for payment history
  },
];





