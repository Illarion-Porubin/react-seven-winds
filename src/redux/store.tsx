import { configureStore } from "@reduxjs/toolkit";
import { projectsApi } from "./projectsApi";


export const store = configureStore({
    reducer: {
        [projectsApi.reducerPath]: projectsApi.reducer,
    },
    middleware: (getDefultMiddlware) => getDefultMiddlware().concat(projectsApi.middleware)
})