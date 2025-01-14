/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Posts.tsx
"use client";
import { useGetPostsQuery, useUpdatePostMutation } from "@/redux/features/posts/posts.api";
import React from "react";
import { RxEyeNone } from "react-icons/rx";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

const Posts: React.FC = () => {
  const { data, isLoading } = useGetPostsQuery(undefined);
  const [updatePost] = useUpdatePostMutation();
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  const handlePublishToggle = async (post: any) => {
    const newStatus = post.isPublished === undefined || post.isPublished ? false : true;
    const payload = {
      id: post._id,
      isPublished: newStatus, 
    };

    try {
      await updatePost(payload).unwrap(); 
      toast.success(newStatus ? "Post published successfully!" : "Post unpublished successfully!");
    } catch  {
      toast.error("Failed to update post status.");
    }
  };

  return (
    <div className="max-w-3xl p-8 rounded-lg mt-8 shadow-md bg-white mx-auto">
      <h4 className="text-2xl font-bold mb-6 theme-text text-gray-800">Manage Posts</h4>
      <table className="min-w-full bg-white theme-bg rounded-lg shadow">
        <thead>
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Post</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((post: any) => (
            <tr key={post._id} className="border-b ">
              <td className="p-3 flex items-center">
                <img
                  src={post?.image}
                  width={70}
                  height={70}
                  alt={post.title}
                  className="rounded-md mr-2"
                />
              </td>
              <td
                className="p-3"
                dangerouslySetInnerHTML={{
                  __html: post.content.length > 25
                    ? `${post.content.slice(0, 25)}...`
                    : post.content,
                }}
              />
              <td className="p-3">{post?.isPremium ? "premium" : "Not Premium"}</td>
              <td className="p-3">
                <button
                  className={`${
                    post.isPublished === undefined || post.isPublished
                      ? "bg-red-500"
                      : "bg-purple-500"
                  } text-white px-4 py-1 rounded flex items-center`}
                  onClick={() => handlePublishToggle(post)}
                >
                  {post.isPublished === undefined || post.isPublished ? (
                    <>
                      <RxEyeNone className="mr-1" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <MdOutlinePublishedWithChanges className="mr-1" />
                      Publish
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
