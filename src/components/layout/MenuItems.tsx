import { Navigation } from "@toolpad/core";
import BarChartIcon from "@mui/icons-material/BarChart";
import { FaRegNewspaper } from "react-icons/fa6";
import LayersIcon from "@mui/icons-material/Layers";
import { CgProfile } from "react-icons/cg";

const MenuItems: Navigation = [
  {
    kind: "header",
    title: "Main Contents",
  },
  {
    segment: "my-profile",
    title: "My Profile",
    icon: <CgProfile className="text-xl" />,
  },
  {
    segment: "news-feed",
    title: "News Feed",
    icon: <FaRegNewspaper className="text-lg" />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Website Info",
  },
  {
    segment: "about-us",
    title: "About Us",
    icon: <BarChartIcon />,
    // children: [
    //   {
    //     segment: "sales",
    //     title: "Sales",
    //     icon: <DescriptionIcon />,
    //   },
    //   {
    //     segment: "traffic",
    //     title: "Traffic",
    //     icon: <DescriptionIcon />,
    //   },
    // ],
  },
  {
    segment: "contact-us",
    title: "Contact Us",
    icon: <LayersIcon />,
  },
];

export default MenuItems