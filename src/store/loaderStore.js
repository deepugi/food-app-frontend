// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from './store';

// export interface LoaderState {
//   loading: boolean,
//   message: string,
//   navigatorLoader: boolean,
// }

// const initialState: LoaderState = {
//   loading: false as boolean,
//   message: '' as string,
//   navigatorLoader: false,
// };

// export const loaderStore = createSlice({
//   name: 'loader',
//   initialState,
//   reducers: {
//     setLoader: (state, action) => {
//       state.loading = action.payload;
//     },
//     setMessage: (state, action) => {
//       state.message = action.payload;
//     },
//     setNavigatorLoader: (state, action) => {
//       state.navigatorLoader = action.payload;
//     },
//   },
// });

// export const { setLoader, setMessage, setNavigatorLoader } = loaderStore.actions;

// // export const useLoader = (state: RootState) => state.loader.loading;

// export default loaderStore.reducer;
