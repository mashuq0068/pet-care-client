"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useGetProfileQuery,
  useAcceptFriendRequestMutation,
  useRemoveFriendRequestMutation,
} from "../../../redux/features/users/users.api";
import Loading from "@/app/loading";
import toast from "react-hot-toast";

const FriendRequestsPage = () => {
  // Fetch the user profile, which includes friend requests
  const { data: userProfile, isLoading } = useGetProfileQuery(undefined);
  

  // Mutations for accepting and removing friend requests
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [removeFriendRequest] = useRemoveFriendRequestMutation();

  // Handle accept friend request
  const handleAccept = async (requestId: string) => {
    try {
      // Pass current user ID and the requester's user ID
      await acceptFriendRequest({ userId: userProfile?.data?._id, requestId }).unwrap();
      toast.success("Friend request accepted!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  // Handle remove friend request
  const handleRemove = async (requestedId: string) => {
    
    try {
      // Pass current user ID and the requester's user ID
      await removeFriendRequest({ userId: userProfile?.data?._id, requestedId }).unwrap();
      toast.success("Friend request removed!");
    } catch (error) {
      console.error("Error removing friend request:", error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const friendRequests = userProfile?.data?.friendRequests || [];

  return (
    <div className="p-8 container mt-8 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Friend Requests</h1>
      {friendRequests?.length === 0 ? (
        <p className="text-gray-500">No new friend requests</p>
      ) : (
        <div className="space-y-4">
          {friendRequests?.map((request: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-100 shadow rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={request.image || "https://via.placeholder.com/48"}
                  alt="Requester Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {request.name || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Wants to be your friend
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-purple-500 rounded-lg text-white px-4 py-2 hover:bg-purple-600"
                  onClick={() => handleAccept(request._id)}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-200 rounded-lg text-black px-4 py-2 hover:bg-gray-300"
                  onClick={() => handleRemove(request?._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequestsPage;
