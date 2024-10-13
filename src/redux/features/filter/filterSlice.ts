// src/features/filter/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterOption = 'mostUpvoted' | 'mostCommented' | 'tips' | 'stories';

interface FilterState {
  selectedFilter: FilterOption | null;
}

const initialState: FilterState = {
  selectedFilter: null
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterOption>) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
