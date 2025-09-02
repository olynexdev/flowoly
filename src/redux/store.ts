import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './slices/portfolioSlice';
import templateReducer from './slices/templateSlice';
// import logger from 'redux-logger';
import { adminApi, awsApi, blogApi, projectApi, templateApi } from './api';
import userReducer from './slices/userSlice';
import blogReducer from './slices/blogsSlice';
import { employeeApi } from './api/employeeApi';

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    portfolio: portfolioReducer,
    templates: templateReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [awsApi.reducerPath]: awsApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
  },
  // middleware setup
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(adminApi.middleware)
      // .concat(logger)
      .concat(blogApi.middleware)
      .concat(awsApi.middleware)
      .concat(projectApi.middleware)
      .concat(employeeApi.middleware)
      .concat(templateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
