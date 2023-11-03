import axios from "axios";
const productUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
	baseURL: productUrl,
});

export const formatPrice = (price: string): string => {
	const priceInNumber = Number(price);
	const priceInEuros = priceInNumber / 100;
	const eurosAmount = new Intl.NumberFormat("en-EU", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(priceInEuros);
	return eurosAmount;
};

export const generateAmountOptions = (number: number) => {
	return Array.from({ length: number }, (_, index) => {
		const amount = index + 1;
		return (
			<option
				key={amount}
				value={amount}
			>
				{amount}
			</option>
		);
	});
};
