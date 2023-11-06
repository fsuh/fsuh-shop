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
import { ErrorElement } from "./components";

// loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";
import { store } from "./store";

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
					errorElement: <ErrorElement />,
					loader: landingLoader,
				},
				{
					path: "products",
					element: <Products />,
					errorElement: <ErrorElement />,
					loader: productLoader,
				},
				{
					path: "products/:1d",
					element: <SingleProduct />,
					errorElement: <ErrorElement />,
					loader: singleProductLoader,
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
					errorElement: <ErrorElement />,
					loader: checkoutLoader(store),
					action: checkoutAction(store),
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
			action: loginAction(store),
		},
		{
			path: "/register",
			element: <Register />,
			errorElement: <Error />,
			action: registerAction,
		},
	]);
	return <RouterProvider router={router} />;
};
export default App;
