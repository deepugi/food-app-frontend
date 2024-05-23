import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  walletAmount: 0,
  leftAmount: 0
};

export const walletStore = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAmount: (state, action) => {
      state.walletAmount = action.payload;
    },

    setLeftAmount: (state, action) => {
        state.leftAmount = action.payload;
    }

  },
});

// export const menuInitialState  = {
//   menuList: [],
// }

export const { setWalletAmount, setLeftAmount } = walletStore.actions;

// export const useLoader = () => store.getState().loader.loading;


export default walletStore.reducer;





