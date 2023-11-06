import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
	OrdersList,
	ComplexPaginationContainer,
	SectionTitle,
} from "../components";
import { Store } from "@reduxjs/toolkit";
import type { ErrorResponse } from "./Register";
import { AxiosError, isAxiosError } from "axios";
import { OrdersData } from "../components/OrdersList";

export const loader =
	(store: Store) =>
	async ({ request }: { request: Request }) => {
		const user = store.getState().userState.user;
		if (!user) {
			toast.warning("You must login to view orders");
			return redirect("/login");
		}
		const params = Object.fromEntries([
			...new URL(request.url).searchParams.entries(),
		]);
		try {
			const response = await customFetch.get("/orders", {
				params,
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			return { orders: response.data.data, meta: response.data.meta };
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				const axiosError = error as AxiosError<ErrorResponse>;
				const errorMessage =
					axiosError.response?.data?.error?.message ||
					"please double check your credentials";
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
const Orders = () => {
	const data: OrdersData = useLoaderData() as OrdersData;
	const meta = data.meta;
	if (meta.pagination.total < 1) {
		return <SectionTitle text="please make an order" />;
	}
	return (
		<>
			<SectionTitle text="Your Orders" />
			<OrdersList />
			<ComplexPaginationContainer />
		</>
	);
};
export default Orders;
