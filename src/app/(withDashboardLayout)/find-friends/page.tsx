"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useGetAllUsersQuery,
  useSendFriendRequestMutation,
  useRemoveFriendMutation,
  useGetProfileQuery,
} from "../../../redux/features/users/users.api";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

const FindFriendsPage: React.FC = () => {
  // Fetch all users and profile data
  const { data: allUsers, isLoading: isLoadingUsers } =
    useGetAllUsersQuery(undefined);
  const { data: profile, isLoading: isLoadingProfile } =
    useGetProfileQuery(undefined);

  // Mutations for sending friend request and removing friends
  const [sendFriendRequest, { isLoading: requestLoading }] =
    useSendFriendRequestMutation();
  const [removeFriend, { isLoading: removeLoading }] =
    useRemoveFriendMutation();

  const userFriends = profile?.data?.friends || [];
  const sentFriendRequests = profile?.data?.friendRequests || [];

  // Check if user is a friend
  const isFriend = (userId: string) =>
    userFriends?.some((friend: any) => friend._id === userId);

  // Check if a friend request is pending
  const isRequestPending = (userId: string) =>
    sentFriendRequests?.some((request: any) => request._id === userId);

  // Handle sending a friend request
  const handleSendFriendRequest = async (userId: string) => {
    try {
      await sendFriendRequest({
        userId: profile?.data?._id,
        targetUserId: userId,
      }).unwrap();
      toast.success("Friend request sent!");
    } catch (error) {
      console.log(error);
      console.error("Error sending friend request:", error);
      // toast.error((error as { message: string })?.data?.message);
    }
  };

  // Handle removing a friend
  const handleRemoveFriend = async (userId: string) => {
    try {
      await removeFriend( {userId:profile?.data?._id , friendId: userId}).unwrap();
      toast.success("Friend removed!");
    } catch (error) {
      console.error("Error removing friend:", error);
      // toast.error((error as { data: object })?.data?.message);
    }
  };

  if (isLoadingProfile || isLoadingUsers || requestLoading || removeLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-8 container mt-8 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Find Friends</h1>
      <div className="space-y-4">
        {allUsers?.data?.map((user: any) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 bg-gray-100 shadow rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.image || "https://via.placeholder.com/48"}
                alt="User Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">
                  Connect with {user.name}
                </p>
              </div>
            </div>
            {isFriend(user._id) ? (
              <button
                className="bg-red-500 rounded-lg text-white px-4 py-2 hover:bg-red-600"
                onClick={() => handleRemoveFriend(user._id)}
              >
                Remove Friend
              </button>
            ) : isRequestPending(user._id) ? (
              <button
                className="bg-gray-300 rounded-lg text-gray-600 px-4 py-2 cursor-not-allowed"
                disabled
              >
                Pending Request
              </button>
            ) : (
              <button
                className="bg-purple-500 rounded-lg text-white px-4 py-2 hover:bg-purple-600"
                onClick={() => handleSendFriendRequest(user._id)}
              >
                Add Friend
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFriendsPage;
