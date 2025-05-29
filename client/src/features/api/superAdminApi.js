import {createApi, fetchBaseQuery, QueryStatus} from "@reduxjs/toolkit/query/react";


const SUPER_ADMIN_API="http://localhost:8080/api/v1/superadmin/"
export const superAdminApi=createApi({
    reducerPath:"superAdminApi",
    baseQuery:fetchBaseQuery({
        baseUrl:SUPER_ADMIN_API,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        getDashboardDetails:builder.query({         //mutation to post data and query to get data
            query:()=>({
                url:"getAllCourses",                 //register gets attached to USER_API at last
                method:"GET"
            })
        }),
        sendInstructorRequest:builder.mutation({
            query:({data})=>({
                url:"req/instructor",
                method:"POST",
                body:data
            })
        }),
        getPendingRequest:builder.query({
            query:()=>({
                url:"req/getPendingRequests",
                method:"GET"
            })
        })   
    })
});

export const {
    useGetDashboardDetailsQuery,
    useSendInstructorRequestMutation    ,
    useGetPendingRequestQuery
}=superAdminApi;