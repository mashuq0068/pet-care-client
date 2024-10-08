// FollowModal.tsx
import React from "react";
import ReactModal from "react-modal";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  profileImage: string;
  title: string; // Add a title property if you want to display a title
}

interface FollowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  followers: User[];
  following: User[];
}

const FollowModal: React.FC<FollowModalProps> = ({
  isOpen,
  onRequestClose,
  followers,
  following,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Followers</h2>
        <div className="mb-4 max-h-60 overflow-y-auto">
          {followers.length > 0 ? (
            followers.map((user) => (
              <div key={user.id} className="flex items-center mb-3">
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500">{user.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No followers yet.</p>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">Following</h2>
        <div className="max-h-60 overflow-y-auto">
          {following.length > 0 ? (
            following.map((user) => (
              <div key={user.id} className="flex items-center mb-3">
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500">{user.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Not following anyone yet.</p>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export default FollowModal;
