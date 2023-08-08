import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface snapshotHistory {
  snapshots: Array<string>;
  currentSnapshotId: number;
  isSnapshotEditingActive: boolean;
}

const initialState: snapshotHistory = {
  snapshots: [],
  currentSnapshotId: 0,
  isSnapshotEditingActive: false,
};

export const snapshotHistorySlice = createSlice({
  name: 'snapshotHistory',
  initialState,
  reducers: {
    saveSnapshotToHistory: (state, action: PayloadAction<string>) => {
      state.snapshots.push(action.payload);
    },
    updateSnapshotHistory: (state, action: PayloadAction<Array<string>>) => {
      state.snapshots = action.payload;
    },
    updateCurrentSnapshotId: (state, action: PayloadAction<number>) => {
      state.currentSnapshotId = action.payload;
    },
    setIsSnapshotEditingActive: (state, action: PayloadAction<boolean>) => {
      state.isSnapshotEditingActive = action.payload;
    },
  },
});

export const {
  saveSnapshotToHistory,
  updateSnapshotHistory,
  updateCurrentSnapshotId,
  setIsSnapshotEditingActive,
} = snapshotHistorySlice.actions;

export default snapshotHistorySlice.reducer;
