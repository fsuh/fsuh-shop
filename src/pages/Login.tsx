import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { Store } from "@reduxjs/toolkit";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { AxiosError, isAxiosError } from "axios";
import { ErrorResponse } from "./Register";
import { useDispatch } from "react-redux/es/exports";

export const action =
	(store: Store) =>
	async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		try {
			const response = await customFetch.post("/auth/local", data);
			store.dispatch(loginUser(response.data));
			console.log(response);
			toast.success("Successfully logged in");
			return redirect("/");
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				const axiosError = error as AxiosError<ErrorResponse>;
				const errorMessage =
					axiosError.response?.data?.error?.message ||
					"please double check your credentials";
				toast.error(errorMessage);
				return null;
			} else {
				return null;
			}
		}
	};
const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginAsGuestUser = async () => {
		try {
			const response = await customFetch.post("/auth/local", {
				identifier: "test@test.com",
				password: "secret",
			});
			dispatch(loginUser(response.data));
			toast.success("Welcome guest user");
			navigate("/");
		} catch (error) {
			toast.error("guest user login error. Please try again");
		}
	};

	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="POST"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold">Login</h4>
				<FormInput
					type="email"
					label="email"
					name="identifier"
				/>
				<FormInput
					type="password"
					label="password"
					name="password"
				/>
				<div className="mt-t">
					<SubmitBtn text="login" />
				</div>
				<button
					type="button"
					className="btn btn-secondary btn-block"
					onClick={loginAsGuestUser}
				>
					guest user
				</button>
				<p className="text-center">
					Not a member yet?{" "}
					<Link
						to="/register"
						className="ml-2 link link-hover link-primary capitalize"
					>
						register
					</Link>
				</p>
			</Form>
		</section>
	);
};
export default Login;
