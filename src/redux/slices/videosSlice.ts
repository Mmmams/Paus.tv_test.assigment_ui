import { IVideo } from '../../interfaces/IVideo';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: IVideo[] = [];

const videosSlice = createSlice({
  name: 'videosSlice',
  initialState,
  reducers: {
    //@ts-ignore
    setVideoMetadata: (state, { payload }) => payload,
  },
});

export const { setVideoMetadata } = videosSlice.actions;

export default videosSlice.reducer;

// Selectors
export const categoriesSelector = createSelector(
  (state: RootState) => state,
  (state) => state
);
