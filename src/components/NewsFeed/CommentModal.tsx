import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import moment from "moment"; // Import Moment.js for time formatting

export interface Comment {
  id: number;
  author: string;
  text: string;
  authorImage: string;
  createdAt: Date;
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

interface CommentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  post: Post;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onRequestClose, post }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(post.comments);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: comments.length + 1,
        author: "You",
        text: newComment,
        authorImage: "/path-to-your-avatar-image.jpg", // Replace with user's profile image
        createdAt: new Date(),
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
     className="bg-white theme-bg rounded-lg p-8 w-full shadow-xl max-w-md mx-auto"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className=" rounded-lg  md:max-w-lg mx-auto">
      <div className="flex items-center mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none "
          />
          <button
            onClick={handleAddComment}
            className="bg-purple-500 text-white theme-text p-3 border rounded-r-lg hover:bg-purple-600 transition-all"
          >
           Comment
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 ">Comments</h2>
        <div className="mb-6 max-h-60 overflow-y-auto ">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-center mb-5">
                {/* Avatar Image */}
                <Image
                  src={comment.authorImage}
                  alt={comment.author}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 mr-3 object-cover"
                />
                <div className="flex-1 bg-purple-100 theme-bg theme-text p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold theme-text text-gray-800">{comment.author}</p>
                    {/* Relative Time using Moment.js */}
                    <span className="text-sm theme-text text-gray-500">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="text-gray-700 theme-text">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 theme-text">No comments yet. Be the first to comment!</p>
          )}
        </div>
        
      </div>
    </ReactModal>
  );
};

export default CommentModal;
