// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: { email: string; name: string; role: string } | null;
  loading: boolean;
  email: string | null;
}

const initialState: UserState = {
  user: null,
  loading: true,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; name: string; role: string }>
    ) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: state => {
      state.user = null;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;

export default userSlice.reducer;
