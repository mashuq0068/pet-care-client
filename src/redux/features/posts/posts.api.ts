/* eslint-disable react-hooks/rules-of-hooks */
import baseApi from "@/redux/api/baseApi";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (queryParams) => ({
        url: `/posts/`,
        method: "GET",
        params: {
          ...queryParams,
        },
      }),
      providesTags: ["post"],
    }),

    
    getSinglePost: builder.query({
      query: (id) => ({ url: `posts/${id}` }),
      providesTags: ["post"],
    }),
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["post"],
    }),

    updatePost: builder.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        console.log("id",id);
        return {
          url: `/posts/${id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["post"],
    }),

    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),

    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["post"],
    }),

    voteOnPost: builder.mutation({
      query: ({ postId, isUpvote }) => ({
        url: `/posts/${postId}/vote`,
        method: "POST",
        body: { isUpvote },
      }),
      invalidatesTags: ["post"],
    }),
    followUser: builder.mutation({
      query: (userId) => ({
        url: `/posts/follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["user" , "post"],
    }),

    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `/posts/unfollow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["user", "post"],
    }),
     // Add a reaction to a post
 // Add a reaction to a post
 addReaction: builder.mutation({
  query: ({ postId, type }) => ({
    url: `/posts/${postId}/reactions`,
    method: "POST",
    body: { type },
  }),
  invalidatesTags: ["post"],
}),

// Remove a reaction from a post
removeReaction: builder.mutation({
  query: ({ postId, type }) => ({
    url: `/posts/${postId}/reactions`,
    method: "DELETE",
    body: { type },
  }),
  invalidatesTags: ["post"],
}),

// Get reaction counts for a post
getReactionCounts: builder.query({
  query: (postId) => ({
    url: `/posts/${postId}/reactions/counts`,
    method: "GET",
  }),
  providesTags: ["post"],
}),


  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useVoteOnPostMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useAddReactionMutation, 
  useRemoveReactionMutation, 
  useGetReactionCountsQuery, 
} = postsApi;
