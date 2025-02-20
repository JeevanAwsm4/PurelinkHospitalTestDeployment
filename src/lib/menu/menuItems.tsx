import React from "react";
import { MenuItem } from "../../interfaces/interface";
import { FiHome } from "react-icons/fi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdAutoGraph } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { LuCrown } from "react-icons/lu";

export const menuItems: MenuItem[] = [
  {
    name: "Home",
    icon: <FiHome />,
    path: "/",
  },
  {
    name: "Request",
    icon: <FaHandHoldingHeart />,
    path: "/requests",
  },
  {
    name: "Contact",
    icon: <FiPhone />,
    path: "/contacts",
  },
  {
    name: "City Composition",
    icon: <MdAutoGraph />,
    path: "/city-composition",
  },
  {
    name: "Report",
    icon: <TbReport />,
    path: "/report",
  },
  {
    name: "Subscription",
    icon: <LuCrown />,
    path: "/subscription",
  },
];
