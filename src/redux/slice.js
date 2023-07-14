import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  Auth : false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.item = [...state.item, action.payload];
    },
    removeItemFromBasket: (state, action) => {
      // console.log(action.payload.);
      const index = state.item.findIndex(
        basketItem => basketItem.id === action.payload.id
      );
      let newBasket = [...state.item];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`${action.payload} not an id`);
      }
      state.item = newBasket;
    },
   
  },
});

export const { addToBasket, removeItemFromBasket } = basketSlice.actions;

export const selectItem = (state) => state.basket.item


export default basketSlice.reducer;
