import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  kategori: number;
}

const initialState: { data: FilterState } = {
  data: {
    kategori: 0,
  },
};

const filterSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setFilterCategory: (state, action: PayloadAction<number>) => {
      state.data = {
        kategori: action.payload,
      };
    },
    clearFilter: (state) => {
        state.data = {
            kategori: 0,
        }
    }
  },
});

export const { setFilterCategory, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
