import { Navigation } from "@toolpad/core";

import { BiSolidUserAccount } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";
import { FcAbout } from "react-icons/fc";

const MenuItems: Navigation = [
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

export default MenuItems;
