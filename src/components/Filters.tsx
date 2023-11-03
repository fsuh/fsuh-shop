import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
import { MetaData } from "./ProductsContainer";
interface IParams {
	search: string;
	category: string;
	company: string;
	order: string;
	price: string;
	shipping: string;
}
interface ParamsData extends MetaData {
	params: IParams;
}
const Filters = () => {
	const data: ParamsData = useLoaderData() as ParamsData;
	const meta = data.meta;
	const { search, company, category, shipping, order, price } = data.params;
	return (
		<Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
			{/* SEARCH */}
			<FormInput
				type="search"
				label="search product"
				name="search"
				// size="input-sm"
				defaultValue={search}
			/>
			{/* CATEGORIES */}
			<FormSelect
				label="select category"
				name="category"
				list={meta.categories}
				size="input-sm"
				defaultValue={category}
			/>
			{/* COMPANIES */}
			<FormSelect
				label="select company"
				name="company"
				list={meta.companies}
				size="input-sm"
				defaultValue={company}
			/>
			{/* ORDER */}
			<FormSelect
				label="sort by"
				name="order"
				list={["a-z", "z-a", "high", "low"]}
				size="input-sm"
				defaultValue={order}
			/>
			{/* PRICE */}
			<FormRange
				name="price"
				label="select price"
				size="range-sm"
				price={price}
			/>
			{/* SHIPPING */}
			<FormCheckbox
				name="shipping"
				label="free shipping"
				size="checkbox-sm"
				defaultChecked={!!shipping}
			/>

			{/* BUTTONS */}
			<button
				type="submit"
				className="btn btn-primary btn-sm"
			>
				search
			</button>
			<Link
				to="/products"
				className="btn btn-accent btn-sm"
			>
				reset
			</Link>
		</Form>
	);
};
export default Filters;
