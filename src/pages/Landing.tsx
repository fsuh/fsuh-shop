import { LoaderFunction } from "react-router-dom";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

export const loader: LoaderFunction = async () => {
	const response = await customFetch(url);
	const products = response.data.data;
	return { products };
};

const Landing = () => {
	return (
		<>
			<Hero />
			<FeaturedProducts />
		</>
	);
};
export default Landing;
