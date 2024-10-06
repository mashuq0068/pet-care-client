"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { FaCommentDots, FaLightbulb, FaBookOpen, FaThumbsUp, FaUpload } from "react-icons/fa";
import Modal from "react-modal";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Quill styles

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>(""); // For storing editor content
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Open the modal when clicking the input
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
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
          className="w-full p-2 rounded-lg bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What's on your mind?"
          onClick={openModal} // Open modal on click
        />
      </div>

      {/* Post Categories */}
      <div className="flex flex-wrap mt-4 gap-lg-0 gap-5 md:justify-between">
        <button className="flex items-center hover:text-blue-500 transition-colors">
          <FaThumbsUp className="mr-2 text-xl text-blue-500" /> Most Upvoted
        </button>
        <button className="flex items-center hover:text-green-500 transition-colors">
          <FaCommentDots className="mr-2 text-green-500 text-xl" /> Most Commented
        </button>
        <button className="flex items-center hover:text-yellow-500 transition-colors">
          <FaLightbulb className="mr-1 text-yellow-500 text-xl" /> Tips
        </button>
        <button className="flex items-center hover:text-purple-500 transition-colors">
          <FaBookOpen className="mr-1 text-purple-500 text-xl" /> Stories
        </button>
      </div>

      {/* Modal for Creating Post */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content rounded-lg shadow-lg p-4"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        contentLabel="Create Post Modal"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Create Post</h2>

          {/* Rich Text Editor */}
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            placeholder="What's on your mind?"
            className="border-none shadow-sm rounded-md"
          />

          {/* Image Upload */}
          <div className="mt-4 flex items-center space-x-4">
            <label className="cursor-pointer flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              <FaUpload className="mr-2" /> Upload Image
              <input type="file" onChange={handleImageUpload} className="hidden" />
            </label>

            {selectedImage && (
              <Image
                height={100}
                width={100}
                src={selectedImage}
                alt="Selected"
                className="rounded-lg shadow-md object-cover"
              />
            )}
          </div>

          {/* Modal Buttons */}
          <div className="flex justify-end mt-4">
            <button onClick={closeModal} className="mr-2 py-2 px-4 text-black bg-gray-200 rounded-lg hover:bg-gray-400 transition-colors">
              Cancel
            </button>
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
