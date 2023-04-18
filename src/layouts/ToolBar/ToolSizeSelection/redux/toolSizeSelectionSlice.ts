import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ToolSizeSelection {
  size: number;
}

const initialState: ToolSizeSelection = {
  size: 0,
};

export const toolSizeSelectionSlice = createSlice({
  name: 'toolSizeSelection',
  initialState,
  reducers: {
    setToolSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
  },
});

export const { setToolSize } = toolSizeSelectionSlice.actions;

export default toolSizeSelectionSlice.reducer;
