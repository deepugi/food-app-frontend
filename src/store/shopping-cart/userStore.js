import { createSlice } from '@reduxjs/toolkit';



const initialState = {
   userDetails: []

};

export const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

// export const menuInitialState  = {
//   menuList: [],
// }

export const { setUserDetails } = userStore.actions;

// export const useLoader = () => store.getState().loader.loading;


export default userStore.reducer;





