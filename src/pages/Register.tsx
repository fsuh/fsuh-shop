import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";

export type ErrorResponse = {
	error?: {
		message?: string;
	};
};
export const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/auth/local/register", data);
		toast.success("account created successfully");
		return redirect("/login");
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
const Register = () => {
	return (
		<section className="h-screen grid place-items-center">
			<Form
				method="POST"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold">Register</h4>
				<FormInput
					type="text"
					label="username"
					name="username"
				/>
				<FormInput
					type="email"
					label="email"
					name="email"
				/>
				<FormInput
					type="password"
					label="password"
					name="password"
				/>
				<div className="mt-4">
					<SubmitBtn text="register" />
				</div>
				<p className="text-center">
					Already a member?{" "}
					<Link
						to="/login"
						className="ml-2 link link-hover link-primary capitalize"
					>
						login
					</Link>
				</p>
			</Form>
		</section>
	);
};
export default Register;
