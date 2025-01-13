"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProfileQuery } from "@/redux/features/users/users.api";

const FollowersPage= () => {
    const { data: profileData, isLoading } = useGetProfileQuery(undefined);
    console.log(profileData?.data?.followers);

  
    return (
    <div className="container p-8  rounded-lg shadow-md mt-8">
      <h1 className="text-xl font-bold mb-6">Followers</h1>
      <div className="space-y-4">
        {profileData?.data?.followers?.map((follower : any, index : any) => (
          <div key={index} className="flex items-center bg-gray-100 justify-between p-4 b shadow rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={follower?.image}
                alt="Follower Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{follower?.name}</p>
                <p className="text-sm text-gray-500">Following you</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;
