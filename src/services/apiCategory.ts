import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {APP_ENV} from "../env";
import {ICategoryItem, ICategoryPostRequest, ICategoryPutRequest} from "./types.ts";


// Define the API slice
export const apiCategory = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}` }), // Replace with your base API URL
    tagTypes: ["Category"], // Додаємо tag для категорій
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryItem[], void>({
            query: () => 'categories', // Replace with your endpoint
            providesTags: ["Category"], // Позначаємо, що цей запит пов'язаний з "Category"
        }),
        getCategory: builder.query<ICategoryItem, number>({
            query: (id) => `categories/${id}`,
            providesTags: (_, __, id) => [{ type: 'Category', id }],
        }),
        createCategory: builder.mutation<ICategoryItem, ICategoryPostRequest>({
            query: (newCategory) => ({
                url: 'categories',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ["Category"], 
        }),
        updateCategory: builder.mutation<ICategoryItem, ICategoryPutRequest>({
            query: ({ id, ...updatedCategory }) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Category"],
        }),

    }),
});

// Export the auto-generated hook
export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation, } = apiCategory;
