import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export interface OrdersData {
	orders: IOrders[];
	meta: Meta;
}

interface IOrders {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	address: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	name: string;
	orderTotal: string;
	cartItems: CartItem[];
	numItemsInCart: number;
}

interface CartItem {
	image: string;
	price: string;
	title: string;
	amount: number;
	cartID?: string;
	company: string;
	productID: number;
	productColor: string;
	id?: string;
}

interface Meta {
	pagination: IPagination;
}

interface IPagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

const OrdersList = () => {
	const data: OrdersData = useLoaderData() as OrdersData;
	const { orders, meta } = data;
	return (
		<div className="mt-8">
			<h4 className="mb-4 capitalize">total orders: {meta.pagination.total}</h4>
			<div className="overflow-x-auto">
				<table className="table table-zebra mb-8">
					{/* head */}
					<thead>
						<tr>
							<th>Name</th>
							<th>Address</th>
							<th>Products</th>
							<th>Cost</th>
							<th className="hidden sm:block">Date</th>
						</tr>
					</thead>
					{/* body */}
					<tbody>
						{orders.map((order) => {
							const id = order.id;
							const { name, address, numItemsInCart, orderTotal, createdAt } =
								order.attributes;
							const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");
							return (
								<tr key={id}>
									<td>{name}</td>
									<td>{address}</td>
									<td>{numItemsInCart}</td>
									<td>{orderTotal}</td>
									<td className="hidden sm:block">{date}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default OrdersList;
