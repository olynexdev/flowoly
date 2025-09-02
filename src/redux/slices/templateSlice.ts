import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TemplateState {
  selectedCategory: string;
  searchQuery: string;
}

const initialState: TemplateState = {
  selectedCategory: 'all',
  searchQuery: '',
};

const templateSlice = createSlice({
  name: 'template',
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

export const { setCategory, setSearchQuery } = templateSlice.actions;
export default templateSlice.reducer;
