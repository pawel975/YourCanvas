import { configureStore } from '@reduxjs/toolkit';
import createNewProjectButtonReducer from '../layouts/NavBar/CreateNewProjectMenu/redux/createNewProjectMenuSlice';

const store = configureStore({
  reducer: {
    createNewProjectButton: createNewProjectButtonReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
