import { configureStore } from '@reduxjs/toolkit';
import createNewProjectButtonReducer from '../layouts/NavBar/CreateNewProjectMenu/redux/createNewProjectMenuSlice';
import toolSelectionReducer from '../layouts/ToolBar/ToolSelection/redux/toolSelectionSlice';
import colorSelectionReducer from '../layouts/ToolBar/ColorSelection/redux/colorSelectionSlice';
import toolSizeSelectionReducer from '../layouts/ToolBar/ToolSizeSelection/redux/toolSizeSelectionSlice';
import snapshotHistoryReducer from '../features/snapshotHistory/redux/snapshotHistorySlice';

const store = configureStore({
  reducer: {
    createNewProjectButton: createNewProjectButtonReducer,
    toolSelection: toolSelectionReducer,
    colorSelection: colorSelectionReducer,
    toolSizeSelection: toolSizeSelectionReducer,
    snapshotHistory: snapshotHistoryReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
