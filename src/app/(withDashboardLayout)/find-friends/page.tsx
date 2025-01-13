import React from "react";

export interface IUser {
    name: string;
    image: string;
    id?: number; 
  }
  
const users: IUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Diana Prince",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const FindFriendsPage: React.FC<{ users: IUser[] }> = ({ users }) => {
  return (
    <div className="p-8 container mt-8 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Find Friends</h1>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 shadow rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt="User Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">Add as a friend</p>
              </div>
            </div>
            <button className="bg-purple-500 rounded-lg text-white px-4 py-2  hover:bg-purple-600">
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const StaticPageWrapper = () => <FindFriendsPage users={users} />;

export default StaticPageWrapper;
