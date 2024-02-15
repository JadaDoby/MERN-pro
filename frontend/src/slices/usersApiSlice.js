import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { productsApiSlice } from "./productsApiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url:`${USER_URL/auth}`,
          method:'POST',
          body: data,
        }),
       
      }),  
        register:builder.mutation({
          query:((data)=>({
            url:`${USERS_URL}`,
            method:'POST',
            body:data,
          })),
        }),
     logout:builder.mutation({
      query:()=>({
        url:`${USERS_URL}/logout`,
        method:'POST',
       }),
    }),
      profile:builder.mutation({
        query:(data)=> ({
          url:`${USERS_URL}/logout`,
          method:'PUT',

        }),
      }),
  }),
});

  export const {useLoginMutation,useLogoutMutation,
    useRegisterMutation, useProfileMutation}=usersApiSlice;