"use client"
import { useState } from "react";
import Image from "next/image";
import { FaUserFriends, FaUsers, FaCommentAlt } from "react-icons/fa";
import { LuBookUp, LuMonitorDown } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import CommentModal, { Comment } from "@/components/NewsFeed/CommentModal";
 // Import the FollowModal
import { PiCoffeeDuotone } from "react-icons/pi";
import FollowModal from "@/components/NewsFeed/FollowModal";

// Sample data for profile page
interface User {
  id: number;
  name: string;
  profileImage: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: Post[];
}

interface Post {
  id: number;
  author: string;
  authorImage: string;
  time: string;
  content: string;
  postImage: string;

  
}
interface Post2 {
  id: number;
  author: string;
  authorImage: string;
  time: string;
  content: string;
  postImage: string;
  comments : Comment[]

  
}

// Sample profile data (replace with actual data)
const profileData: User = {
  id: 1,
  name: "John Doe",
  profileImage: "https://i.ibb.co.com/ZX8LhK8/th-4.jpg",
  bio: "Web Developer and Tech Enthusiast",
  followers: ["Alice", "Bob", "Charlie"],
  following: ["David", "Eve", "Frank"],
  posts: [
    {
      id: 1,
      author: "John Doe",
      authorImage: "https://i.ibb.co.com/ZX8LhK8/th-4.jpg",
      time: "2 hours ago",
      content: "This is my first post!",
      postImage: "https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg",
    },
    // Add more sample posts as needed
  ],
};

const ProfilePage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followModalIsOpen, setFollowModalIsOpen] = useState(false); // State for FollowModal
  const [selectedPost, setSelectedPost] = useState<Post2 | null>(null);

  const openModal = (post: Post) => {
    setSelectedPost(post as Post2);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const openFollowModal = () => {
    setFollowModalIsOpen(true);
  };

  const closeFollowModal = () => {
    setFollowModalIsOpen(false);
  };

  return (
    <div className="mx-auto">
      {/* User Info Section */}
      <div className="container shadow-md mt-5 p-4 rounded-lg">
        <div className="rounded-lg theme-bg bg-white">
          <div className="flex items-center">
            <Image
              height={80}
              width={80}
              src={profileData.profileImage}
              alt="profile"
              className="rounded-full w-10 h-10 object-cover mr-3"
            />
            <div>
              <h2 className="font-bold text-xl">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.bio}</p>
            </div>
            <div className="ml-auto text-2xl text-red-500 cursor-pointer">
              <AiOutlineEdit />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="text-center cursor-pointer">
              <PiCoffeeDuotone className="text-orange-500 cursor-pointer text-lg mx-auto mb-2" />
              <p>{profileData.posts.length} Posts</p>
            </div>
            <div className="text-center cursor-pointer" onClick={openFollowModal}>
              <FaUserFriends className="text-blue-500 cursor-pointer mx-auto mb-2" />
              <p>{profileData.followers.length} Followers</p>
            </div>
            <div className="text-center cursor-pointer">
              <FaUsers className="text-purple-500 cursor-pointer mx-auto mb-2" />
              <p>{profileData.following.length} Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* User's Posts Section */}
      <div className="mt-5 rounded-lg">
        {profileData.posts.map((post) => (
          <div key={post.id} className="p-4 container shadow-md rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <Image
                height={40}
                width={40}
                src={post.authorImage}
                alt="profile"
                className="w-10 h-10 object-cover rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            <Image
              height={550}
              width={550}
              src={post.postImage}
              alt="post"
              className="object-contain mb-3 rounded-lg"
            />
            <div className="flex justify-between items-center theme-text text-gray-500">
              <div className="flex gap-5">
                <button className="flex items-center">
                  <LuBookUp className="mr-1" /> Upvote
                </button>
                <button className="flex items-center">
                  <LuMonitorDown className="mr-1" /> Downvote
                </button>
              </div>
              <button className="flex items-center" onClick={() => openModal(post)}>
                <FaCommentAlt className="mr-1 theme-text text-gray-400" /> Comments
              </button>
            </div>
          </div>
        ))}

        {selectedPost && (
          <CommentModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            post={selectedPost}
          />
        )}

        <FollowModal
          isOpen={followModalIsOpen}
          onRequestClose={closeFollowModal}
          followers={profileData.followers.map((name, index) => ({
            id: index + 1,
            name,
            profileImage: "https://i.ibb.co.com/ZX8LhK8/th-4.jpg", // Sample profile image
            title: "Follower", // Add title or role for each follower
          }))}
          following={profileData.following.map((name, index) => ({
            id: index + 1,
            name,
            profileImage: "https://i.ibb.co.com/ZX8LhK8/th-4.jpg", // Sample profile image
            title: "Following", // Add title or role for each following user
          }))}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
