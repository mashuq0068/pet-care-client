/* eslint-disable react-hooks/rules-of-hooks */
import baseApi from "@/redux/api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/users/me",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    sendFriendRequest: builder.mutation({
      query: ({ userId, targetUserId }) => ({
        url: `/users/send-friend-request`,
        method: "POST",
        body: { userId, targetUserId },  // Pass both userId and targetUserId
      }),
      invalidatesTags: ["user"],
    }),

    acceptFriendRequest: builder.mutation({
      query: ({ userId, requestId }) => ({
        url: `/users/accept-friend-request`,
        method: "POST",
        body: { userId, requestId },  // Pass both userId and requestId
      }),
      invalidatesTags: ["user"],
    }),

    removeFriend: builder.mutation({
      query: ({ userId, friendId }) => ({
        url: `/users/remove-friend`,
        method: "POST",
        body: { userId, friendId },  // Pass both userId and friendId
      }),
      invalidatesTags: ["user"],
    }),
    removeFriendRequest: builder.mutation({
      query: ({ userId, requestedId }) => ({
        url: `/users/remove-friend-request`,
        method: "POST",
        body: { userId, requestedId },  
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRemoveFriendMutation,
  useRemoveFriendRequestMutation
} = usersApi;
