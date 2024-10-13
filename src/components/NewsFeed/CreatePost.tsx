import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import {
  FaCommentDots,
  FaLightbulb,
  FaBookOpen,
  FaThumbsUp,
  FaLink,
} from "react-icons/fa";
import Modal from "react-modal";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useCreatePostMutation } from "@/redux/features/posts/posts.api";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilter } from "@/redux/features/filter/filterSlice";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addPost] = useCreatePostMutation();
  const [editorContent, setEditorContent] = useState<string>(""); // For storing editor content
  const [category, setCategory] = useState<string>("tip"); // New state for category selection
  const [imageUrl, setImageUrl] = useState<string>(""); // State for the image URL
  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector((state) => state.filter.selectedFilter);
  // Handle category change
  const handleCategoryChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    setCategory(event.target.value);
  };

  // Handle image URL change
  const handleImageUrlChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setImageUrl(event.target.value);
  };

  // Open the modal when clicking the input
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addPost({
        content: editorContent,
        image: imageUrl,
        category,
      }).unwrap();

      // Show success message
      toast.success("Post created successfully!");

      // Reset form and close modal
      setEditorContent("");
      setImageUrl("");
      setCategory("tip");
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  // Close modal function
  const closeModal = (): void => {
    setIsModalOpen(false);
  };
  const handleFilterClick = (
    filter: "mostUpvoted" | "mostCommented" | "tips" | "stories"
  ) => {
    dispatch(setFilter(filter));
  };

  return (
    <>
      <div className="rounded-lg container shadow p-4 mb-4 mt-8">
        {/* Post Creation Input */}
        <div className="flex items-center mb-2">
          <Image
            height={40}
            width={40}
            src="https://i.ibb.co.com/ZX8LhK8/th-4.jpg"
            alt="profile"
            className="w-10 h-10 object-cover rounded-full mr-3"
          />
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-gray-100 theme-bg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="What's on your mind?"
            onClick={openModal} // Open modal on click
          />
        </div>
        {/* Post Categories */}
        <div className="flex flex-wrap mt-4 gap-lg-0 gap-5 md:justify-between">
          <button
            className={`flex items-center hover:text-purple-500 transition-colors ${
              selectedFilter === "mostUpvoted" ? "text-purple-500" : ""
            }`}
            onClick={() => handleFilterClick("mostUpvoted")}
          >
            <FaThumbsUp className="mr-2 text-xl text-purple-500" /> Most Upvoted
          </button>
          <button
            className={`flex items-center hover:text-green-500 transition-colors ${
              selectedFilter === "mostCommented" ? "text-green-500" : ""
            }`}
            onClick={() => handleFilterClick("mostCommented")}
          >
            <FaCommentDots className="mr-2 text-green-500 text-xl" /> Most
            Commented
          </button>
          <button
            className={`flex items-center hover:text-yellow-500 transition-colors ${
              selectedFilter === "tips" ? "text-yellow-500" : ""
            }`}
            onClick={() => handleFilterClick("tips")}
          >
            <FaLightbulb className="mr-1 text-yellow-500 text-xl" /> Tips
          </button>
          <button
            className={`flex items-center hover:text-purple-500 transition-colors ${
              selectedFilter === "stories" ? "text-purple-500" : ""
            }`}
            onClick={() => handleFilterClick("stories")}
          >
            <FaBookOpen className="mr-1 text-purple-500 text-xl" /> Stories
          </button>
        </div>
        {/* Modal for Creating Post */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="bg-white theme-bg rounded-lg p-2 w-full shadow-xl max-w-lg mx-auto"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          contentLabel="Create Post Modal"
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>
            {/* Rich Text Editor */}
            <form onSubmit={handleSubmit}>
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                placeholder="What's on your mind?"
                className="border-none shadow-sm rounded-md"
              />
              {/* Category Selection */}
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
              {/* Image URL Input */}
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
              {/* Modal Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="mr-2 py-2 px-4 text-black bg-gray-200 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Post
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      
    </>
  );
};

export default CreatePost;
