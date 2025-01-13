import React from "react";


// Static data for friend requests
const requests = [
  {
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "James Carter",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Olivia Wilson",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "Liam Martinez",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

const FriendRequestsPage = () => {
  return (
    <div className="p-8 container mt-8 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Friend Requests</h1>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 shadow rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={request.image}
                alt="Requester Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{request.name}</p>
                <p className="text-sm text-gray-500">Wants to be your friend</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-purple-500 rounded-lg text-white px-4 py-2  hover:bg-purple-600">
                Confirm
              </button>
              <button className="bg-gray-200 rounded-lg text-black px-4 py-2  hover:bg-gray-300">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequestsPage;
