"use client"
import { useState } from "react";
import Image from "next/image";

import { FaCommentAlt } from "react-icons/fa";
import { LuBookUp, LuMonitorDown } from "react-icons/lu";
import CreatePost from "@/components/NewsFeed/CreatePost";
import CommentModal from "@/components/NewsFeed/CommentModal";

interface Comment {
  id: number;
  author: string;
  text: string;
  authorImage:string
  createdAt:Date
}

interface Post {
  id: number;
  author: string;
  time: string;
  content: string;
  authorImage: string;
  postImage: string;
  comments: Comment[];
}

const postData: Post[] = [
  {
    id: 1,
    author: "Mission Web Development",
    time: "3h ago",
    content: "যারা যারা Programming Hero Courses গ্রুপে বিয়োকাস্ট করতে পারেনি, এরা রিপোর্ট করতে পারবেন।",
    authorImage: "https://i.ibb.co.com/ZX8LhK8/th-4.jpg",
    postImage: "https://i.ibb.co.com/HFZQYmN/therapeutic-benefits-of-having-a-family-pet.jpg",
    comments: [
      {
        id: 1,
        author: "Alice",
        text: "Great post!",
        authorImage: "https://i.ibb.co.com/ZX8LhK8/th-4.jpg", // random avatar
        createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
      {
        id: 2,
        author: "Bob",
        text: "I totally agree.",
        authorImage: "https://i.ibb.co.com/ZX8LhK8/th-4.jpg",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
    ]
  }
];


const NewsFeedPage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="">
      {/* Create Post Component */}
      <CreatePost />

      {/* Dynamic Posts */}
      {postData.map((post) => (
        <div key={post.id} className="p-4 container rounded-lg shadow mb-4">
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
    </div>
  );
};

export default NewsFeedPage;
