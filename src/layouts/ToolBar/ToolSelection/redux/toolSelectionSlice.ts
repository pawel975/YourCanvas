import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AvailableToolId = string & ('marker' | 'rect');

interface ToolSelection {
  tool: AvailableToolId;
}

const initialState: ToolSelection = {
  tool: 'marker',
};

export const toolSelectionSlice = createSlice({
  name: 'toolSelection',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<AvailableToolId>) => {
      state.tool = action.payload;
    },
  },
});

export const { setTool } = toolSelectionSlice.actions;

export default toolSelectionSlice.reducer;
