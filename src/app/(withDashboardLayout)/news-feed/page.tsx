/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  FaCommentAlt,
  FaSearch,
  FaUserPlus,
  FaUserMinus,
  FaBook,
} from "react-icons/fa";
import { LuBookUp, LuLightbulb, LuMonitorDown } from "react-icons/lu";
import CreatePost from "@/components/NewsFeed/CreatePost";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentModal from "@/components/NewsFeed/CommentModal";
import {
  useFollowUserMutation,
  useGetPostsQuery,
  useUnfollowUserMutation,
  useVoteOnPostMutation,
} from "@/redux/features/posts/posts.api";
import { useAppSelector } from "@/redux/hooks";
import { useGetProfileQuery } from "@/redux/features/users/users.api";
import Loading from "@/app/loading";
import Reaction from "@/components/NewsFeed/Reaction";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  image: string;
  following: IUser[];
  followers: IUser[];
  isPremium: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Comment {
  user: IUser;
  content: string;
  createdAt?: string;
}

interface Post {
  _id: string;
  author: IUser;
  content: string;
  image: string;
  comments: Comment[];
  upvotes: string[];
  downvotes: string[];
  category: string;
  createdAt: Date;
  reactions : { user: string; type: string }[]
}

const NewsFeedPage: React.FC = () => {
  const { data: profileData } = useGetProfileQuery(undefined);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { data, isLoading } = useGetPostsQuery(undefined);
  const [voteOnPost] = useVoteOnPostMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const selectedFilter = useAppSelector((state) => state.filter.selectedFilter);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  console.log(posts);
  const postsPerPage = 1;
  useEffect(() => {
    if (data?.data) {
      setPosts(data.data);
      setVisiblePosts(data.data.slice(0, postsPerPage));
    }
  }, [data]);

  const loadMorePosts = () => {
    if (visiblePosts.length >= posts.length) {
      setHasMore(false);
      return;
    }
    const nextPosts = posts.slice(
      visiblePosts.length,
      visiblePosts.length + postsPerPage
    );
    setVisiblePosts((prev) => [...prev, ...nextPosts]);
  };

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const handleUpvote = async (postId: string) => {
    await voteOnPost({ postId, isUpvote: true });
  };

  const handleDownvote = async (postId: string) => {
    await voteOnPost({ postId, isUpvote: false });
  };

  const handleFollowToggle = async (authorId: string) => {
    try {
      const followingIds = Array.isArray(profileData?.data?.following)
        ? profileData?.data?.following
        : [];

      const isFollowing = followingIds.some(
        (follower: any) => follower._id === authorId
      );

      if (isFollowing) {
        await unfollowUser(authorId).unwrap();
      } else {
        await followUser(authorId).unwrap();
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  const getFilteredPosts = () => {
    if (!data?.data) return [];
  
    let posts = [...data.data];
    posts = posts.filter(post => post.isPublished !== false);
  
    if (searchTerm) {
      posts = posts.filter(
        (post) =>
          post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
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
  

  if (isLoading)
    return (
      <p>
        <Loading />
      </p>
    );

  return (
    <div className="">
      <CreatePost />
      <div className="container z-10 w-full rounded-lg p-0 my-4 ">
        <FaSearch className="absolute top-[35%] left-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 shadow"
        />
      </div>
      <InfiniteScroll
        dataLength={visiblePosts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<p className="text-center">No more posts to show</p>}
      >
        {getFilteredPosts().map((post: Post) => (
          <div key={post._id} className="p-4 container rounded-lg shadow mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  height={40}
                  width={40}
                  src={`${post.author.image}`}
                  alt="profile"
                  className="w-10 h-10 object-cover rounded-full mr-3"
                />

                <div>
                  {/* Category section */}
                  <div className="flex gap-2">
                    <p className="font-semibold">{post.author.name}</p>
                    <div className="flex items-center">
                      {post.category === "tip" && (
                        <LuLightbulb className="text-yellow-400 mr-1" />
                      )}
                      {post.category === "story" && (
                        <FaBook className="text-blue-400 mr-1" />
                      )}
                      <span className="font-medium theme-text text-gray-700">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                className="text-sm font-semibold"
                onClick={() => handleFollowToggle(post?.author?._id)}
              >
                {Array.isArray(profileData?.data?.following) &&
                profileData?.data?.following.length > 0 &&
                profileData?.data?.following.some(
                  (follower: any) => follower?._id === post?.author?._id
                ) ? (
                  <>
                    <FaUserMinus className="mr-1 inline" /> Unfollow
                  </>
                ) : (
                  <>
                    <FaUserPlus className="mr-1 inline" /> Follow
                  </>
                )}
              </button>
            </div>

            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.image && (
              <img
                height={550}
                width={550}
                src={post.image}
                alt="post"
                className="object-contain mb-3 rounded-lg"
              />
            )}

            <div className="flex md:text-base text-sm justify-center md:justify-between items-center theme-text text-gray-500">
              <div className="flex  gap-3 md:gap-5 items-center">
                {/* upvote */}
                <div className="flex  gap-1 md:gap-2">
                  <button
                    className="flex items-center"
                    onClick={() => handleUpvote(post._id)}
                  >
                    <LuBookUp className="mr-1" /> Upvote
                  </button>
                  <span className="bg-purple-200 rounded-md theme-bg px-2">
                    {post.upvotes?.length}
                  </span>
                </div>
                {/* downvote */}
                <div className="flex gap-1 md:gap-2">
                  <button
                    className="flex items-center"
                    onClick={() => handleDownvote(post._id)}
                  >
                    <LuMonitorDown className="mr-1" /> Downvote
                  </button>
                  <span className="bg-purple-200 rounded-md theme-bg px-2">
                    {post.downvotes?.length}
                  </span>
                </div>
              </div>
              <Reaction postId={post._id} reactions={post.reactions || {}} />
              <button
                className="flex md:ml-0 ml-3 items-center"
                onClick={() => openModal(post)}
              >
                <FaCommentAlt className="mr-1 theme-text text-gray-400" />{" "}
                {post?.comments?.length}
                Comments
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>

      {selectedPost && (
        <CommentModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          comments={selectedPost?.comments}
          postId={selectedPost?._id}
        />
      )}
    </div>
  );
};

export default NewsFeedPage;
