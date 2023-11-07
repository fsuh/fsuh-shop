//import { LoaderFunction } from "react-router-dom";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url = "/products";

export const loader = async ({ request }: { request: Request }) => {
	// const params = new URL(request.url).searchParams;
	// const search = params.get("search");
	// console.log(search);
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries(),
	]);
	//console.log(params);
	const response = await customFetch(url, { params });
	const products = response.data.data;
	const meta = response.data.meta;
	return { products, meta, params };
};
const Products = () => {
	return (
		<>
			<Filters />
			<ProductsContainer />
			<PaginationContainer />
		</>
	);
};
export default Products;
