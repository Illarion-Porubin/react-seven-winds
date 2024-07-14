import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IDataNode } from "../types";


export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    tagTypes: ['Projects'],
    /// уровни вложенности отображаются корректно, замените 133810 на 4
    baseQuery: fetchBaseQuery({ baseUrl: "http://185.244.172.108:8081/v1/outlay-rows/entity/133810/row/" }),
    endpoints: (build) => ({
        getProjects: build.query({
            query: () => `list`,
            providesTags: (result) => result
                ? [
                    ...result.map((id: string) => ({ type: 'Projects' as const, id })),
                    { type: 'Projects', id: 'LIST' },
                ]
                : [{ type: 'Projects', id: 'LIST' }],
        }),

        addProject: build.mutation({
            query: (body: IDataNode) => ({
                url: 'create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: "Projects", id: "LIST" }]
        }),

        deleteProject: build.mutation({
            query: (id: number) => ({
                url: `${id}/delete`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Projects", id: "LIST" }]
        }),

        updateProject: build.mutation({
            query: (body: IDataNode) => ({
                url: `${body.id}/update`,
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Projects", id: "LIST" }]
        })

    }),
})


export const { useGetProjectsQuery, useAddProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } = projectsApi;