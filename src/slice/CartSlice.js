// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import secureLocalStorage from 'react-secure-storage';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(secureLocalStorage.getItem('cart')) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item._id === product._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            secureLocalStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item._id === productId);

            if (item) {
                // Remove the product from the cart
                const index = state.items.findIndex((item) => item._id === productId);
                if (index !== -1) {
                    state.items.splice(index, 1);
                }

                // Save cart data to local storage or remove the item if the cart is empty
                if (state.items.length === 0) {
                    secureLocalStorage.removeItem('cart');
                } else {
                    secureLocalStorage.setItem('cart', JSON.stringify(state.items));
                }
            }
        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item._id === productId);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            else {
                // Remove the product from the cart if the quantity becomes zero
                const index = state.items.findIndex((item) => item._id === productId);
                if (index !== -1) {
                    state.items.splice(index, 1);
                }
            }
            secureLocalStorage.setItem('cart', JSON.stringify(state.items));
        },
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item._id === productId);

            if (item && item.quantity < 10) {
                item.quantity += 1;
                secureLocalStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            secureLocalStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
