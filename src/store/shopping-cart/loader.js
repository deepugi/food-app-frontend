// import store  from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
loading: true,
};

export const loadingStore = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
     
    },
  },
});


export const { setLoading } = loadingStore.actions;

// export const useLoader = () => store.getState().loader.loading;


export default loadingStore.reducer;





