/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  FaThumbsUp,
  FaHeart,
  FaLaughSquint,
  FaSadTear,
  FaAngry,
} from "react-icons/fa";
import { useAddReactionMutation } from "@/redux/features/posts/posts.api";
import { MdOutlineAddReaction } from "react-icons/md";

const reactionTypes: Record<string, { icon: JSX.Element; label: string }> = {
  like: { icon: <FaThumbsUp className=" text-blue-500" />, label: "Like" },
  love: { icon: <FaHeart className=" text-red-500" />, label: "Love" },
  haha: { icon: <FaLaughSquint className=" text-yellow-500" />, label: "Haha" },
  sad: { icon: <FaSadTear className=" text-yellow-500" />, label: "Sad" },
  angry: { icon: <FaAngry className=" text-orange-600" />, label: "Angry" },
};

interface ReactionProps {
  postId: string;
  reactions: { user: string; type: string }[]; // Reactions array with user and type
}


const Reaction: React.FC<ReactionProps> = ({ postId, reactions }) => {
  const [hovered, setHovered] = useState(false); // Controls reaction popover
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null); // User's selected reaction
  const [addReaction] = useAddReactionMutation();
  const reactionArray = Object.entries(reactions).map(([type, count]) => ({
    type,
    count,
    icon: reactionTypes[type]?.icon,
  }));
  // Count reactions for each type
  const countReactions = (type: string) => {
    return reactions.filter((reaction) => reaction.type === type).length;
  };

  const handleReaction = async (type: string) => {
    try {
      await addReaction({ postId, type }).unwrap();
      setSelectedReaction(type);
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };
  const topReactions = Object.entries(reactionTypes)
    .slice(0, 3) // Only show top 3 reactions (or all reactions if fewer than 3)
    .map(([reaction, count]) => ({
      type: reaction,
      count,
      icon: reactionTypes[reaction]?.icon,
    }));
  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setHovered(!hovered)}
      >
        {selectedReaction ? (
          <div className="flex items-center gap-1 ">
            {reactionTypes[selectedReaction].icon}
            <span>{reactionTypes[selectedReaction].label}</span>
          </div>
        ) : (
          <span className="relative md:flex hidden gap-2 items-center text-gray-500">
        <span className=" text-nowrap flex items-center gap-1"><MdOutlineAddReaction className=" text-yellow-500" />reactions</span>
          { reactions?.length}
        </span>
        )}
      </div>

      {/* Reaction Popover */}
      {hovered && (
        <div
          className="absolute flex gap-2 bg-white shadow-md p-2 rounded-lg -top-10 left-0 z-10"
          onMouseEnter={() => setHovered(true)} // Keep popover open
          onMouseLeave={() => setHovered(false)} // Close popover when leaving
        >
          {Object.entries(reactionTypes).map(([type, { icon, label }]) => (
            <button
              key={type}
              className="hover:scale-110 transition-transform"
              onClick={() => handleReaction(type)}
            >
              {icon}
            </button>
          ))}
        </div>
      )}

      {/* Reaction Counts */}
      {/* <div className="flex gap-2 mt-2 text-sm text-gray-600">
        {Object.entries(reactionTypes).map(([type, { icon, label }]) => (
          <div key={type} className="flex items-center gap-1">
            {icon}
            <span>{countReactions(type)}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Reaction;
