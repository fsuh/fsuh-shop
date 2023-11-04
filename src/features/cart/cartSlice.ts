import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { toast } from "react-toastify";
import { CartProducts } from "../../pages/SingleProduct";

export interface DefaultState {
	cartItems: Array<CartProducts>;
	numItemsInCart: number;
	cartTotal: number;
	shipping: number;
	tax: number;
	orderTotal: number;
}

export type CartData = {
	product: CartProducts;
};

const defaultState: DefaultState = {
	cartItems: [],
	numItemsInCart: 0,
	cartTotal: 0,
	shipping: 500,
	tax: 0,
	orderTotal: 0,
};

const getCartFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("cart")!) || defaultState;
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: getCartFromLocalStorage(),
	reducers: {
		addItem: (state, action: PayloadAction<CartData>) => {
			const { product } = action.payload;
			const item = state.cartItems.find(
				(i: CartProducts) => i.cartID === product.cartID
			);
			if (item) {
				item.amount += product.amount;
			} else {
				state.cartItems.push(product);
			}
			state.numItemsInCart += product.amount;
			state.cartTotal += Number(product.price) * product.amount;
			cartSlice.caseReducers.calculateTotals(state);

			toast.success("Item added to cart");
		},
		clearCart: () => {
			localStorage.setItem("cart", JSON.stringify(defaultState));
			return defaultState;
		},
		removeItem: (state, action: PayloadAction<{ cartID: string }>) => {
			const { cartID } = action.payload;
			//const { cartID } = product;
			const removeItem = state.cartItems.find(
				(i: CartProducts) => i.cartID === cartID
			);
			state.cartItems = state.cartItems.filter(
				(i: CartProducts) => i.cartID !== cartID
			);
			state.numItemsInCart -= removeItem.amount;
			state.cartTotal -= Number(removeItem.price) * removeItem.amount;
			cartSlice.caseReducers.calculateTotals(state);
			toast.error("Item removed from cart");
		},
		editItem: (
			state,
			action: PayloadAction<{ cartID: string; amount: number }>
		) => {
			//const { product } = action.payload;
			const { cartID, amount } = action.payload;
			const item = state.cartItems.find(
				(i: CartProducts) => i.cartID === cartID
			);
			state.numItemsInCart += amount - item.amount;
			state.cartTotal += Number(item.price) * (amount - item.amount);
			item.amount = amount;
			cartSlice.caseReducers.calculateTotals(state);
			toast.success("cart updated");
		},
		calculateTotals: (state) => {
			state.tax = 0.1 * state.cartTotal;
			state.orderTotal = state.cartTotal + state.shipping + state.tax;
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
