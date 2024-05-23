// import store from './store'; // see this import
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false ,
  role: '' ,
  name: '' ,
  welcomeToast: true ,
  examErrorToast: true ,
  email: '' ,
  id: '',
  credentials: {},
  userId: '',
  reload: false,
};

export const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
        console.log('insidde the authentixated', state.authenticated);
      state.authenticated = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload; 
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setWelcomeToast: (state, action) => {
      state.welcomeToast = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setExamFailureToast: (state, action) => {
      state.examErrorToast = action.payload;
    },
    setCredentials: (state, action) => {
       state.credentials = action.payload;
    },
    clearAuthStore: (state) => {
      state.welcomeToast = true;
      state.authenticated = false;
      state.email = '';
      state.role = '';
      state.name = '';
      state.id = '';
    },
    setReload: (state, action) => {
      state.reload = action.payload;
   },
    
  },
});

// export const {
//   setAuthenticated, setRole, setName, setWelcomeToast, clearAuthStore, setEmail, setId, setExamFailureToast, setCredentials
// } = authStore.actions;

export const AuthState = {
  authenticated: 'boolean',
  role: 'string',
  name: 'string',
  welcomeToast: 'boolean',
  email:'string',
  id: 'string',
  examErrorToast: 'boolean',
  credentials: 'Object'
}

export const {
  setAuthenticated, setRole, setName, setWelcomeToast, clearAuthStore, setEmail, setId, setExamFailureToast, setCredentials, setUserId, setReload
} = authStore.actions;

export default authStore.reducer;