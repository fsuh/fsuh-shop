import { formatPrice } from "../utils";
import { ChangeEvent, useState } from "react";
import { InputVariables } from "./FormInput";
type FormRangeInputVariables = Pick<
	InputVariables,
	"label" | "name" | "size"
> & { price: string };

const FormRange: React.FC<FormRangeInputVariables> = ({
	label,
	name,
	size,
	price,
}) => {
	const step = 1000;
	const maxPrice = 100000;
	const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

	const handlePriceRange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedPrice(Number(e.target.value));
	};

	return (
		<div className="form-control">
			<label
				htmlFor={name}
				className="label cursor-pointer"
			>
				<span className="label-text capitalize">{label}</span>
				<span>{formatPrice(String(selectedPrice))}</span>
			</label>
			<input
				type="range"
				name={name}
				min={0}
				max={maxPrice}
				value={selectedPrice}
				onChange={handlePriceRange}
				step={step}
				className={`range range-primary ${size}`}
			/>
			<div className="w-full flex justify-between text-xs px-2 mt-2">
				<span className="font-bold text-md">0</span>
				<span className="font-bold text-md">
					Max: {formatPrice(String(maxPrice))}
				</span>
			</div>
		</div>
	);
};
export default FormRange;
