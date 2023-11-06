import { createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { toast } from "react-toastify";

// export interface IUser {
// 	username: string;
// }
// export interface Ithemes {
// 	light: string;
// 	dark: string;
// }
// export interface UserInitialState {
// 	user: IUser | null;
// 	theme: string;
// }

const themes = {
	light: "winter",
	dark: "night",
};

const getUserFromLocalStroage = () => {
	return JSON.parse(localStorage.getItem("user")!) || null;
};

const getThemeFromLocalStorage = () => {
	const theme = localStorage.getItem("theme" || themes.dark);
	document.documentElement.setAttribute("data-theme", theme!);
	return theme;
};
const initialState = {
	user: getUserFromLocalStroage(),
	theme: getThemeFromLocalStorage()!,
};

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		loginUser: (state, action) => {
			const user = { ...action.payload.user, token: action.payload.jwt };
			state.user = user;
			localStorage.setItem("user", JSON.stringify(user));
		},
		logoutUser: (state) => {
			state.user = null;
			localStorage.removeItem("user");
			toast.success("Logged out successfully");
		},
		toggleTheme: (state) => {
			const { dark, light } = themes;
			state.theme = state.theme === dark ? light : dark;
			document.documentElement.setAttribute("data-theme", state.theme);
			localStorage.setItem("theme", state.theme);
		},
	},
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
