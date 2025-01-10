"use client";
import React from "react";
import { FaUserShield, FaUserSlash, FaTrashAlt } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";
import { IUser } from "../../news-feed/page";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/users/users.api";
import Loading from "@/app/loading";

const Users: React.FC = () => {
  // Fetch users from the API
  const {
    data: users = [],
    isLoading,
 
  } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Function to toggle admin role
  const handleToggleAdmin = async (id: string, currentRole: string) => {
    try {
      await updateUser({
        id,
        role: currentRole === "user" ? "admin" : "user",
      }).unwrap();
      toast.success(`User role updated successfully!`);
    } catch (error) {
      toast.error("Failed to update user role.");
      console.error("Failed to update user:", error);
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success(`User deleted successfully!`);
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error("Failed to delete user:", error);
    }
  };

  // Render loading state or error state
  if (isLoading) return <div><Loading/></div>;


  return (
    <div className="mx-auto p-12 min-h-[100vh]">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <table className="min-w-full bg-white theme-bg rounded-lg shadow">
        <thead>
          <tr className="text-gray-700 theme-text">
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((user: IUser) => (
            <tr
              key={user._id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="p-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">
                <span
                  className={`text-${user.role === "admin" ? "purple" : "gray"}-500`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </td>
              <td className="p-3 flex space-x-2">
                <button
                  className={`${
                    user.role === "user" ? "bg-purple-500" : "bg-gray-500"
                  } text-white  flex items-center px-4 py-1 rounded`}
                  onClick={() => handleToggleAdmin(user._id, user.role)}
                >
                  {user.role === "user" ? (
                    <>
                      <FaUserShield className="mr-2" /> Make Admin
                    </>
                  ) : (
                    <>
                      <FaUserSlash className="mr-2" /> Remove Admin
                    </>
                  )}
                </button>
                <button
                  className="bg-red-500 text-white flex items-center px-4 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
