import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/store';

type AvailableProjectTypes = 'blank' | 'drawing' | 'resume';

interface CreateNewProjectButtonState {
  projectType: string;
}

const initialState: CreateNewProjectButtonState = {
  projectType: 'blank',
};

export const createNewProjectButtonSlice = createSlice({
  name: 'CreateNewProjectButton',
  initialState,
  reducers: {
    setProjectType: (state, action: PayloadAction<AvailableProjectTypes>) => {
      state.projectType = action.payload;
    },
  },
});

export const { setProjectType } = createNewProjectButtonSlice.actions;

export default createNewProjectButtonSlice.reducer;
