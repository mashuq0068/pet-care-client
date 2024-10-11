import baseApi from "@/redux/api/baseApi";

const stripePaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => {
        return {
          url: `/stripe/create-payment-intent`,
          method: "POST",
          body:data
         
        };
      },
    }),
  }),
});
export const  {useCreatePaymentIntentMutation} = stripePaymentApi