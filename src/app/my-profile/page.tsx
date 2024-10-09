"use client"
import { useState } from "react";
import Image from "next/image";
import { FaUserFriends, FaUsers, FaCommentAlt } from "react-icons/fa";
import { LuBookUp, LuMonitorDown } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import CommentModal, { Comment } from "@/components/NewsFeed/CommentModal";
 // Import the FollowModal
import { PiCoffeeDuotone } from "react-icons/pi";
import FollowModal from "@/components/NewsFeed/FollowersModal";
import ReactModal from "react-modal";
import FollowersModal from "@/components/NewsFeed/FollowersModal";
import FollowingModal from "@/components/NewsFeed/FollowingModal";
import EditProfileModal from "@/components/NewsFeed/EditProfileModal";

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
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [followersModalIsOpen , setFollowersModalIsOpen] = useState(false)
  const [followedModalIsOpen, setFollowedModalIsOpen] = useState(false); 
  const [editModalIsOpen , setEditModalIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post2 | null>(null);

  const commentOpenModal = (post: Post) => {
    setSelectedPost(post as Post2);
    setCommentModalIsOpen(true);
  };

  const commentCloseModal = () => {
    setCommentModalIsOpen(false);
    setSelectedPost(null);
  };

  const openFollowersModal = () => {
    setFollowersModalIsOpen(true);
  };

  const closeFollowersModal = () => {
    setFollowersModalIsOpen(false);
  };
  const openFollowedModal = () => {
    setFollowedModalIsOpen(true);
  };

  const closeFollowedModal = () => {
    setFollowedModalIsOpen(false);
  };
  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
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
            <p className="text-gray-600 theme-text">{profileData.bio}</p>
          </div>
          <div onClick={openEditModal} className="ml-auto text-2xl text-red-500 cursor-pointer">
            <AiOutlineEdit />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="text-center cursor-pointer">
            <PiCoffeeDuotone className="text-orange-500 cursor-pointer text-lg mx-auto mb-2" />
            <p>{profileData.posts.length} Posts</p>
          </div>
          <div className="text-center cursor-pointer" onClick={openFollowersModal}>
            <FaUserFriends className="text-blue-500 cursor-pointer mx-auto mb-2" />
            <p>{profileData.followers.length} Followers</p>
          </div>
          <div onClick={openFollowedModal} className="text-center cursor-pointer">
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
          {/* Post Content */}
          ...
        </div>
      ))}

      {/* Modals */}
      {selectedPost && (
        <CommentModal
          isOpen={commentModalIsOpen}
          onRequestClose={commentCloseModal}
          post={selectedPost}
        />
      )}

      <FollowersModal isOpen={followersModalIsOpen} onRequestClose={closeFollowersModal} followers={profileData.followers} />
      <FollowingModal isOpen={followedModalIsOpen} onRequestClose={closeFollowedModal} following={profileData.following} />
      <EditProfileModal isOpen={editModalIsOpen} onRequestClose={closeEditModal} profile={profileData} />
    </div>
  </div>
  );
};

export default ProfilePage;
