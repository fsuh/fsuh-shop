import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	HomeLayout,
	Landing,
	Error,
	Products,
	SingleProduct,
	Cart,
	About,
	Register,
	Login,
	Checkout,
	Orders,
} from "./pages";
const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomeLayout />,
			errorElement: <Error />,
			children: [
				{
					index: true,
					element: <Landing />,
				},
				{
					path: "products",
					element: <Products />,
				},
				{
					path: "products/:1d",
					element: <SingleProduct />,
				},
				{
					path: "cart",
					element: <Cart />,
				},
				{
					path: "about",
					element: <About />,
				},
				{
					path: "checkout",
					element: <Checkout />,
				},
				{
					path: "orders",
					element: <Orders />,
				},
			],
		},
		{
			path: "/login",
			element: <Login />,
			errorElement: <Error />,
		},
		{
			path: "/register",
			element: <Register />,
			errorElement: <Error />,
		},
	]);
	return <RouterProvider router={router} />;
};
export default App;
