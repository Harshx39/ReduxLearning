import { configureStore, createSlice } from '@reduxjs/toolkit';


const savedCart = localStorage.getItem('cartState');
const initialCartState = savedCart
  ? JSON.parse(savedCart)
  : { items: [], discount: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (quantity <= 0) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.discount = 0;
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    }
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: []
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount
} = cartSlice.actions;

export const {
  addToWishlist,
  removeFromWishlist
} = wishlistSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer
  }
});

// Save to localStorage
store.subscribe(() => {
  localStorage.setItem('cartState', JSON.stringify(store.getState().cart));
});

export default store;
