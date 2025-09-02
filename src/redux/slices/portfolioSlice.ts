import { ProjectT, PortfolioState } from '@/types/portfolioTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all portfolios
export const fetchPortfolios = createAsyncThunk<ProjectT[]>(
  'portfolio/fetchPortfolios',
  async () => {
    const res = await axios.get('/api/portfolio/get-portfolio');
    return res.data?.data;
  }
);

// Fetch portfolio by ID
export const fetchPortfolioById = createAsyncThunk<ProjectT, string>(
  'portfolio/fetchPortfolioById',
  async id => {
    const res = await axios.get(`/api/portfolio/get-portfolio?id=${id}`);
    return res.data.data;
  }
);

// Initial state
const initialState: PortfolioState = {
  portfolios: [],
  selectedPortfolio: null,
  loading: false,
  error: false,
};

// Portfolio slice
const portfolioSlice = createSlice({
  name: 'Portfolio',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch all portfolios
      .addCase(fetchPortfolios.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchPortfolios.fulfilled,
        (state, action: PayloadAction<ProjectT[]>) => {
          state.portfolios = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPortfolios.rejected, state => {
        state.loading = false;
        state.error = true;
      })

      // Fetch portfolio by ID
      .addCase(fetchPortfolioById.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchPortfolioById.fulfilled,
        (state, action: PayloadAction<ProjectT>) => {
          state.selectedPortfolio = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPortfolioById.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default portfolioSlice.reducer;
