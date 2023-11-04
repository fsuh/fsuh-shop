import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

export interface IProductAttributes {
	category: string;
	title: string;
	company: string;
	description: string;
	featured: boolean;
	createdAt: string;
	image: string;
	price: string;
	publishedAt: string;
	shipping: boolean;
	updatedAt: string;
	colors: string[];
}

export interface IProducts {
	id: number;
	attributes: IProductAttributes;
}
export type ProductData = {
	products: IProducts[];
};

const ProductsGrid = () => {
	const data: ProductData = useLoaderData() as ProductData;
	const products: IProducts[] = data.products;
	return (
		<div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{products.map((product) => {
				const { title, price, image, company } = product.attributes;
				const eurosAmount = formatPrice(price);
				return (
					<Link
						key={product.id}
						to={`/products/${product.id}`}
						className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
					>
						<figure className="px-4 pt-4">
							<img
								src={image}
								alt={title}
								className="rounded-xl h-64 md:h-48 w-full object-cover"
							/>
						</figure>
						<div className="card-body items-center text-center">
							<h2 className="card-title capitalize tracking-wider">{title}</h2>
							<h4 className="capitalize text-md text-neutral-content">
								{company}
							</h4>
							<span className="text-secondary">{eurosAmount}</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
export default ProductsGrid;
