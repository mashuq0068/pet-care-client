"use client";
import { useState } from "react";
import Image from "next/image";
import { FaCommentAlt, FaSearch } from "react-icons/fa";
import { LuBookUp, LuMonitorDown } from "react-icons/lu";
import CreatePost from "@/components/NewsFeed/CreatePost";
import CommentModal from "@/components/NewsFeed/CommentModal";
import { useGetPostsQuery } from "@/redux/features/posts/posts.api";
import { useAppSelector } from "@/redux/hooks";

interface Comment {
  id: number;
  author: string;
  text: string;
  authorImage: string;
  createdAt: Date;
}

interface Post {
  id: number;
  author: { name: string; image: string };
  content: string;
  image: string;
  comments: Comment[];
  upvotes: number;
  category: string; // For example, "tip" or "story"
  createdAt: Date;
}

const NewsFeedPage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { data, isLoading } = useGetPostsQuery(undefined);
  const selectedFilter = useAppSelector((state) => state.filter.selectedFilter);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  // Function to filter and sort posts based on selected filter and search term
  const getFilteredPosts = () => {
    if (!data?.data) return [];

    let posts = [...data.data];

    // Apply search filter
    if (searchTerm) {
      posts = posts.filter((post) =>
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply selected filter
    switch (selectedFilter) {
      case "mostCommented":
        posts.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case "mostUpvoted":
        posts.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "tips":
        posts = posts.filter((post) => post.category === "tip");
        break;
      case "stories":
        posts = posts.filter((post) => post.category === "story");
        break;
      default:
        break;
    }

    return posts;
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="">
      <CreatePost />
      <div className="container w-full rounded-lg p-0 my-4 relative">
        <FaSearch className="absolute top-[35%] left-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 shadow"
        />
      </div>
      {getFilteredPosts().map((post: Post) => (
        <div key={post.id} className="p-4 container rounded-lg shadow mb-4">
          <div className="flex items-center mb-2">
            <Image
              height={40}
              width={40}
              src={post.author.image || "https://i.ibb.co.com/ZX8LhK8/th-4.jpg"} // Default profile picture
              alt="profile"
              className="w-10 h-10 object-cover rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
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
        <CommentModal isOpen={modalIsOpen} onRequestClose={closeModal} post={data?.data?.comments} />
      )}
    </div>
  );
};

export default NewsFeedPage;
