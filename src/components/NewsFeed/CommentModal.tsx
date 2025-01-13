import React, { useState, useEffect } from "react";
import moment from "moment"; // Import Moment.js for time formatting
import { Comment } from "@/app/(withDashboardLayout)/news-feed/page";
import { useAddCommentMutation } from "@/redux/features/posts/posts.api";
import { AiOutlineClose } from "react-icons/ai";

interface CommentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  comments: Comment[];
  postId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onRequestClose,
  comments,
  postId,
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const [addComment] = useAddCommentMutation();
  const [, setForceRender] = useState(0);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await addComment({ postId, comment: { content: newComment } }).unwrap();
        setNewComment("");
        setForceRender((prev) => prev + 1);
      } catch (error) {
        console.error("Failed to add comment: ", error);
      }
    }
  };

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onRequestClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white theme-bg rounded-lg shadow-xl max-w-lg w-full p-6 relative transform transition-all duration-300 scale-100"
        style={{
          animation: isOpen ? "fadeIn 0.3s ease-out" : "fadeOut 0.3s ease-in",
        }}
      >
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <AiOutlineClose size={18} />
        </button>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#d1d5db #f3f4f6",
          }}
          className="mb-4 max-h-[60vh] overflow-y-auto"
        >
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex items-center pr-5 p-2 mb-4">
                <img
                  src={comment.user.image || "/path-to-your-avatar-image.jpg"}
                  alt={comment.user.name || "author"}
                  className="rounded-full w-10 h-10 mr-3 object-cover"
                />
                <div className="flex-1 bg-gray-100 theme-bg theme-text p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800 theme-text">
                      {comment.user.name}
                    </p>
                    <span className="text-sm text-gray-500 theme-text">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="text-gray-700 theme-text">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 theme-text">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-purple-500 text-white theme-text p-3 border rounded-r-lg hover:bg-purple-600 transition-all"
          >
            Comment
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default CommentModal;
