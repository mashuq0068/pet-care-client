/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaCommentAlt,
  FaLink,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { MoreVert } from "@mui/icons-material";
import "react-quill/dist/quill.snow.css";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import CommentModal from "@/components/NewsFeed/CommentModal";
// Import the FollowModal
import { PiCoffeeDuotone } from "react-icons/pi";

import FollowersModal from "@/components/NewsFeed/FollowersModal";
import FollowingModal from "@/components/NewsFeed/FollowingModal";
import EditProfileModal from "@/components/NewsFeed/EditProfileModal";
import { useGetProfileQuery } from "@/redux/features/users/users.api";
import Loading from "@/app/loading";
import {
  useDeletePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
  useVoteOnPostMutation,
} from "@/redux/features/posts/posts.api";
import { LuBookUp, LuLightbulb, LuMonitorDown } from "react-icons/lu";
import { IconButton, Menu, MenuItem } from "@mui/material";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Link from "next/link";

// Sample data for profile page

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  image: string;
  following: IUser[];
  followers: IUser[];
  isPremium: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Comment {
  user: IUser;
  content: string;
  createdAt?: string;
}
export interface Post {
  _id: string;
  author: IUser;
  content: string;
  image: string;
  comments: Comment[];
  upvotes: string[];
  downvotes: string[];
  category: string;
  createdAt: Date;
}

const ProfilePage: React.FC = () => {
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followedModalIsOpen, setFollowedModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [voteOnPost] = useVoteOnPostMutation();
  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const { data: profilePosts, isLoading: isProfilePostsLoading } =
    useGetSinglePostQuery(profileData?.data?._id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState(selectedPost?.content);
  const [category, setCategory] = useState(selectedPost?.category);
  const [imageUrl, setImageUrl] = useState(selectedPost?.image);
  useEffect(() => {
    if (selectedPost) {
      setEditorContent(selectedPost?.content);
      setCategory(selectedPost?.category);
      setImageUrl(selectedPost?.image);
    }
  }, [selectedPost]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditPost = async () => {
    console.log("started");
    // e.preventDefault()
    // if (selectedPost) {
    const updatedData = {
      id: selectedPost?._id,
      content: editorContent,
      image: imageUrl,
      category: category,
    };

    await updatePost(updatedData).unwrap();
    closeModal();
    toast.success("Post Updated Successfully");
    // }
  };
  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const updatedPostData = {
  //     id: selectedPost?._id,
  //     content: editorContent,
  //     category: category,
  //     imageUrl: imageUrl,
  //   };

  //   try {
  //     await updatePost(updatedPostData).unwrap();
  //     closeModal();
  //     handleMenuClose()
  //     toast.success("Post Updated Successfully");
  //   } catch (error) {
  //     console.error("Failed to update post:", error);
  //   }
  // };

  const handleDeletePost = async () => {
    if (selectedPost) {
      await deletePost(selectedPost._id);
      handleMenuClose();
      toast.success("Post Deleted Successfully");
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    post: Post
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedPost(null);
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

  const handleUpvote = async (postId: string) => {
    await voteOnPost({ postId, isUpvote: true });
  };

  const handleDownvote = async (postId: string) => {
    await voteOnPost({ postId, isUpvote: false });
  };

  const commentOpenModal = (post: Post) => {
    setSelectedPost(post);
    setCommentModalIsOpen(true);
  };

  if (isLoading || isProfilePostsLoading || !profileData || !profilePosts) {
    return <Loading />;
  }

  return (
    <div className="mx-auto min-h-[100vh]">
      {/* User Info Section */}
      <div className="container shadow-md mt-5 p-4 rounded-lg">
        <div className="rounded-lg theme-bg bg-white">
          <div className="flex items-center">
            <img
              height={80}
              alt="profile"
              src={`${profileData?.data?.image}`}
              className="rounded-full w-10 h-10 object-cover mr-3"
            />
            <div>
              <h2 className="font-bold text-xl">{profileData?.data?.name}</h2>
              <p className="text-gray-600 theme-text">A Regular User</p>
            </div>
            <div
              onClick={openEditModal}
              className="ml-auto text-2xl text-red-500 cursor-pointer"
            >
              <AiOutlineEdit />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="text-center cursor-pointer">
              <PiCoffeeDuotone className="text-orange-500 cursor-pointer text-lg mx-auto mb-2" />
              <p>{profilePosts?.data?.length} Posts</p>
            </div>
            <Link href="/followers" className="text-center cursor-pointer">
              <FaUserFriends className="text-blue-500 cursor-pointer mx-auto mb-2" />
              <p>{profileData?.data?.followers.length} Followers</p>
            </Link>
            <Link href="/following" className="text-center cursor-pointer">
              <FaUsers className="text-purple-500 cursor-pointer mx-auto mb-2" />
              <p>{profileData?.data?.following.length} Following</p>
            </Link>
          </div>
        </div>
      </div>

      {/* User's Posts Section */}
      <div className="mt-5 rounded-lg">
        {profilePosts?.data?.map((post: Post) => (
          <div key={post._id} className="p-4 container rounded-lg shadow mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  height={40}
                  width={40}
                  src={`${post.author.image}`}
                  alt="profile"
                  className="w-10 h-10 object-cover rounded-full mr-3"
                />

                <div>
                  {/* Category section */}
                  <div className="flex gap-2">
                    <p className="font-semibold">{post.author.name}</p>
                    <div className="flex items-center">
                      {post.category === "tip" && (
                        <LuLightbulb className="text-yellow-400 mr-1" />
                      )}
                      {post.category === "story" && (
                        <FaBook className="text-blue-400 mr-1" />
                      )}
                      <span className="font-medium theme-text text-gray-700">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {/* Three Dot Menu */}
              <IconButton onClick={(e) => handleMenuClick(e, post)}>
                <MoreVert />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedPost?._id === post._id}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    minWidth: "120px",
                  },
                }}
              >
                <MenuItem onClick={openModal}>Edit Post</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
              </Menu>
            </div>

            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.image && (
              <img
                height={550}
                width={550}
                src={post.image}
                alt="post"
                className="object-contain mb-3 rounded-lg"
              />
            )}

            <div className="flex justify-between items-center theme-text text-gray-500">
              <div className="flex gap-5 items-center">
                {/* upvote */}
                <div className="flex gap-2">
                  <button
                    className="flex items-center"
                    onClick={() => handleUpvote(post._id)}
                  >
                    <LuBookUp className="mr-1" /> Upvote
                  </button>
                  <span className="bg-purple-200 rounded-md theme-bg px-2">
                    {post.upvotes?.length}
                  </span>
                </div>
                {/* downvote */}
                <div className="flex gap-2">
                  <button
                    className="flex items-center"
                    onClick={() => handleDownvote(post._id)}
                  >
                    <LuMonitorDown className="mr-1" /> Downvote
                  </button>
                  <span className="bg-purple-200 rounded-md theme-bg px-2">
                    {post.downvotes?.length}
                  </span>
                </div>
              </div>
              <button
                className="flex items-center"
                onClick={() => commentOpenModal(post)}
              >
                <FaCommentAlt className="mr-1 theme-text text-gray-400" />{" "}
                {post?.comments?.length}
                Comments
              </button>
            </div>
          </div>
        ))}

        {/* Modals */}
        {selectedPost && (
          <CommentModal
            isOpen={commentModalIsOpen}
            onRequestClose={commentCloseModal}
            comments={selectedPost?.comments}
            postId={selectedPost?._id}
          />
        )}

        <FollowersModal
          isOpen={followersModalIsOpen}
          onRequestClose={closeFollowersModal}
          followers={profileData?.data?.followers}
        />
        <FollowingModal
          isOpen={followedModalIsOpen}
          onRequestClose={closeFollowedModal}
          following={profileData?.data?.following}
        />

        <EditProfileModal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          profile={profileData?.data}
        />
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white theme-bg rounded-lg shadow-xl max-w-lg w-full p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <AiOutlineClose size={18} />
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
              {/* <form > */}
              <ReactQuill
                defaultValue={selectedPost?.content}
                onChange={setEditorContent}
                placeholder="What's on your mind?"
                className="border-none shadow-sm rounded-md"
              />
              {/* Category Selection */}
              <div className="mt-4">
                <select
                  required
                  defaultValue={selectedPost?.category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 shadow"
                >
                  <option value="tip">Tip</option>
                  <option value="story">Story</option>
                </select>
              </div>
              {/* Image URL Input */}
              <div className="mt-4 flex flex-col space-y-4">
                <div className="relative flex items-center">
                  <FaLink className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Image URL"
                    defaultValue={selectedPost?.image}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 shadow"
                  />
                </div>
              </div>
              {/* Modal Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="mr-2 py-2 px-4 text-black bg-gray-200 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditPost}
                  className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
