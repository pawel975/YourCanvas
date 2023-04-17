import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AvailableColorSelection = string;
//TODO: Check if it's possible to use regex to identify if color is in #000000 format

interface ColorSelection {
  color: AvailableColorSelection;
}

const initialState: ColorSelection = {
  color: '#000000',
};

export const colorSelectionSlice = createSlice({
  name: 'colorSelection',
  initialState,
  reducers: {
    setToolColor: (state, action: PayloadAction<AvailableColorSelection>) => {
      state.color = action.payload;
    },
  },
});

export const { setToolColor } = colorSelectionSlice.actions;

export default colorSelectionSlice.reducer;
