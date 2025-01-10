/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter, usePathname, redirect } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Cookies from "js-cookie";
import { logout } from "@/redux/features/auth/authSlice";
import { AdminMenuItems, UserMenuItems } from "./MenuItems";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        dispatch(logout());
        Cookies.remove("token", { path: "/" });
        redirect("/login");
      },
    };
  }, [dispatch]);

  const menuItems = user?.role === "admin" ? AdminMenuItems : UserMenuItems;

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Mobile Header */}
      <header className="bg-gray-200 sticky top-0 z-50 text-black py-4 px-6 flex items-center justify-between sm:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-black"
        >
          <FaBars className="text-black mr-2" /> 
        </button>
        <button
          onClick={authentication.signOut}
          className="bg-purple-500 text-white py-1 px-4 rounded shadow-md hover:bg-purple-600"
        >
          Logout
        </button>
      </header>

      {/* Sidebar for Desktop */}
      <aside className="bg-gray-100 shadow-md text-black w-64 fixed top-0 left-0 h-full p-4 lg:block hidden lg:flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/images/pet-care-logo.png"
            className="w-28 mx-auto"
            alt="Logo"
          />
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item: any, index) => (
              <li key={index}>
                <a
                  href={item.segment}
                  className={`block py-2 px-4 rounded ${
                    pathname === `/${item.segment}`
                      ? "border-r-4 border-purple-500 bg-gray-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Drawer for Mobile */}
      <Dialog
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 sm:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex">
          <Dialog.Panel className="bg-gray-100 shadow-md text-black w-64 p-4 flex flex-col">
            {/* Close Button with React Icon */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end text-purple-500 hover:text-purple-700 mb-4"
              aria-label="Close Sidebar"
            >
              <AiOutlineClose size={24} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/pet-care-logo.png"
                className="w-28 mx-auto"
                alt="Logo"
              />
            </div>

            <nav className="flex-1">
              <ul className="space-y-2">
                {menuItems.map((item: any, index) => (
                  <li key={index}>
                    <a
                      href={item.segment}
                      onClick={() => setSidebarOpen(false)} // Close drawer on navigation
                      className={`block py-2 px-4 rounded ${
                        pathname === `/${item.segment}`
                          ? "border-r-4 border-purple-500 bg-gray-200"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 sm:ml-64 flex flex-col">
        {/* Header for Desktop */}
        <header className="bg-gray-200 sticky top-0 z-50 hidden sm:flex text-black py-4 px-6 justify-end">
          <button
            onClick={authentication.signOut}
            className="bg-purple-500 text-white py-1 px-4 rounded shadow-md hover:bg-purple-600"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 bg-gray-100  overflow-x-hidden p-3 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
