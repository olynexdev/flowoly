import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogsState {
  selectedCategory: string;
  searchQuery: string;
}

const initialState: BlogsState = {
  selectedCategory: 'all',
  searchQuery: '',
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategory, setSearchQuery } = blogsSlice.actions;
export default blogsSlice.reducer;
