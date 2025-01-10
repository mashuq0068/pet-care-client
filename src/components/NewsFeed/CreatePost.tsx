import React, { useState, ChangeEvent } from "react";
import {
  FaCommentDots,
  FaLightbulb,
  FaBookOpen,
  FaThumbsUp,
  FaLink,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilter } from "@/redux/features/filter/filterSlice";
import { useCreatePostMutation } from "@/redux/features/posts/posts.api";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { AiOutlineClose } from "react-icons/ai";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.auth);
  const [addPost] = useCreatePostMutation();
  const [editorContent, setEditorContent] = useState<string>("");
  const [category, setCategory] = useState<string>("tip");
  const [imageUrl, setImageUrl] = useState<string>("");
  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector((state) => state.filter.selectedFilter);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleImageUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addPost({
        content: editorContent,
        image: imageUrl,
        category,
      }).unwrap();

      toast.success("Post created successfully!");
      setEditorContent("");
      setImageUrl("");
      setCategory("tip");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  const handleFilterClick = (
    filter: "mostUpvoted" | "mostCommented" | "tips" | "stories"
  ) => {
    dispatch(setFilter(filter));
  };

  return (
    <>
      <div className="rounded-lg container shadow p-4 mb-4 mt-8">
        {/* Post Input */}
        <div className="flex items-center mb-2">
          <img
            height={40}
            width={40}
            src={`${user?.image}`}
            alt="profile"
            className="w-10 h-10 object-cover rounded-full mr-3"
          />
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-gray-100 theme-bg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="What's on your mind?"
            onClick={openModal}
          />
        </div>

        {/* Post Categories */}
        <div className="md:flex grid gap-2 grid-cols-2 md:text-base text-sm flex-wrap mt-4 lg:gap-5 md:justify-between">
          <button
            className={`flex items-center hover:text-purple-500 ${
              selectedFilter === "mostUpvoted" ? "text-purple-500" : ""
            }`}
            onClick={() => handleFilterClick("mostUpvoted")}
          >
            <FaThumbsUp className="mr-2 text-xl text-purple-500" /> Most Upvoted
          </button>
          <button
            className={`flex items-center hover:text-green-500 ${
              selectedFilter === "mostCommented" ? "text-green-500" : ""
            }`}
            onClick={() => handleFilterClick("mostCommented")}
          >
            <FaCommentDots className="mr-2 text-green-500 text-xl" /> Most
            Commented
          </button>
          <button
            className={`flex items-center hover:text-yellow-500 ${
              selectedFilter === "tips" ? "text-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("tips")}
          >
            <FaLightbulb className="mr-1 text-yellow-500 text-xl" /> Tips
          </button>
          <button
            className={`flex items-center hover:text-purple-500 ${
              selectedFilter === "stories" ? "text-purple-500" : ""
            }`}
            onClick={() => handleFilterClick("stories")}
          >
            <FaBookOpen className="mr-1 text-purple-500 text-xl" /> Stories
          </button>
        </div>

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
              <h2 className="text-xl font-semibold mb-4">Create Post</h2>
              <form onSubmit={handleSubmit}>
                <ReactQuill
                  value={editorContent}
                  onChange={setEditorContent}
                  placeholder="What's on your mind?"
                  className="border-none shadow-sm rounded-md"
                />
                <div className="mt-4">
                  <select
                    required
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 shadow"
                  >
                    <option value="tip">Tip</option>
                    <option value="story">Story</option>
                  </select>
                </div>
                <div className="mt-4 flex flex-col space-y-4">
                  <div className="relative flex items-center">
                    <FaLink className="absolute left-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 shadow"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeModal}
                    className="mr-2 py-2 px-4 text-black bg-gray-200 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;
