/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import { AiFillSave, AiFillEdit } from "react-icons/ai";

const EditProfileModal: React.FC<{ isOpen: boolean; onRequestClose: () => void; profile: any }> = ({
  isOpen,
  onRequestClose,
  profile,
}) => {
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [profileImage, setProfileImage] = useState(profile.profileImage);

  const handleImageChange = (e: any) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    console.log("Profile Updated", { name, title, profileImage });
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className=" bg-white theme-bg rounded-lg p-8 w-full shadow-xl max-w-md mx-auto"
      overlayClassName="modal-overlay bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-bold mb-6 ">Edit Profile</h2>
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center mb-6">
          <label htmlFor="profileImage" className="cursor-pointer relative group">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shadow-lg">
                Upload Image
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <AiFillEdit className="text-white text-2xl" />
            </div>
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>
        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your title"
          />
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-md transition duration-300 ease-in-out shadow-lg flex items-center"
        >
          <AiFillSave className="mr-2" />
          Save Changes
        </button>
      </div>
    </ReactModal>
  );
};

export default EditProfileModal;
