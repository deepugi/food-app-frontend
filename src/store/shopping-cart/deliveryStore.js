// import store  from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
  deliveryDetails: [],
  allDeliveryList: [],
  deliveryOption: [],
  deliveryInstruction: '',
  setDeliveryAvaialability: false,
  deliveryratings: 0,
};

export const deliveryStore = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDeliveryState: (state, action) => {
      state.deliveryDetails = action.payload;
      console.log('deliveryDetails', action.payload);
    },
    setAllDeliveryList: (state, action) => {
      state.allDeliveryList = action.payload;
      console.log('deliveryDetails', action.payload);
    },
    deleteDeliveryAgent: (state, action) => {
      console.log('inside deleteOrder Items', action.payload);
      const Id = action.payload;
      console.log('inside deleteOrder Items', Id);
      state.allDeliveryList = state.allDeliveryList.filter((item) => item.Id !== Id);
    },
    setNewDeliveryList: (state, action) => {
      console.log('inside deleteOrder Items', action.payload);
      const Id = action.payload;
      console.log('inside deleteOrder Items', Id);
      (state.allDeliveryList).push(action.payload);
      console.log('state.allDeliveryList', state.allDeliveryList);
    },
    setDeliveryOption: (state, action) => {

      state.deliveryOption = action.payload;
      // state.allDeliveryList.map((item) => {

      //   (state.deliveryOption).push({
      //     label: item.Name,
      //     value: item.Id
      //   })

      // })
    },

    deleteDeliveryOptions: (state, action) => {
      // console.log('inside deleteOrder Items', action.payload);
      // const Id = action.payload;
      // console.log('inside deleteOrder Items', Id);
      // state.deliveryOption = state.deliveryOption.splice(0, Id);
      console.log('inside deleteOrder Items', action.payload);
      const Id = action.payload;
      console.log('inside deleteOrder Items', Id);
      
      state.deliveryOption = (state.deliveryOption).filter((item) => {
      
        console.log('item.id', item.Id);
       
        console.log('typeof', typeof Id);
        console.log('typeof Item.id', typeof (item.Id));
      
         return (item.Id !== Id )
      }
      );

      console.log('deliveryOptions', state.deliveryOption);
    
    },

    setDeliveryInstruction: (state, action) => {

      state.deliveryInstruction = action.payload;

    },

    setDeliveryAvaialbility: (state, action) => {

      state.setDeliveryAvaialability = action.payload;

    },

    setDeliveryRatings: (state, action) => {

      state.deliveryratings = action.payload;

    },

  },
});

export const menuInitialState = {
  deliveryDetails: [],
}

export const { setDeliveryState, setAllDeliveryList, deleteDeliveryAgent, setNewDeliveryList, setDeliveryOption, deleteDeliveryOptions, setDeliveryInstruction, setDeliveryAvaialbility, setDeliveryRatings } = deliveryStore.actions;

// export const useLoader = () => store.getState().loader.loading;


export default deliveryStore.reducer;





