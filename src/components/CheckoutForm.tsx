import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { Store } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import type { ErrorResponse } from "../pages/Register";

export const action =
	(store: Store) =>
	async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const { name, address } = Object.fromEntries(formData);
		const user = store.getState().userState.user;
		const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;
		const info = {
			name,
			address,
			chargeTotal: orderTotal,
			orderTotal: formatPrice(orderTotal),
			cartItems,
			numItemsInCart,
		};
		try {
			await customFetch.post(
				"/orders",
				{ data: info },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			store.dispatch(clearCart());
			toast.success("order placed successfully");
			return redirect("/orders");
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				const axiosError = error as AxiosError<ErrorResponse>;
				const errorMessage =
					axiosError.response?.data?.error?.message ||
					"there was an error placing your order";
				toast.error(errorMessage);
				if (
					axiosError.response?.status === 401 ||
					axiosError.response?.status === 403
				)
					return redirect("/login");
				return null;
			} else {
				return null;
			}
		}
	};
const CheckoutForm = () => {
	return (
		<Form
			method="POST"
			className="flex flex-col gap-y-4"
		>
			<h4 className="font-medium text-xl capitalize">Shipping Information</h4>
			<FormInput
				label="first name"
				name="name"
				type="text"
			/>
			<FormInput
				label="address"
				name="address"
				type="text"
			/>
			<div className="mt-4">
				<SubmitBtn text="place your order" />
			</div>
		</Form>
	);
};
export default CheckoutForm;
